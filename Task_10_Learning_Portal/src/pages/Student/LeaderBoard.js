import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import OthersRank from "../../components/StudentLeaderBoard/OthersRank";
import OwnRank from "../../components/StudentLeaderBoard/OwnRank";

const LeaderBoard = () => {
  return (
    <>
      <Navbar></Navbar>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <OwnRank></OwnRank>
          <OthersRank></OthersRank>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
