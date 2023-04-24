import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
} from "../../features/getVideos/getVideosApi";
import { useGetAllAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarks";
import {
  useGetAllQuizMarksQuery,
  useGetQuizMarkByVideoIdQuery,
} from "../../features/quizMarks/quizMarksApi";
import { useGetAllQuizzesQuery } from "../../features/quize/quizApi";

const VideoPlayer = ({ video }) => {
  const { user } = useSelector((state) => state.auth);
  const { id, title, description, createdAt, url } = video || "";
  const { data: assignment, isSuccess } = useGetAssignmentQuery(id);
  const { data: allAssignmentMarks } = useGetAllAssignmentMarksQuery();
  const { data: quizMarkByVideoId, isSuccess: quizMarkByVideoIdSuccess } =
    useGetQuizMarkByVideoIdQuery(id);
  const { data: allQuizMarks, isSuccess: allQuizMarksSuccess } =
    useGetAllQuizMarksQuery();
  const { data: allQuizzes, isSuccess: allQuizzesSuccess } =
    useGetAllQuizzesQuery();
  const [open, setOpen] = React.useState(false);
  const [submitAssignment, { isSuccess: submitSuccess, isError }] =
    useSubmitAssignmentMutation();

  useEffect(() => {
    if (submitSuccess) {
      Swal.fire({
        icon: "success",
        title: "Assignment Submitted",
      });
    } else if (isError) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
      });
    }
  }, [submitSuccess, isError]);

  const handleModalClose = () => {
    setOpen(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleAssignment = (e) => {
    e.preventDefault();

    const data = {
      student_id: user.id,
      student_name: user.name,
      assignment_id: assignment[0].id,
      title: assignment[0].title,
      createdAt: new Date().toISOString(),
      totalMark: assignment[0].totalMark,
      mark: 0,
      repo_link: e.target.githubLink.value,
      status: "pending",
    };
    submitAssignment(data);
    setOpen(false);
  };

  return (
    <>
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={url}
          title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on{" "}
            {new Date(createdAt).toLocaleDateString("en-us", {
              day: "numeric",
              year: "numeric",
              month: "long",
            })}
          </h2>

          <div className="flex gap-4">
            {allAssignmentMarks?.length > 0 &&
              isSuccess &&
              allAssignmentMarks?.find(
                (item) =>
                  item.student_id === user?.id &&
                  item.assignment_id === assignment[0]?.id
              ) && (
                <div>
                  <p className="text-primary px-3 text-cyan font-bold py-1 border border-cyan rounded-full text-sm">
                    Assignment Submitted{" "}
                    {allAssignmentMarks?.find(
                      (item) =>
                        item.student_id === user?.id &&
                        item.assignment_id === assignment[0]?.id &&
                        item.status === "pending"
                    ) && <span>| Mark Pending</span>}
                    {allAssignmentMarks?.find(
                      (item) =>
                        item.student_id === user?.id &&
                        item.assignment_id === assignment[0]?.id &&
                        item.status === "published"
                    ) && (
                      <span>
                        | Mark:{" "}
                        {
                          allAssignmentMarks?.find(
                            (item) =>
                              item.student_id === user?.id &&
                              item.assignment_id === assignment[0]?.id &&
                              item.status === "published"
                          )?.mark
                        }
                        /
                        {
                          allAssignmentMarks?.find(
                            (item) =>
                              item.student_id === user?.id &&
                              item.assignment_id === assignment[0]?.id &&
                              item.status === "published"
                          )?.totalMark
                        }
                      </span>
                    )}
                  </p>
                </div>
              )}

            {assignment?.length > 0 &&
              isSuccess &&
              !allAssignmentMarks?.find(
                (item) =>
                  item.student_id === user?.id &&
                  item.assignment_id === assignment[0].id
              ) && (
                <div>
                  <button
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                    onClick={handleModalOpen}
                  >
                    এসাইনমেন্ট
                  </button>
                  <Dialog
                    fullWidth={true}
                    maxWidth={"sm"}
                    open={open}
                    onClose={handleModalClose}
                  >
                    <DialogTitle sx={{ fontSize: "28px", color: "blue" }}>
                      {assignment[0].title}
                    </DialogTitle>
                    <form action="" onSubmit={handleAssignment}>
                      <DialogContent>
                        <DialogContentText sx={{ color: "black", fontWeight: "600" }}>
                          Total Marks : {assignment[0].totalMark}
                        </DialogContentText>
                        <br />
                        <DialogContentText sx={{ color: "black" }}>
                          গিটহাব রিপোসিটরি লিঙ্ক *
                        </DialogContentText>

                        <TextField
                          autoFocus
                          margin="dense"
                          name="githubLink"
                          id="name"
                          label="GitHub Link"
                          type="text"
                          fullWidth
                          variant="standard"
                          required
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button type="submit">Submit</Button>
                        <Button onClick={handleModalClose}>Cancel</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </div>
              )}

            {assignment?.length === 0 && (
              <div>
                <p className="text-primary px-3 text-red-500 font-bold py-1 border border-cyan rounded-full text-sm">
                  No Assignment Found
                </p>
              </div>
            )}

            {allQuizMarks?.find(
              (item) =>
                item.student_id === user?.id && item.video_id === parseInt(id)
            ) && (
              <div>
                <p className="text-primary px-3 text-cyan font-bold py-1 border border-cyan rounded-full text-sm">
                  Quiz Submitted | Mark:{" "}
                  {
                    allQuizMarks?.find(
                      (item) =>
                        item.student_id === user?.id &&
                        item.video_id === parseInt(id)
                    )?.mark
                  }
                  /
                  {
                    allQuizMarks?.find(
                      (item) =>
                        item.student_id === user?.id &&
                        item.video_id === parseInt(id)
                    )?.totalMark
                  }
                </p>
              </div>
            )}

            {quizMarkByVideoId?.length >= 0 &&
              quizMarkByVideoIdSuccess &&
              allQuizzes?.find((item) => item.video_id === parseInt(id)) &&
              !allQuizMarks?.find(
                (item) =>
                  item.student_id === user?.id && item.video_id === parseInt(id)
              ) && (
                <Link
                  to={`/student/quiz/${id}`}
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  কুইজে অংশগ্রহণ করুন
                </Link>
              )}

            {allQuizzesSuccess &&
              !allQuizzes?.find((item) => item.video_id === parseInt(id)) && (
                <div>
                  <p className="text-primary px-3 text-red-500 font-bold py-1 border border-cyan rounded-full text-sm">
                    No Quiz Found
                  </p>
                </div>
              )}
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
