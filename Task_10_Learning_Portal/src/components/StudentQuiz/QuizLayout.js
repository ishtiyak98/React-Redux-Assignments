import React, { useEffect } from "react";
import Quizzes from "./Quizzes";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedAnswers } from "../../features/quize/quizSlice";
import quizObject from "../../utils/quizObject";
import { useAddQuizMarkMutation } from "../../features/quizMarks/quizMarksApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const QuizLayout = ({ videoId, allQuizzes }) => {
  const { selectedAnswers } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addQuizMark, { isSuccess, isError }] = useAddQuizMarkMutation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(removeSelectedAnswers());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeSelectedAnswers());
      Swal.fire({
        icon: "success",
        title: "Quiz Done",
      });
      navigate("/student/leaderBoard");
    }
  }, [isSuccess, dispatch, navigate]);

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
    });
  }

  const handleSubmitQuiz = () => {
    const answerObject = quizObject(selectedAnswers);
    let questionId = [];

    const quizMark = {
      student_id: user.id,
      student_name: user.name,
      video_id: parseInt(allQuizzes[0]?.video_id),
      video_title: allQuizzes[0]?.video_title,
      totalQuiz: parseInt(allQuizzes.length),
      totalCorrect: 0,
      totalWrong: 0,
      totalMark: parseInt(allQuizzes.length) * 5,
      mark: 0,
    };

    if (Object.keys(answerObject).length !== 0) {
      questionId = Object.keys(answerObject).map((item) =>
        parseInt(item.split("")[1])
      );

      allQuizzes.forEach((element) => {
        if (questionId.includes(element.id)) {
          const filteredOption = element.options.filter((item) =>
            answerObject[`q${element.id}`]
              .map((item) => parseInt(item.split("option")[1]))
              .includes(parseInt(item.id))
          );
          if (
            ((filteredOption.filter((item) => item.isCorrect === true ).length + element.options.filter((item) => item.isCorrect === false ).length) === 4) && (filteredOption.filter(item=> item.isCorrect===true).length===filteredOption.length)
          ) {
            if (Object.keys(answerObject).length !== parseInt(allQuizzes.length)) {
              quizMark.totalWrong = quizMark.totalQuiz - Object.keys(answerObject).length;
              quizMark.totalCorrect = Object.keys(answerObject).length;
            }
            else{
              quizMark.totalCorrect = quizMark.totalQuiz - quizMark.totalWrong;
            }
            const mark = parseInt(quizMark.totalCorrect) * 5;
            quizMark.mark = mark;
          } else if (
            filteredOption.filter((item) => item.isCorrect === false).length > 0
          ) {
            quizMark.totalWrong += 1;
            quizMark.totalCorrect = quizMark.totalQuiz - quizMark.totalWrong;
            const mark = parseInt(quizMark.totalCorrect) * 5;
            quizMark.mark = mark;
          } else {
            quizMark.totalWrong += 1;
            quizMark.totalCorrect = quizMark.totalQuiz - quizMark.totalWrong;
            const mark = parseInt(quizMark.totalCorrect) * 5;
            quizMark.mark = mark;
          }
        }
      });
    }
    else{
      quizMark.totalWrong= parseInt(allQuizzes.length);
    }
    addQuizMark(quizMark);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "{allQuizzes[0]?.video_title}"
          </h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <div className="space-y-8">
          {allQuizzes?.map((quiz) => (
            <Quizzes key={quiz.id} quiz={quiz}></Quizzes>
          ))}
        </div>
        <button
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
          onClick={handleSubmitQuiz}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default QuizLayout;
