import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import {
  useEditVideoMutation,
  useGetSingleVideoQuery,
} from "../../features/getVideos/getVideosApi";

const AdminEditVideo = () => {
  const { id } = useParams();
  const { data: videoDetails, isSuccess } = useGetSingleVideoQuery(id);
  const [editVideo, { isSuccess: editSuccess, isError }] =
    useEditVideoMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    views: "",
    duration: "0:00",
    createdAt: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({ ...videoDetails });
    }
  }, [isSuccess, videoDetails]);

  useEffect(() => {
    if (editSuccess) {
      Swal.fire({
        icon: "success",
        title: "Video Edited",
      });

      navigate("/admin/videos");
    }
  }, [editSuccess, navigate]);

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
    });
  }

  const handleMinute = (e) => {
    setFormData({
      ...formData,
      duration: `${e.target.value}:${formData.duration.split(":")[1]}`,
    });
  };

  const handleSecond = (e) => {
    setFormData({
      ...formData,
      duration: `${formData.duration.split(":")[0]}:${e.target.value}`,
    });
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    editVideo({ id, data: formData });
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="pb-10">
            <h2 className="text-3xl text-center font-bold">Edit Video</h2>
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
                <label className="font-semibold" htmlFor="description">
                  Description:
                </label>
                <br />
                <textarea
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  name="description"
                  id=""
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  value={formData.url}
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
                  value={formData.views}
                  onChange={(e) =>
                    setFormData({ ...formData, views: e.target.value })
                  }
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
                    value={parseInt(formData.duration.split(":")[0])}
                    onChange={handleMinute}
                    min="0"
                    placeholder="minute"
                    id=""
                  />
                  <input
                    className="py-2 px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                    type="number"
                    name="second"
                    value={parseInt(formData.duration.split(":")[1])}
                    onChange={handleSecond}
                    min="0"
                    placeholder="second"
                    id=""
                  />
                </div>
              </div>
              <div className="flex justify-center pt-3">
                <input
                  className="py-2 px-10 rounded-md text-white bg-[#28314a] hover:bg-cyan-400 cursor-pointer outline-none border-none ring-1 ring-cyan-400"
                  type="submit"
                  value="Edit"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminEditVideo;
