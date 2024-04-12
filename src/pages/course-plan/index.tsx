import AuthLayout from "@/components/layout/authLayout";
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Page = () => {
  const router = useRouter();
  const [times, setTimes] = useState([8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const courses = [
    {
      id: 1,
      name: "CSCI 1070-40409",
      time: "8:00am-9:15am",
      startTime: 8,
      endTime: 9.15,
      location: "Hemphill Hall 308",
      days: ["Mon", "Wed"],
    },
    {
      id: 2,
      name: "CSCI 3030-43896",
      time: "11:00am-12:15pm",
      location: "Hemphill Hall",
      startTime: 11,
      endTime: 12.15,
      days: ["Tues", "Thur"],
    },
    // {
    //   id: 3,
    //   name: "ENGL 2050-44685",
    //   time: "12:30pm-1:45pm",
    //   location: "George T Walker Hall 3-91",
    //   startTime: 12.5,
    //   endTime: 1.45,
    //   days: ["Mon", "Wed"],
    // },
    // {
    //   id: 4,
    //   name: "CSCI 4055-45480",
    //   time: "2:00pm-3:15pm",
    //   location: "Hemphill Hall",
    //   startTime: 2,
    //   endTime: 3.15,
    //   days: ["Tues", "Thur"],
    // },
    // {
    //   id: 5,
    //   name: "CINS 3044-40277",
    //   time: "11:00am-12:15pm",
    //   location: "Hemphill Hall",
    //   startTime: 11,
    //   endTime: 12.15,
    //   days: ["Mon", "Wed"],
    // },
    // {
    //   id: 6,
    //   name: "CSCI 3020-42501",
    //   time: "12:30pm-1:45pm",
    //   location: "Hemphill Hall 308",
    //   startTime: 12.5,
    //   endTime: 1.45,
    //   days: ["Tues", "Thur"],
    // },
  ];

  const days = ["Mon", "Tues", "Wed", "Thur", "Fri"];
  const colors = ["yellow-200", "green-200", "blue-200", "red-200"];

  const classByDay =
    ((day: string) => {
      const formattedCourses: {
        id: number;
        name: string;
        time: string;
        location: string;
      }[] = [];
      courses.forEach((course) => {
        if (course.days.includes(day)) {
          formattedCourses.push(course);
        }
      });
      return formattedCourses;
    }) ?? [];

  const getClassColor = useCallback((course: { id: number }) => {
    const index = courses.findIndex((c) => c.id === course.id);
    return colors[index % colors.length];
  }, []);
  const getClassesByTime = useCallback(
    (time: number) => {
      return courses.filter(
        (course) => course.startTime <= time && course.endTime >= time
      );
    },
    [courses]
  );
  return (
    <section className="container mx-auto mt-4">
      {" "}
      <div className="flex justify-between">
        <div className="w-1/5">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Spring 2024</h1>
            <span className="text-lg font-semibold">21 credits</span>

            <div className="flex space-x-2 items-center cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-gray-500 hover:text-orange-300 "
                      onClick={() => {
                        router.push("/add-course-plan");
                      }}
                    >
                      <PlusIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>New Course Plan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <PrinterIcon className="text-gray-500 hover:text-gray-300 " />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Print</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <DownloadIcon className="text-gray-500 hover:text-gray-300 " />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <ShareIcon className="text-gray-500 hover:text-gray-300 " />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button variant="destructive" disabled>
              {/* start date and end date of sem */}
              08/26/2024 - 12/14/2024
            </Button>
            <div className="relative w-full">
              <Input
                placeholder="Search: CSCI, ENGL, etc."
                className="py-6"
                disabled
              />
              <SearchIcon className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 cursor-not-allowed" />
            </div>
          </div>
          {/* end of semester approaching, cannot edit please give feedback */}
          <div className="bg-yellow-100 p-4 rounded-md mt-4">
            <p className="text-sm text-gray-500 my-2">
              The end of the semester is approaching. You can no longer edit
              your schedule. Please give feedback on your experience.
            </p>
            <p className="text-sm cursor-pointer hover:underline my-2 text-gray-500">
              Help other students by sharing your class experience.{" "}
            </p>
            <Link href="/share-experience">
              <Button variant="default">Share Class Experience</Button>
            </Link>
          </div>
        </div>
        <div className="w-4/5 flex ml-2 gap-2 relative rounded-md ">
          {/* overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 z-50 grid place-items-center backdrop-blur-sm border p-4 rounded border-yellow-200">
            <div className="p-4 mt-4 w-9/12">
              <p className="text-sm text-green-500 font-semibold my-2">
                As the semester draws to a close, it&apos;s important to note
                that schedule modifications are no longer possible.
                <br />
                We value your feedback on your academic journey.
              </p>
              <p className="text-sm cursor-pointer hover:underline my-2 text-green-800 font-semibold">
                Enhance the learning experience for fellow students by sharing
                insights from your classes.
              </p>
              <Link href="/share-experience">
                <Button variant="default">Share Your Class Experience</Button>
              </Link>
            </div>
          </div>

          <Separator orientation="vertical" />
          <div className="times mt-8 space-y-8">
            {times.map((time) => (
              <div key={time} className="flex justify-end items-center">
                <span>{time}:00</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Mon</span>
              <span>Tues</span>
              <span>Wed</span>
              <span>Thur</span>
              <span>Fri</span>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-4">
                {classByDay("Mon").map((course) => (
                  <div
                    key={course.id}
                    className={cn(
                      `bg-${getClassColor(course)}`,
                      "p-2 rounded-md cursor-not-allowed"
                    )}
                  >
                    <p className="text-sm">{course.name}</p>
                    <p className="text-xs">{course.time}</p>
                    <p className="text-xs">{course.location}</p>
                    {/* vaccent space */}
                    {Math.random() > 0.5 && <div className="h-8"></div>}
                    {Math.random() > 0.5 && <div className="h-8"></div>}
                    {Math.random() > 0.5 && <div className="h-8"></div>}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CINS 3044-40277</p>
                  <p className="text-xs">11:00am-12:15pm</p>
                  <p className="text-xs">Hemphill Hall</p>
                </div>
                {Math.random() > 0.5 && <div className="h-8"></div>}

                <div className="bg-green-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CSCI 3020-42501</p>
                  <p className="text-xs">12:30pm-1:45pm</p>
                  <p className="text-xs">Hemphill Hall 308</p>
                </div>
                {Math.random() > 0.5 && <div className="h-8"></div>}
                {Math.random() > 0.5 && <div className="h-8"></div>}
                <div className="bg-red-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CSCI 4055-45480</p>
                  <p className="text-xs">2:00pm-3:15pm</p>
                  <p className="text-xs">Hemphill Hall</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CSCI 3030-43896</p>
                  <p className="text-xs">11:00am-12:15pm</p>
                  <p className="text-xs">Hemphill Hall</p>
                </div>
                {Math.random() > 0.5 && <div className="h-8"></div>}
                {Math.random() > 0.5 && <div className="h-8"></div>}
                <div className="bg-blue-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">ENGL 2050-44685</p>
                  <p className="text-xs">12:30pm-1:45pm</p>
                  <p className="text-xs">George T Walker Hall 3-91</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CSCI 1070-40409</p>
                  <p className="text-xs">8:00am-9:15am</p>
                  <p className="text-xs">Hemphill Hall 308</p>
                </div>
                <div className="bg-green-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CSCI 3020-42501</p>
                  <p className="text-xs">12:30pm-1:45pm</p>
                  <p className="text-xs">Hemphill Hall 308</p>
                </div>
              </div>
              {Math.random() > 0.5 && <div className="h-8"></div>}
              {Math.random() > 0.5 && <div className="h-8"></div>}
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CINS 3044-40277</p>
                  <p className="text-xs">11:00am-12:15pm</p>
                  <p className="text-xs">Hemphill Hall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      {" "}
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function PrinterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
