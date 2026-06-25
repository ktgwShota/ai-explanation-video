"use server";

import {
  createServerActionClient,
  Session,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handlePlanChange(formData: FormData) {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const priceId = formData.get("priceId");

  if (priceId === "price_free") {
    await cancelStripeSubscription(supabase, session);
    return redirect("/goodbye");
  }

  // ベーシックプランの場合はStripeの処理を実行
  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("stripe_customer_id, stripe_subscription_id")
    .eq("id", session.user.id)
    .single();
  let stripeCustomerId = userProfile?.stripe_customer_id;
  if (!stripeCustomerId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-stripe-customer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          email: session.user.email,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Stripe Customer の作成に失敗しました:" + errorText);
    }

    const { customerId } = await response.json<any>();
    stripeCustomerId = customerId;

    await supabase
      .from("user_profiles")
      .update({ stripe_customer_id: stripeCustomerId })
      .eq("id", session.user.id);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        customerId: stripeCustomerId,
        priceId,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Checkout Session の作成に失敗しました:" + errorText);
  }

  const { url } = await response.json<any>();
  redirect(url);
}

/**
 * Stripe サブスクリプションを解約
 */
async function cancelStripeSubscription(
  supabase: SupabaseClient,
  session: Session
) {
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("stripe_customer_id, stripe_subscription_id")
    .eq("id", session.user.id)
    .single();

  if (profile?.stripe_customer_id) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/cancel-stripe-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          customerId: profile.stripe_customer_id,
          subscriptionId: profile.stripe_subscription_id,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        "Stripe サブスクリプションのキャンセルに失敗しました:" + errorText
      );
    }

    await supabase
      .from("user_profiles")
      .update({
        plan: "free",
        stripe_subscription_id: null,
      })
      .eq("id", session.user.id);
  }
}
