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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { signInWithGoogle } from "@/firebase/auth/signInWithGoogle";

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
    return router.push("/course-plan");
  };

  const handleSignWithGoogle = async () => {
    const { result, error } = await signInWithGoogle();

    if (error) {
      return console.log(error);
    }

    toast({
      description: "Sign in successful",
      variant: "default",
    });
    // else successful

    return router.push("/course-plan");
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
        <Separator className="my-3" />
        {/* sign in with google button */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Button type="button" onClick={handleSignWithGoogle}>
            <Image
              alt="Google"
              src="/google.svg"
              width="20"
              height="20"
              className="mr-2"
            />
            Sign up with Google
          </Button>
        </div>
        <Separator className="my-3" />
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
