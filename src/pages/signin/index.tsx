"use client";
import React from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { signInWithGoogle } from "@/firebase/auth/signInWithGoogle";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }
    toast({
      description: "Sign in successful",
      variant: "default",
    });
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
        <h1 className="mt-60 mb-3">Sign in</h1>
        <form onSubmit={handleForm} className="form flex flex-col gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">
              <p>Email</p>
              <Input
                onChange={(e) => setEmail(e.target.value)}
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
            <Button type="submit">Sign in</Button>
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
            Sign in with Google
          </Button>
        </div>
        <Separator className="my-3" />
        <div className=" w-full max-w-sm  gap-1.5 text-center mt-3">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
      {/* test  */}
    </main>
  );
}

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
