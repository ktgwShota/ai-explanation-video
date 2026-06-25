;import { useState, useRef, useEffect } from "react";
import VideoRenderStatus from "./LoadingBar";
import VideoPlayer from "./video/VideoPlayer";

export default function VideoPlayerAndLoading({ formError }: { formError: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="border-2 border-gray-100 dark:border-gray-500 rounded-[12px] aspect-video">
      {isLoading ? (
        <VideoRenderStatus formError={formError} onClick={() => setIsLoading(false)} />
      ) : (
        <VideoPlayer />
      )}
    </div>
  );
}
