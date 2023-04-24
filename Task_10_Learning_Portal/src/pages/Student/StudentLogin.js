import React from "react";
import StudentLoginForm from "../../components/StudentLoginForm/StudentLoginForm";

const StudentLogin = () => {
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <StudentLoginForm></StudentLoginForm>
      </section>
    </>
  );
};

export default StudentLogin;
