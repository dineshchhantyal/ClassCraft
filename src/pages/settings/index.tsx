import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import AuthLayout from "@/components/layout/authLayout";
import signOut from "@/firebase/auth/signOut";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

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
          <div className="grid grid-cols-2 items-center gap-4">
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
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-sm" htmlFor="password">
              Password
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
            <Button size="sm">Submit</Button>
          </div>
        </div>
      </div>
      {/* log out button */}
      <div className="container max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center gap-4">
          <Button onClick={handleLogOut} size="sm" variant="destructive">
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
