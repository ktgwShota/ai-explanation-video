import GenerateVideoRequestForm from "@/components/form/GenerateVideoRequestForm";

export const runtime = "edge";

export default function App() {
  return (
    <main className="flex-grow w-full max-w-[560px] flex flex-col items-center justify-center mx-auto px-4">
      <h2 className="w-full mb-14 text-xl text-center">
        今日は何の技術を学習しますか？
      </h2>

      <GenerateVideoRequestForm className="w-full" />
    </main>
  );
}
