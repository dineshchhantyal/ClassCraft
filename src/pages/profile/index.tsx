import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import AuthLayout from "@/components/layout/authLayout";
import signOut from "@/firebase/auth/signOut";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const { userInfo: user } = useAuthContext();
  const [name, setName] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");

  const handleLogOut = async () => {
    try {
      signOut();
      toast({
        description: "Logged out",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full py-12">
      <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Profile
          </h1>

          <Image
            alt="Profile"
            className="mx-auto h-24 w-24 rounded-full"
            height="96"
            width="96"
            src={user?.photoURL ?? "placeholder.svg"}
          />

          {/* classification */}
          <div className="flex items-center justify-center gap-2">
            <p
              className="font-bold
                text-orange-500
                text-xs border border-orange-500 rounded-full w-max px-2 py-1

            "
            >
              {"Sophomore"}
            </p>
            <p
              className="font-bold
                text-green-500
                text-xs border border-green-500 rounded-full w-max px-2 py-1"
            >
              University of Louisiana at Monroe
            </p>
          </div>
        </div>
      </div>
      <div className="container max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-sm" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-x-4">
            <Label className="text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="m-0"></p>
            {/* email verified */}
            {user?.emailVerified ? (
              <p className="text-green-500 text-sm m-1">Email verified</p>
            ) : (
              <p className="text-red-500 text-sm m-1">Email not verified</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm">Submit</Button>
          </div>
          <Separator />
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-sm" htmlFor="password">
              Old Password
            </Label>
            <Input
              id="password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-sm" htmlFor="new-password">
              New Password
            </Label>
            <Input
              id="new-password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-sm" htmlFor="confirm">
              Confirm Password
            </Label>
            <Input
              id="confirm"
              placeholder="Enter password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm">Change Password</Button>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-sm" htmlFor="code">
              Invite Code
            </Label>
            <Input
              id="code"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm">Submit Code</Button>
          </div>
        </div>
      </div>
      <Separator />
      {/* log out button */}
      <div className="container max-w-3xl px-4 py-2 md:px-6">
        <div className="flex items-center gap-4 w-full">
          <Button
            onClick={handleLogOut}
            className="w-full"
            variant="destructive"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
