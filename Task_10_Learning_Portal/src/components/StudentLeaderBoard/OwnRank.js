import React from "react";
import { useSelector } from "react-redux";

const OwnRank = () => {
  const { ownPosition } = useSelector((state) => state.leaderBoard);
  return (
    <>
      <div>
        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr>
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {ownPosition.rank ? (
              <tr className="border-2 border-cyan">
                <td className="table-td text-center font-bold">
                  {ownPosition?.rank === 1 ? (
                    <span>🏆</span>
                  ) : (
                    ownPosition?.rank
                  )}
                </td>
                <td className="table-td text-center font-bold">
                  {ownPosition?.student_name}
                </td>
                <td className="table-td text-center font-bold">
                  {ownPosition?.quiz_mark}
                </td>
                <td className="table-td text-center font-bold">
                  {ownPosition?.assignment_mark}
                </td>
                <td className="table-td text-center font-bold">
                  {ownPosition?.total_mark}
                </td>
              </tr>
            ) : (
              <tr className="border-2 border-cyan">
                <td colSpan="5" className="table-td text-center font-bold">
                  Submit minimum 1 assignment/quiz{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OwnRank;
