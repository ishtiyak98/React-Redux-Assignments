import React from "react";
import AssignmentTableRow from "./AssignmentTableRow";

const AdminAssignmentTable = ({ allAssignments }) => {
  return (
    <>
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Title</th>
            <th className="table-th">Video Title</th>
            <th className="table-th">Mark</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {allAssignments?.map((assignment) => (
            <AssignmentTableRow
              key={assignment.id}
              assignment={assignment}
            ></AssignmentTableRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminAssignmentTable;
