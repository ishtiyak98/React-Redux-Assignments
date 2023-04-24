import React from "react";
import { Link } from "react-router-dom";
import AdminQuizTable from "../../components/AdminQuizTable/AdminQuizTable";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllQuizzesQuery } from "../../features/quize/quizApi";

const AdminQuizzes = () => {
  const { data: allQuizzes, isLoading, isError } = useGetAllQuizzesQuery();
  return (
    <>
      <Navbar></Navbar>

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to={"/admin/addQuiz"} className="btn ml-auto">
                Add Quiz
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              {allQuizzes && allQuizzes?.length > 0 && (
                <AdminQuizTable allQuizzes={allQuizzes}></AdminQuizTable>
              )}
              {allQuizzes?.length === 0 && (
                <div className="text-2xl font-bold space-y-4">
                  <p className="text-center text-red-500">
                    There is no Quiz Available!
                  </p>
                  <p className="text-center text-red-500">
                    Add Quiz to see the list
                  </p>
                </div>
              )}
              {isLoading && <p className="text-center">Loading...</p>}
              {isError && (
                <p className="text-center text-red-500">Server Error!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminQuizzes;
