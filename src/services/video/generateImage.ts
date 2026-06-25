// TODO:
// import { VideoData, VideoScriptData } from "@/types/video";
// import { GeminiResponse } from "@/types/gemini";

// export async function generateImage(videoScriptData: VideoScriptData) {
//   const response = await fetch("/api/gemini", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       type: "image",
//       videoData: videoScriptData.scriptPart,
//     }),
//   }).then((response) => {
//     console.log(response, "response");

//     if (!response.ok) {
//       throw new Error("API リクエストに失敗しました。障害が発生している可能性があるため、しばらく経ってから再度お試しください。");
//     }
//     return response.json<GeminiResponse>();
//   });
//   console.log(response, "response");
// }