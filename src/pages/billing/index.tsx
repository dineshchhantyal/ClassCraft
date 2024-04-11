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

  return <section className="container mx-auto">Billing info</section>;
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
