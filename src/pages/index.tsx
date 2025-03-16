import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { BookOpen, ClipboardList, BarChart, Lightbulb } from "lucide-react"; // Using Lucide icons

export default function Home() {
  const { userInfo: user } = useAuthContext();
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
                Your Academic Adventure Awaits
              </h1>
              <p className="text-gray-600 text-lg md:text-xl dark:text-gray-400 max-w-2xl mx-auto">
                Plan your courses. Share your insights. Level up your learning.
              </p>
            </div>
            {user ? (
              <div>
                <Link href="/course-plan">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105">
                    Course Plan
                  </Button>
                </Link>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4 max-w-[400px] w-full"
                action="/signup"
                method="get"
              >
                <label className="sr-only" htmlFor="email">
                  Enter your email
                </label>
                <Input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                />
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105"
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Effortless Course Planning",
              description:
                "With ClassCraft, you can easily plan your courses for the semester. Drag and drop classes, visualize your week, and avoid conflicts.",
              icon: <BookOpen className="w-8 h-8 text-orange-500" />,
            },
            {
              title: "Post-Semester Insights",
              description:
                "After each semester, you can earn money by sharing valuable feedback on the courses you took. Write reviews about assignments, difficulty level, recommended textbooks, and more.",
              icon: <ClipboardList className="w-8 h-8 text-orange-500" />,
            },
            {
              title: "Data-Driven Decisions",
              description:
                "ClassCraft empowers you to make informed choices for your next semester. Utilize the feedback you provide and access anonymized reviews from other students.",
              icon: <BarChart className="w-8 h-8 text-orange-500" />,
            },
            {
              title: "Solve the Unknown",
              description:
                "Say goodbye to the hassle of searching for course materials. With ClassCraft, you'll get the inside scoop on assignments and preferred learning styles.",
              icon: <Lightbulb className="w-8 h-8 text-orange-500" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold tracking-tighter text-gray-900">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-base dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Ready to Elevate Your Learning Experience?
            </h2>
            <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of students who are already using ClassCraft to plan their courses and share insights.
            </p>
            <Link href="/signup">
              <Button className="bg-white text-orange-500 px-8 py-4 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};