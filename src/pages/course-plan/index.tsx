import AuthLayout from "@/components/layout/authLayout";
import Layout from "@/components/layout/layout";
import React from "react";

const Page = () => {
  return <section className="container mx-auto">Course Plan</section>;
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
