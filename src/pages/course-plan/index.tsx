import AuthLayout from "@/components/layout/authLayout";
import Layout from "@/components/layout/layout";
import React from "react";

const Page = () => {
  return <div>Course Plan</div>;
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      {" "}
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
