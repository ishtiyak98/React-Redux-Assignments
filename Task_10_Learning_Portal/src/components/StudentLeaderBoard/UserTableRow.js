import React from "react";

const UserTableRow = ({ student }) => {
  const { rank, student_name, quiz_mark, assignment_mark, total_mark } = student || "";
  return (
    <tr className="border-b  border-slate-600/50">
      <td className="table-td text-center">
        {rank === 1 ? <span>🏆</span> : rank}
      </td>
      <td className="table-td text-center">{student_name}</td>
      <td className="table-td text-center">{quiz_mark}</td>
      <td className="table-td text-center">{assignment_mark}</td>
      <td className="table-td text-center">{total_mark}</td>
    </tr>
  );
};

export default UserTableRow;
