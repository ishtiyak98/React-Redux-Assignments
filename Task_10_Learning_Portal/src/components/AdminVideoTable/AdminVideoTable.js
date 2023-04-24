import React from "react";
import VideoTableRow from "./VideoTableRow";

const AdminVideoTable = ({allVideos}) => {
  return (
    <>
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Video Title</th>
            <th className="table-th">Description</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {
            allVideos.map(video=> <VideoTableRow key={video.id} video={video}></VideoTableRow>)
          }
        </tbody>
      </table>
    </>
  );
};

export default AdminVideoTable;
