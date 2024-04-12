import { Course } from "@/pages/add-course-plan";
import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { getTime } from "@/pages/share-experience";

export default function ViewCourseInfo({ course }: { course: Course }) {
  return (
    <Card className="w-full">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 dark:border-gray-700 flex p-6 w-full justify-between">
          <div className="flex-1 grid gap-1.5 w-3/4">
            <h1 className="text-lg font-bold">{course.name}</h1>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
              {course.description}
            </p>
          </div>
          <div className="w-1/4 mr-6">
            <div className="mt-1 w-56 origin-top-right flex gap-2 items-center justify-center">
              <div className="flex flex-col items-center gap-1.5 color-gray-500 dark:color-gray-400 cursor-pointer hover:text-color-gray-700 dark:hover:text-color-gray-300">
                <StarIcon className="mr-2 h-4 w-4" />
                Favorite
              </div>
              <div className="flex flex-col items-center gap-1.5 color-gray-500 dark:color-gray-400 cursor-pointer hover:text-color-gray-700 dark:hover:text-color-gray-300">
                <FlagIcon className="mr-2 h-4 w-4" />
                Report
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col gap-4">
          <div
            className="grid gap-1.5 border-b border-gray-200 dark:border-gray- pb-3
          "
          >
            <h2 className="text-lg font-bold">Course Information</h2>
            <dl className="grid gap-2">
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Time</dt>
                <dd className="text-sm flex-1">
                  {getTime(course.startTime)} - {getTime(course.endTime)}
                </dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Semester</dt>
                <dd className="text-sm flex-1">{course.semester}</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Year</dt>
                <dd className="text-sm flex-1">2024</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Difficulty</dt>
                <dd className="text-sm flex-1">Intermediate</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Location</dt>
                <dd className="text-sm flex-1">{course.location}</dd>
              </div>
              <div className="flex items-center">
                <dt className="min-w-[8rem] text-sm font-medium">Days</dt>
                <dd className="text-sm flex-1">
                  {course.days.map((day) => {
                    if (day === "Thur") return <span key={day}>Th</span>;
                    else {
                      return <span key={day}>{day.charAt(0)}</span>;
                    }
                  })}
                </dd>
              </div>
            </dl>

            <div className="grid gap-1.5 border-t border-gray-200 dark:border-gray- pt-3">
              <h2 className="text-lg font-bold">
                How Students Rate This Class
              </h2>
              <dl className="grid gap-2">
                <div className="flex items-center">
                  <dt className="min-w-[8rem] text-sm font-medium">Upvotes</dt>
                  <dd
                    className="text-sm flex-1 text-green-500 dark:text-green-400
                    font-semibold
                  "
                  >
                    {course.upvotes}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt
                    className="min-w-[8rem] text-sm font-medium

                  "
                  >
                    Downvotes
                  </dt>
                  <dd className="text-sm  text-red-500 dark:text-red-400 font-semibold flex-1">
                    {course.downvotes}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="min-w-[8rem] text-sm font-medium">Medium</dt>
                  <dd className="text-sm flex-1">{course.medium}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="min-w-[8rem] text-sm font-medium">
                    Attendance Requirements
                  </dt>
                  <dd className="text-sm flex-1">{course.attendance_medium}</dd>
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
                  <dd className="text-sm flex-1">{course.purchase_required}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="min-w-[8rem] text-sm font-medium">
                    Purchase Amount
                  </dt>
                  <dd className="text-sm flex-1">${course.purchase_amount}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="min-w-[8rem] text-sm font-medium">
                    Project Requirements
                  </dt>
                  <dd className="text-sm flex-1">{course.project_required}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="grid gap-1.5 border-b border-gray-200 dark:border-gray- pb-3">
            <h2 className="text-lg font-bold">Exams</h2>
            <div className="grid gap-2">
              {course.exams.map((exam) => (
                <div className="flex items-center" key={exam.name}>
                  <dt className="min-w-[8rem] text-sm font-medium">
                    {exam.name}
                  </dt>
                  <dd className="text-sm flex-1">{exam.date}</dd>
                  <dd className="text-sm flex-1">{exam.time}</dd>
                  <dd className="text-sm flex-1">{exam.medium}</dd>
                  <dd className="text-sm flex-1">{exam.location}</dd>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-1.5 border-b border-gray-200 dark:border-gray- pb-3">
            <h2 className="text-lg font-bold">Assignments</h2>
            <div className="grid gap-2">
              {course.assignments.map((assignment) => (
                <div className="flex items-center" key={assignment.name}>
                  <dt className="min-w-[8rem] text-sm font-medium">
                    {assignment.name}
                  </dt>
                  <dd className="text-sm flex-1">{assignment.dueDate}</dd>
                  <dd className="text-sm flex-1">{assignment.grade}</dd>
                  <dd className="text-sm flex-1">{assignment.medium}</dd>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-1.5 border-b border-gray-200 dark:border-gray- pb-3">
            <h2 className="text-lg font-bold">Professor</h2>
            <div className="grid gap-1.5 border-b border-gray-200 dark:border-gray- pb-3">
              <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{course.professor?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <h3 className="text-base font-semibold">
                      {course.professor?.name}
                    </h3>
                    <div className="flex items-center gap-0.5 text-sm">
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4" />
                      <StarIcon className="h-4 w-4 opacity-30" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.professor.reviews} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-1.5">
            <h2 className="text-lg font-bold">Comments</h2>
            <div className="grid gap-4">
              {course.comments.map((comment) => (
                <div key={comment.id} className="flex items-center gap-1.5">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <h3 className="text-sm font-semibold">{comment.user}</h3>
                    <div className="flex items-center gap-0.5 text-xs">
                      {comment.comment}
                    </div>
                  </div>
                </div>
              ))}
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
