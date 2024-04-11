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
import { CalendarIcon, Settings2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

const Page = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [coursePlanName, setCoursePlanName] = useState("");
  const [creditHours, setCreditHours] = useState(7);

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
          <div className="flex flex-col space-y-2">
            {/* <h1 className="text-3xl font-bold">Fall 2024</h1> */}
            <Input
              className="text-3xl font-bold"
              value={coursePlanName ?? "Change Name"}
              onChange={(e) => setCoursePlanName(e.target.value)}
              placeholder="Change Name"
            ></Input>
            <span className="text-lg font-semibold">{creditHours} credits</span>

            <span className="text-sm text-gray-500">Semester Date</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  {/* start date and end date of sem */}
                  {/* 08/26/2024 - 12/14/2024 */}
                  {startDate && endDate
                    ? `${format(startDate, "MM/dd/yyyy")} - ${format(
                        endDate,
                        "MM/dd/yyyy"
                      )}`
                    : "Set Semester Date"}
                  <Settings2 className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Semester Date</DialogTitle>
                  <DialogDescription>
                    Make changes to your semester date
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-date" className="text-right">
                      Start Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end-date" className="text-right">
                      End Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/* {endDate && startDate && endDate < startDate && (
                    <div className="col-span-4 text-red-500">
                      End date must be after start date
                    </div>
                  )} */}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="relative w-full">
              <Input placeholder="Search: CSCI, ENGL, etc." className="py-6" />
              <SearchIcon className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 cursor-not-allowed" />
            </div>
          </div>
        </div>
        <div className="w-4/5 flex ml-2 gap-2">
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
                  </div>
                ))}
                {<div className="h-8"></div>}
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed h-56">
                  <p className="text-sm">CINS 3044-40277</p>
                  <p className="text-xs">11:00am-12:15pm</p>
                  <p className="text-xs">Hemphill Hall</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed">
                  <p className="text-sm">CSCI 1070-40409</p>
                  <p className="text-xs">8:00am-9:15am</p>
                  <p className="text-xs">Hemphill Hall 308</p>
                </div>
                {<div className="h-8"></div>}
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-200 p-2 rounded-md cursor-not-allowed h-56">
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
