import React, { useEffect, useState } from "react";
import { useGetAllVideosQuery } from "../../features/getVideos/getVideosApi";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditQuizMutation,
  useGetSingleQuizQuery,
} from "../../features/quize/quizApi";
import Swal from "sweetalert2";

const AdminEditQuiz = () => {
  const { id } = useParams();
  const { data: allVideos } = useGetAllVideosQuery();
  const { data: Quiz, isSuccess } = useGetSingleQuizQuery(id);
  const [editQuiz, { isSuccess: QuizEditSuccess, isError }] =
    useEditQuizMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    video_id: 0,
    video_title: "",
    options: [
      {
        id: "1",
        option: "",
        isCorrect: false,
      },
      {
        id: "2",
        option: "",
        isCorrect: false,
      },
      {
        id: "3",
        option: "",
        isCorrect: false,
      },
      {
        id: "4",
        option: "",
        isCorrect: false,
      },
    ],
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({ ...Quiz });
    }
  }, [isSuccess, Quiz]);

  useEffect(() => {
    if (QuizEditSuccess) {
      Swal.fire({
        icon: "success",
        title: "Quiz Edited",
      });
      navigate("/admin/quizzes");
    }
  }, [QuizEditSuccess, navigate]);

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
    editQuiz({ id, data: formData });
  };
  
  return (
    <>
      <Navbar></Navbar>

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="pb-10">
            <h2 className="text-3xl text-center font-bold">Edit Quiz</h2>
          </div>
          <div className="flex justify-center text-md">
            <form
              className="space-y-6 border-[1px] min-w-[350px] lg:min-w-[550px] border-cyan-400 rounded-lg p-10"
              action=""
              onSubmit={handleEditForm}
            >
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="question">
                  Question:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="question"
                  id=""
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="option1">
                  Option 1:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="option1"
                  id=""
                  value={formData.options[0].option}
                  onChange={(e) => {
                    const updatedOptions = formData.options.map((option) =>
                      option.id === "1"
                        ? { ...option, option: e.target.value }
                        : option
                    );
                    setFormData({
                      ...formData,
                      options: updatedOptions,
                    });
                  }}
                  required
                />
                <label className="inline-block ms-1" htmlFor="option1IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option1IsCorrect"
                    id="option1IsCorrect"
                    checked={formData.options[0].isCorrect}
                    onChange={(e) => {
                      const updatedOptions = formData.options.map((option) =>
                        parseInt(option.id) === 1
                          ? { ...option, isCorrect: e.target.checked }
                          : option
                      );
                      setFormData({
                        ...formData,
                        options: updatedOptions,
                      });
                    }}
                  />
                  Check this if correct
                </label>
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="option2">
                  Option 2:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="option2"
                  id=""
                  value={formData.options[1].option}
                  onChange={(e) => {
                    const updatedOptions = formData.options.map((option) =>
                      parseInt(option.id) === 2
                        ? { ...option, option: e.target.value }
                        : option
                    );
                    setFormData({
                      ...formData,
                      options: updatedOptions,
                    });
                  }}
                  required
                />
                <label className="inline-block ms-1" htmlFor="option2IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option2IsCorrect"
                    id="option2IsCorrect"
                    checked={formData.options[1].isCorrect}
                    onChange={(e) => {
                      const updatedOptions = formData.options.map((option) =>
                        parseInt(option.id) === 2
                          ? { ...option, isCorrect: e.target.checked }
                          : option
                      );
                      setFormData({
                        ...formData,
                        options: updatedOptions,
                      });
                    }}
                  />
                  Check this if correct
                </label>
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="option3">
                  Option 3:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="option3"
                  id=""
                  value={formData.options[2].option}
                  onChange={(e) => {
                    const updatedOptions = formData.options.map((option) =>
                      parseInt(option.id) === 3
                        ? { ...option, option: e.target.value }
                        : option
                    );
                    setFormData({
                      ...formData,
                      options: updatedOptions,
                    });
                  }}
                  required
                />
                <label className="inline-block ms-1" htmlFor="option3IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option3IsCorrect"
                    id="option3IsCorrect"
                    checked={formData.options[2].isCorrect}
                    onChange={(e) => {
                      const updatedOptions = formData.options.map((option) =>
                        parseInt(option.id) === 3
                          ? { ...option, isCorrect: e.target.checked }
                          : option
                      );
                      setFormData({
                        ...formData,
                        options: updatedOptions,
                      });
                    }}
                  />
                  Check this if correct
                </label>
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="option4">
                  Option 4:
                </label>
                <br />
                <input
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  type="text"
                  name="option4"
                  id=""
                  value={formData.options[3].option}
                  onChange={(e) => {
                    const updatedOptions = formData.options.map((option) =>
                      parseInt(option.id) === 4
                        ? { ...option, option: e.target.value }
                        : option
                    );
                    setFormData({
                      ...formData,
                      options: updatedOptions,
                    });
                  }}
                  required
                />
                <label className="inline-block ms-1" htmlFor="option4IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option4IsCorrect"
                    id="option4IsCorrect"
                    checked={formData.options[3].isCorrect}
                    onChange={(e) => {
                      const updatedOptions = formData.options.map((option) =>
                        parseInt(option.id) === 4
                          ? { ...option, isCorrect: e.target.checked }
                          : option
                      );
                      setFormData({
                        ...formData,
                        options: updatedOptions,
                      });
                    }}
                  />
                  Check this if correct
                </label>
              </div>
              <div className="space-y-2">
                <label className="font-semibold" htmlFor="videoTitle">
                  Video Title:
                </label>
                <br />
                <select
                  className="py-2 w-full px-2 rounded-md text-white bg-[#28314a] outline-none border-none focus:ring-1 ring-cyan-400"
                  name="videoTitle"
                  id=""
                  required
                  value={formData.video_id}
                  onChange={handleVideoTitle}
                >
                  <option value="" hidden>
                    Select a Video
                  </option>
                  {allVideos?.map((video) => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))}
                </select>
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

export default AdminEditQuiz;
