import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import QuizLayout from "../../components/StudentQuiz/QuizLayout";
import { useParams } from "react-router-dom";
import { useGetAllQuizzesQuery } from "../../features/quize/quizApi";

const CourseQuiz = () => {
  const { data: allQuizzes, isLoading, isError } = useGetAllQuizzesQuery();
  const { videoId } = useParams();

  if (isLoading) {
    return (
      <>
        <Navbar></Navbar>
        <p className="text-center text-xl">Loading...</p>
      </>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <QuizLayout
          videoId={videoId}
          allQuizzes={allQuizzes?.filter(
            (quiz) => parseInt(quiz?.video_id) === parseInt(videoId)
          )}
        ></QuizLayout>
      </section>
    </>
  );
};

export default CourseQuiz;
