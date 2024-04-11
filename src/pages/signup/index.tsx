"use client";
import React from "react";
import signUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState(searchParams.get("email") || "");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  console.log(email);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error || !result) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
      return console.log(error);
    }

    if (result.user.emailVerified === false) {
      toast({
        description: "Please verify your email",
        variant: "default",
      });
    } else {
      console.log("Email verified");
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <main className="grid place-items-center">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-3">Sign up</h1>
        <form onSubmit={handleForm} className="form flex flex-col gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">
              <p>Email</p>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </Label>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">
              <p>Password</p>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </Label>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Button type="submit">Sign up</Button>
          </div>
        </form>
        {/* sign in */}
        <div className=" w-full max-w-sm  gap-1.5 text-center mt-3">
          <span>Already have a account? </span>
          <span>
            <Link href="/signin" className="text-blue-500">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
