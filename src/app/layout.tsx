import "./globals.css";

import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ThemeRegistry } from "@/components/layout/ThemeRegistry";
import { cookies } from "next/headers";
import { getSupabaseUserByServer } from "@/lib/supabase/server";
import { AuthStoreInitializer } from "@/components/layout/AuthStoreInitializer";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "VoxQ - VOICEVOX × AI で学ぶ、エンジニアのための動画学習サービス",
  description:
    "知りたい技術テーマやIT用語を入力すると VOICEVOX のキャラクターが分かりやすく解説する動画を AI が生成します。複雑なドキュメントを読むのが苦手な方、動画で直感的に理解したい方に最適です。",
  openGraph: {
    title: "VoxQ - VOICEVOX × AI で学ぶ、エンジニアのための動画学習サービス",
    description:
      "知りたい技術テーマやIT用語を入力すると VOICEVOX のキャラクターが分かりやすく解説する動画を AI が生成します。複雑なドキュメントを読むのが苦手な方、動画で直感的に理解したい方に最適です。",
    url: "https://voxq.jp/",
    siteName: "VoxQ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/ogp.png", // TODO: OGP画像のURLに変更
        width: 1200,
        height: 630,
        alt: "VoxQ OGP画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxQ - VOICEVOX × AI で学ぶ、エンジニアのための動画学習サービス",
    description:
      "知りたい技術テーマやIT用語を入力すると VOICEVOX のキャラクターが分かりやすく解説する動画を AI が生成します。複雑なドキュメントを読むのが苦手な方、動画で直感的に理解したい方に最適です。",
    images: ["https://your-domain.com/ogp.png"], // TODO: OGP画像のURLに変更
  },
  alternates: {
    canonical: "https://voxq.jp/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, userProfile, userSpeakerSettings } =
    await getSupabaseUserByServer();
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light';


  return (
    <html lang="ja" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-1085041034271078" />
      </head>

      <AuthStoreInitializer
        user={user}
        userProfile={userProfile}
        userSpeakerSettings={userSpeakerSettings}
      />

      <ThemeRegistry initialMode={theme}>
        <body
          className={`min-h-screen min-w-[320px] flex flex-col items-center transition-colors duration-300 bg-white/80 dark:bg-[#212121] `}
        >
          <Header />

          {children}

          <Sidebar />

          <Footer />
        </body>
      </ThemeRegistry>
    </html>
  );
}
