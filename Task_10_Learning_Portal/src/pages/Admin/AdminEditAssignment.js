import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import {
  useEditAssignmentMutation,
  useGetAllAssignmentsQuery,
  useGetSingleAssignmentQuery,
} from "../../features/assignment/assignmentApi";
import { useGetAllVideosQuery } from "../../features/getVideos/getVideosApi";

const AdminEditAssignment = () => {
  const { data: allVideos } = useGetAllVideosQuery();
  const { id } = useParams();
  const { data: assignment, isSuccess } = useGetSingleAssignmentQuery(id);
  const [editAssignment, { isSuccess: editSuccess, isError }] =
    useEditAssignmentMutation();
  const { data: allAssignments } = useGetAllAssignmentsQuery();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    video_id: 0,
    video_title: "",
    totalMark: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({ ...assignment });
    }
  }, [isSuccess, assignment]);

  useEffect(() => {
    if (editSuccess) {
      Swal.fire({
        icon: "success",
        title: "Assignment Edited",
      });
      navigate("/admin/assignments");
    }
  }, [editSuccess, navigate]);

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
    });
  }

  const handleVideoTitle = (e) => {
    setFormData({
      ...formData,
      video_id: parseInt(e.target.value),
      video_title: allVideos.find(
        (video) => video.id === parseInt(e.target.value)
      ).title,
    });
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    editAssignment({ id, data: formData });
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="pb-10">
            <h2 className="text-3xl text-center font-bold">Edit Assignment</h2>
          </div>
          <div className="flex justify-center text-md">
            <form
              className="space-y-6 border-[1px] min-w-[350px] lg:min-w-[550px] border-cyan-400 rounded-lg p-10"
              action=""
              onSubmit={handleEditForm}
            >
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="title">
                  Title:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  id=""
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="videoTitle">
                  Video Title:
                </label>
                <br />
                <span className="text-xs text-cyan-400">
                  (videos without assignment will be displayed)
                </span>
                <br />
                <select
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  name="videoTitle"
                  id=""
                  value={formData.video_id}
                  onChange={handleVideoTitle}
                  required
                >
                  <option value="" hidden>
                    Select Video Title
                  </option>
                  {/* {allVideos?.map((video) => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))} */}
                  {allVideos
                    ?.filter(
                      (video) =>
                        video?.id !==
                          allAssignments?.find(
                            (item) => item?.video_id === video.id
                          )?.video_id || video?.id === assignment?.video_id
                    )
                    ?.map((video) => (
                      <option key={video.id} value={video.id}>
                        {video.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="marks">
                  Total Marks:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="number"
                  name="marks"
                  value={formData.totalMark}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalMark: parseInt(e.target.value),
                    })
                  }
                  min={"0"}
                  id=""
                />
              </div>
              <div className="flex justify-center pt-3">
                <input
                  className="py-2 px-10 rounded-md text-white bg-[#28314a] hover:bg-cyan-400 cursor-pointer outline-none border-none ring-1 ring-cyan-400"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminEditAssignment;
