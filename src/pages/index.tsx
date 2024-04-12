import { Button } from "@/components/ui/button";
import Image from "next/image";
import Layout from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { userInfo: user } = useAuthContext();
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Your Academic Adventure Awaits
              </h1>
              <p className="text-gray-500 text-base dark:text-gray-400">
                Plan your courses. Share your insights. Level up your learning.
              </p>
            </div>
            {user ? (
              <div>
                <Link href="/course-plan">
                  <Button>Course Plan</Button>
                </Link>
              </div>
            ) : (
              <form
                className="flex flex-col gap-2 max-w-[400px]"
                action="/signup"
                method="get"
              >
                <label className="sr-only" htmlFor="email">
                  Enter your email
                </label>
                <Input
                  className="mx-auto w-full max-w-[400px]"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                />
                <Button className="mx-auto w-full max-w-[400px]" type="submit">
                  Sign Up
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      {/* make 2 * 2 grid for features no image required */}
      <section className="container mx-auto py-12 md:py-24 lg:py-32 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4 px-4 md:px-6 lg:gap-10 min-h-48">
          <div className="space-y-4 ">
            <h2 className="text-3xl font-bold tracking-tighter">
              Effortless Course Planning
            </h2>
            <p className="mx-auto max-w-3xl text-gray-500 text-base dark:text-gray-400">
              With ClassCraft, you can easily plan your courses for the
              semester. Drag and drop classes, visualize your week, and avoid
              conflicts.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-6 lg:gap-10 min-h-48">
          <div className="space-y-4 ">
            <h2 className="text-3xl font-bold tracking-tighter">
              Post-Semester Insights
            </h2>
            <p className="mx-auto max-w-3xl text-gray-500 text-base dark:text-gray-400">
              After each semester, you can earn money by sharing valuable
              feedback on the courses you took. Write reviews about assignments,
              difficulty level, recommended textbooks, and more. Your insights
              will help other students avoid pitfalls and excel.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-6 lg:gap-10 min-h-48">
          <div className="space-y-4 ">
            <h2 className="text-3xl font-bold tracking-tighter">
              Data-Driven Decisions
            </h2>
            <p className="mx-auto max-w-3xl text-gray-500 text-base dark:text-gray-400">
              ClassCraft empowers you to make informed choices for your next
              semester. Utilize the feedback you provide and access anonymized
              reviews from other students to plan your coursework with
              confidence, knowing what to expect from each class.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-6 lg:gap-10 min-h-48">
          <div className="space-y-4 ">
            <h2 className="text-3xl font-bold tracking-tighter">
              Solve the Unknown
            </h2>
            <p className="mx-auto max-w-3xl text-gray-500 text-base dark:text-gray-400">
              Say goodbye to the hassle of searching for course materials. With
              ClassCraft, you&apos;ll get the inside scoop on assignments and
              preferred learning styles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
