import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AdminAssignmentMarksTable from "../../components/AdminAssignmentMarksTable/AdminAssignmentMarksTable";
import { useGetAllAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarks";

const AdminAssignmentMarks = () => {
  const {
    data: allMarks,
    isLoading,
    isError,
  } = useGetAllAssignmentMarksQuery();
  return (
    <>
      <Navbar></Navbar>

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{allMarks?.length}</span>
              </li>
              <li>
                Pending <span>{
                    allMarks?.filter((mark) => mark.status === "pending")
                      .length
                  }</span>
              </li>
              <li>
                Mark Sent{" "}
                <span>
                  {
                    allMarks?.filter((mark) => mark.status === "published")
                      .length
                  }
                </span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              {allMarks && allMarks?.length > 0 && (
                <AdminAssignmentMarksTable
                  allMarks={allMarks}
                ></AdminAssignmentMarksTable>
              )}
              {allMarks?.length === 0 && (
                <div className="text-2xl font-bold space-y-4">
                <p className="text-center text-red-500">
                  There is no submission of Assignments Available!
                </p>
                <p className="text-center text-red-500">
                  If there is any submission, We will update the list
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

export default AdminAssignmentMarks;
