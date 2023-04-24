import React from "react";
import { Link } from "react-router-dom";
import AdminAssignmentTable from "../../components/AdminAssignmentTable/AdminAssignmentTable";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllAssignmentsQuery } from "../../features/assignment/assignmentApi";

const AdminAssignment = () => {
  const {
    data: allAssignments,
    isLoading,
    isError,
  } = useGetAllAssignmentsQuery();

  return (
    <>
      <Navbar></Navbar>

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to={"/admin/addAssignment"} className="btn ml-auto">
                Add Assignment
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              {allAssignments && allAssignments?.length > 0 && (
                <AdminAssignmentTable
                  allAssignments={allAssignments}
                ></AdminAssignmentTable>
              )}
              {allAssignments?.length === 0 && (
                <div className="text-2xl font-bold space-y-4">
                  <p className="text-center text-red-500">
                    There is no Assignment Available!
                  </p>
                  <p className="text-center text-red-500">
                    Add Assignment to see the list
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

export default AdminAssignment;
