import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import {
  useAddAssignmentMutation,
  useGetAllAssignmentsQuery,
} from "../../features/assignment/assignmentApi";
import { useGetAllVideosQuery } from "../../features/getVideos/getVideosApi";

const AdminAddAssignment = () => {
  const { data: allVideos } = useGetAllVideosQuery();
  const { data: allAssignments } = useGetAllAssignmentsQuery();
  const [addAssignment, { isSuccess, isError }] = useAddAssignmentMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Assignment Added",
      });
      navigate("/admin/assignments");
    }
  }, [isSuccess, navigate]);

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
    });
  }

  const handleAddForm = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      video_id: parseInt(e.target.videoTitle.value.split("|")[0]),
      video_title: e.target.videoTitle.value.split("|")[1],
      totalMark: parseInt(e.target.marks.value),
    };
    addAssignment(data);
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="pb-10">
            <h2 className="text-3xl text-center font-bold">Add Assignment</h2>
          </div>
          <div className="flex justify-center text-md">
            <form
              className="space-y-6 min-w-[350px] lg:min-w-[550px] border-[1px] border-cyan-400 rounded-lg p-10"
              action=""
              onSubmit={handleAddForm}
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
                  required
                >
                  <option className="py-6" value="" hidden>
                    Select a Video
                  </option>
                  {allVideos
                    ?.filter(
                      (video) =>
                        video?.id !==
                        allAssignments?.find(
                          (item) => item?.video_id === video.id
                        )?.video_id
                    )
                    ?.map((video) => (
                      <option
                        key={video.id}
                        value={`${video.id}|${video.title}`}
                      >
                        {video.title}
                      </option>
                    ))}
                </select>
                {allVideos?.filter(
                  (video) =>
                    video?.id !==
                    allAssignments?.find((item) => item?.video_id === video.id)
                      ?.video_id
                ).length === 0 && (
                  <span className="text-xs text-red-500">
                    No Video left for assignment
                  </span>
                )}
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
                  min={"0"}
                  id=""
                  required
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

export default AdminAddAssignment;
