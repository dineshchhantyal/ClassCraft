"use client";
import React from "react";
import signIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";

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

    // else successful
    console.log(result);
    return router.push("/admin");
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
            <Button type="submit">Sign up</Button>
          </div>
        </form>
      </div>
      {/* test  */}
    </main>
  );
}

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
