import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import { useAddVideoMutation } from "../../features/getVideos/getVideosApi";

const AdminAddVideo = () => {
  const [addVideo, { isError, isSuccess }] = useAddVideoMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "video Added",
      });
      navigate("/admin/videos");
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
      description: e.target.description.value,
      url: e.target.url.value,
      views: e.target.views.value,
      duration: `${e.target.minute.value}:${e.target.second.value}`,
      createdAt: new Date().toISOString(),
    };
    addVideo(data);
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="pb-10">
            <h2 className="text-3xl text-center font-bold">Add Video</h2>
          </div>
          <div className="flex justify-center text-md">
            <form
              className="space-y-6 border-[1px] min-w-[350px] lg:min-w-[550px] border-cyan-400 rounded-lg p-10"
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
                <label className="font-semibold" htmlFor="description">
                  Description:
                </label>
                <br />
                <textarea
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  name="description"
                  id=""
                  required
                  cols="30"
                  rows="3"
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="url">
                  Url:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="url"
                  id=""
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="views">
                  Views:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="views"
                  id=""
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="duration">
                  Duration:
                </label>
                <br />
                <div className="space-y-4 lg:space-y-0 lg:space-x-6">
                  <input
                    className="py-2 px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                    type="number"
                    name="minute"
                    placeholder="minute"
                    id=""
                  />
                  <input
                    className="py-2 px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                    type="number"
                    name="second"
                    placeholder="second"
                    id=""
                  />
                </div>
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

export default AdminAddVideo;
