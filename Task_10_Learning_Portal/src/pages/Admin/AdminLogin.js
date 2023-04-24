import React from "react";
import AdminLoginForm from "../../components/AdminLoginForm/AdminLoginForm";

const AdminLogin = () => {
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <AdminLoginForm></AdminLoginForm>
      </section>
    </>
  );
};

export default AdminLogin;
