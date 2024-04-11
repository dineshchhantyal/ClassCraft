import Layout from "@/components/layout/layout";
import React from "react";

const Page = () => {
  return (
    <section className="grid place-items-center text-center">
      <div>
        <h1>Support</h1>
        <p className="text-gray-500 text-sm">Get help with your issues here.</p>
      </div>
    </section>
  );
};

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Page;
