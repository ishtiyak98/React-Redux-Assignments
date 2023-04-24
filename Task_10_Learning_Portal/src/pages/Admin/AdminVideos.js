import React from "react";
import { Link } from "react-router-dom";
import AdminVideoTable from "../../components/AdminVideoTable/AdminVideoTable";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllVideosQuery } from "../../features/getVideos/getVideosApi";

const AdminVideos = () => {
  const { data: allVideos, isLoading, isError } = useGetAllVideosQuery();

  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to={"/admin/addVideo"} className="btn ml-auto">
                Add Video
              </Link>
            </div>

            <div className="overflow-x-auto mt-4">
              {allVideos && allVideos?.length > 0 && (
                <AdminVideoTable allVideos={allVideos}></AdminVideoTable>
              )}
              {allVideos?.length === 0 && (
                <div className="text-2xl font-bold space-y-4">
                  <p className="text-center text-red-500">There is no video!</p>
                  <p className="text-center text-red-500">Add Video to see the list</p>
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

export default AdminVideos;
