import React, { useEffect, useState } from "react";
import { useEditAssignmentMarkMutation } from "../../features/assignmentMarks/assignmentMarks";
import Swal from "sweetalert2";

const AdminAssignmentMarksRow = ({ mark }) => {
  const {
    id,
    title,
    student_name,
    createdAt,
    repo_link,
    status,
    totalMark,
    mark: assignmentMark,
  } = mark;
  const [editAssignmentMark, { isSuccess, isError }] =
    useEditAssignmentMarkMutation();
  const [formData, setFormData] = useState({ ...mark, mark: assignmentMark });

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Mark Added",
      });
    }
  }, [isSuccess]);

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
    });
  }
  const handleMark = () => {
    if (formData.mark > totalMark) {
      Swal.fire({
        icon: "error",
        title: "Given mark is greater than Total Mark",
      });
    } else {
      editAssignmentMark({ id, data: { ...formData, status: "published" } });
    }
  };
  return (
    <>
      <tr>
        <td className="table-td">{title}</td>
        <td className="table-td">
          {new Date(`${createdAt}`).toLocaleString("en-us", {
            day: "numeric",
            year: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </td>
        <td className="table-td">{student_name}</td>
        <td className="table-td">{repo_link}</td>
        {status === "pending" && (
          <td className="table-td input-mark">
            <input
              value={formData.mark}
              onChange={(e) => {
                if (Number.isInteger(parseInt(e.target.value)) && parseInt(e.target.value)>=0) {
                  setFormData({ ...formData, mark: parseInt(e.target.value) });
                } else {
                  setFormData({ ...formData, mark: parseInt(0) });
                }
              }}
            />
            /{totalMark}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              onClick={handleMark}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </td>
        )}
        {status === "published" && (
          <td className="table-td">
            {assignmentMark}/{totalMark}
          </td>
        )}
      </tr>
    </>
  );
};

export default AdminAssignmentMarksRow;
