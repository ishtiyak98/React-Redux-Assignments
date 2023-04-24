import React from "react";
import StudentRegistrationForm from "../../components/StudentRegistrationForm/StudentRegistrationForm";

const StudentRegistration = () => {
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <StudentRegistrationForm></StudentRegistrationForm>
      </section>
    </>
  );
};

export default StudentRegistration;
