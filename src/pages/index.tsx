import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/layout";
import AuthLayout from "@/components/layout/authLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={cn(
        `flex min-h-screen flex-col items-center justify-between p-24`,
        inter.className
      )}
    >
      <Button>Click me</Button>
    </main>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
