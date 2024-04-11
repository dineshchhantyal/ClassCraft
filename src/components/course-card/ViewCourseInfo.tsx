import { Course } from "@/pages/add-course-plan";
import React from "react";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function ViewCourseInfo({ course }: { course: Course }) {
  return (
    <Card className="w-full max-w-3xl max-h-screen overflow-y-scroll">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 dark:border-gray-700 flex p-6">
          <div className="flex-1 grid gap-1.5">
            <h1 className="text-lg font-bold">
              Introduction to Computer Science
            </h1>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
              An introduction to the world of computer science.
            </p>
          </div>
          <div>
            <div className="ml-2 p-0 w-8 h-8 rounded-full flex items-center justify-center">
              <CircleEllipsisIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </div>
            <div className="mt-1 w-56 origin-top-right">
              <div>
                <EyeIcon className="mr-2 h-4 w-4" />
                View Course
              </div>
              <div>
                <StarIcon className="mr-2 h-4 w-4" />
                Favorite
              </div>
              <div>
                <FlagIcon className="mr-2 h-4 w-4" />
                Report
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col gap-4">
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">Course Information</h2>
            <dl className="grid gap-2">
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Time</dt>
                <dd className="text-sm flex-1">10:00 - 11:30</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Semester</dt>
                <dd className="text-sm flex-1">Spring</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Year</dt>
                <dd className="text-sm flex-1">2023</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Difficulty</dt>
                <dd className="text-sm flex-1">Intermediate</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Location</dt>
                <dd className="text-sm flex-1">Room 201</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Days</dt>
                <dd className="text-sm flex-1">MWF</dd>
              </div>
            </dl>
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">Exams and Assignments</h2>
            <dl className="grid gap-2">
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Midterm Exam
                </dt>
                <dd className="text-sm flex-1">Oct 25, 2023</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Final Exam</dt>
                <dd className="text-sm flex-1">Dec 15, 2023</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Assignment 1
                </dt>
                <dd className="text-sm flex-1">Due Nov 5, 2023</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Assignment 2
                </dt>
                <dd className="text-sm flex-1">Due Dec 3, 2023</dd>
              </div>
            </dl>
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">How Students Rate This Class</h2>
            <dl className="grid gap-2">
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Upvotes</dt>
                <dd className="text-sm flex-1">24</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Downvotes</dt>
                <dd className="text-sm flex-1">3</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Medium</dt>
                <dd className="text-sm flex-1">In-person</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Attendance Requirements
                </dt>
                <dd className="text-sm flex-1">Mandatory</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Workload</dt>
                <dd className="text-sm flex-1">Heavy</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Knowledge Level
                </dt>
                <dd className="text-sm flex-1">Advanced</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Grading Criteria
                </dt>
                <dd className="text-sm flex-1">Fair</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Professor&apos;s Helpfulness
                </dt>
                <dd className="text-sm flex-1">Very helpful</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Purchase Requirements
                </dt>
                <dd className="text-sm flex-1">Textbook</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Purchase Amount
                </dt>
                <dd className="text-sm flex-1">$$</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">
                  Project Requirements
                </dt>
                <dd className="text-sm flex-1">Group project</dd>
              </div>
            </dl>
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">Professor</h2>
            <div className="grid gap-1.5">
              <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                  <Avatar className="w-10 h-10" />
                  <div className="grid gap-0.5">
                    <h3 className="text-base font-semibold">
                      Dr. Emily Johnson
                    </h3>
                    <div className="flex items-center gap-0.5 text-sm">
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4 opacity-30" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      123 reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">Comments</h2>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Avatar className="w-8 h-8" />
                  <div className="grid gap-0.5">
                    <h3 className="text-sm font-semibold">Sarah Adams</h3>
                    <div className="flex items-center gap-0.5 text-xs">
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3 opacity-30" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This course was fantastic. The professor was engaging and made
                  the material interesting. The workload was manageable, and I
                  felt like I learned a lot. Would definitely recommend this
                  course to others.
                </p>
              </div>
              <div className="grid gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Avatar className="w-8 h-8" />
                  <div className="grid gap-0.5">
                    <h3 className="text-sm font-semibold">Alex Parker</h3>
                    <div className="flex items-center gap-0.5 text-xs">
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3" />
                      <StarIcon className="h-3 w-3 opacity-30" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The course content was interesting, but the professor was not
                  very organized. The workload was heavier than expected, and
                  the grading criteria seemed a bit arbitrary. Overall, I think
                  the course has potential, but there are some areas that could
                  be improved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CircleEllipsisIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
