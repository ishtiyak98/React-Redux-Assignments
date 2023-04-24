import React from "react";
import QuizTableRow from "./QuizTableRow";

const AdminQuizTable = ({ allQuizzes }) => {
  return (
    <>
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Question</th>
            <th className="table-th">Video</th>
            <th className="table-th justify-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {allQuizzes.map((quiz) => (
            <QuizTableRow key={quiz.id} quiz={quiz}></QuizTableRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminQuizTable;
