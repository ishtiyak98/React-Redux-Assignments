import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import marksCalculator from "../../utils/marksCalculator";
import UserTableRow from "./UserTableRow";
import { useGetAllAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarks";
import { useGetAllQuizMarksQuery } from "../../features/quizMarks/quizMarksApi";
import {
  allAssignmentCalculate,
  allQuizCalculate,
  saveOwnResult,
} from "../../features/leaderBoardMarks/leaderBoardSlice";
import leaderBoard from "../../utils/leaderBoard";

const OthersRank = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: assignmentMarks, isSuccess } = useGetAllAssignmentMarksQuery();
  const { data: QuizMarks, isSuccess: QuizMarkSuccess } =
    useGetAllQuizMarksQuery();
  const { allAssignmentMarksUsers, allQuizMarkUsers } = useSelector(
    (state) => state.leaderBoard
  );
  const dispatch = useDispatch();
  const [showLeaderBoard, setShowLeaderBoard] = useState([]);

  useEffect(() => {
    if (isSuccess && QuizMarkSuccess) {
      dispatch(
        allAssignmentCalculate(marksCalculator(assignmentMarks, "assignment"))
      );
      dispatch(allQuizCalculate(marksCalculator(QuizMarks, "quiz")));
    }
  }, [isSuccess, QuizMarkSuccess, assignmentMarks, QuizMarks, dispatch]);

  useEffect(() => {
    if (allAssignmentMarksUsers.length > 0 || allQuizMarkUsers.length > 0) {
      const allResult = leaderBoard(allAssignmentMarksUsers, allQuizMarkUsers);
      const ownResult = allResult.find((item) => item.student_id === user.id);
      dispatch(saveOwnResult(ownResult));
      setShowLeaderBoard(allResult);
    }
  }, [allAssignmentMarksUsers, allQuizMarkUsers, user, dispatch]);

  return (
    <>
      <div className="my-8">
        <h3 className="text-lg font-bold">Top 20 Result</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr className="border-b border-slate-600/50">
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {showLeaderBoard
              ?.filter((item) => item.rank >= 1 && item.rank <= 20)
              ?.map((student) => (
                <UserTableRow key={student.student_id} student={student}></UserTableRow>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OthersRank;
