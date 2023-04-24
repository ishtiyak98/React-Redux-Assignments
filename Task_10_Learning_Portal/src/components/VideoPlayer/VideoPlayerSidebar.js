import React from "react";
import { useGetAllVideosQuery } from "../../features/getVideos/getVideosApi";
import VideoItem from "./VideoItem";

const VideoPlayerSidebar = () => {
  const { data: allVideos, isLoading, isError } = useGetAllVideosQuery();
  return (
    <>
      <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
        {allVideos?.map((video) => (
          <VideoItem key={video.id} video={video}></VideoItem>
        ))}
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && <p className="text-center text-red-500">Server Error</p>}
      </div>
    </>
  );
};

export default VideoPlayerSidebar;
