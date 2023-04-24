import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllVideosQuery } from "../../features/getVideos/getVideosApi";
import { useAddQuizMutation } from "../../features/quize/quizApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminAddQuiz = () => {
  const { data: allVideos } = useGetAllVideosQuery();
  const [addQuiz, { isSuccess, isError }] = useAddQuizMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Quiz Added",
      });
      navigate("/admin/quizzes");
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
      question: e.target.question.value,
      video_id: parseInt(e.target.videoTitle.value.split("|")[0]),
      video_title: e.target.videoTitle.value.split("|")[1],
      options: [
        {
          id: "1",
          option: e.target.option1.value,
          isCorrect: e.target.option1IsCorrect.checked,
        },
        {
          id: "2",
          option: e.target.option2.value,
          isCorrect: e.target.option2IsCorrect.checked,
        },
        {
          id: "3",
          option: e.target.option3.value,
          isCorrect: e.target.option3IsCorrect.checked,
        },
        {
          id: "4",
          option: e.target.option4.value,
          isCorrect: e.target.option4IsCorrect.checked,
        },
      ],
    };
    addQuiz(data);
  };
  return (
    <>
      <Navbar></Navbar>

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="pb-10">
            <h2 className="text-3xl text-center font-bold">Add Quiz</h2>
          </div>
          <div className="flex justify-center text-md">
            <form
              className="space-y-6 border-[1px] min-w-[350px] lg:min-w-[550px] border-cyan-400 rounded-lg p-10"
              action=""
              onSubmit={handleAddForm}
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
                  required
                />
                <label className="inline-block ms-1" htmlFor="option1IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option1IsCorrect"
                    id="option1IsCorrect"
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
                  required
                />
                <label className="inline-block ms-1" htmlFor="option2IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option2IsCorrect"
                    id="option2IsCorrect"
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
                  required
                />
                <label className="inline-block ms-1" htmlFor="option3IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option3IsCorrect"
                    id="option3IsCorrect"
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
                  required
                />
                <label className="inline-block ms-1" htmlFor="option4IsCorrect">
                  {" "}
                  <input
                    className="me-3 mt-2"
                    type="checkbox"
                    name="option4IsCorrect"
                    id="option4IsCorrect"
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
                >
                  <option value="" hidden>
                    Select a Video
                  </option>
                  {allVideos?.map((video) => (
                    <option key={video.id} value={`${video.id}|${video.title}`}>
                      {video.title}
                    </option>
                  ))}
                </select>
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

export default AdminAddQuiz;
