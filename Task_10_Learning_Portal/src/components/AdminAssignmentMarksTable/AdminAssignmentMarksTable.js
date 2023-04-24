import React from "react";
import AdminAssignmentMarksRow from "./AdminAssignmentMarksRow";

const AdminAssignmentMarksTable = ({ allMarks }) => {
  return (
    <>
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Assignment</th>
            <th className="table-th">Date</th>
            <th className="table-th">Student Name</th>
            <th className="table-th">Repo Link</th>
            <th className="table-th">Mark</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {allMarks.map((mark) => (
            <AdminAssignmentMarksRow
              key={mark.id}
              mark={mark}
            ></AdminAssignmentMarksRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminAssignmentMarksTable;
