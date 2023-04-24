import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import VideoPlayerSidebar from "../../components/VideoPlayer/VideoPlayerSidebar";
import {
  useGetAssignmentQuery,
  useGetSingleVideoQuery,
} from "../../features/getVideos/getVideosApi";

const CoursePlayer = () => {
  const { id } = useParams();
  const {
    data: video,
    isLoading,
    isError,
    isSuccess,
  } = useGetSingleVideoQuery(id);
  

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {isSuccess && <VideoPlayer video={video}></VideoPlayer>}
            {isLoading && <p>Loading Video...</p>}
            {isError && <p className="text-res-500">Server Error</p>}
            <VideoPlayerSidebar></VideoPlayerSidebar>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePlayer;
