import Layout from "@/components/layout/layout";
import AuthLayout from "@/components/layout/authLayout";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BrainCog, CircleCheckBig, MoveDown, MoveUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const courses = [
  {
    id: 1,
    name: "CSCI 1070-40409",
    description: "Introduction to Computing",
    time: "8:00am-9:15am",
    semester: "Fall",
    year: 2021,
    difficulty: 3, // 1-5
    startTime: 8,
    endTime: 9.15,
    location: "Hemphill Hall 308",
    days: ["Mon", "Wed"],
    upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    workload: 3, // 1-5
    knowledge: 3, // 1-5
    grading: 3, // 1-5
    helpfulness: 3, // 1-5
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required
    project_required: false,
    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
      courses: [
        {
          id: 1,
          name: "CSCI 1070-40409",
          rating: 4.5,
          reviews: 20,
        },
        {
          id: 2,
          name: "CSCI 3030-43896",
          rating: 4.5,
          reviews: 20,
        },
      ],
    },

    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        dueDate: "2021-09-01",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 2,
        name: "Assignment 2",
        dueDate: "2021-09-08",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 3,
        name: "Assignment 3",
        dueDate: "2021-09-15",
        grade: 100,
        medium: "online", // online, in-person
      },
    ],
  },
  {
    id: 2,
    name: "CSCI 3030-43896",
    time: "11:00am-12:15pm",
    location: "Hemphill Hall",
    startTime: 11,
    endTime: 12.15,
    days: ["Tues", "Thur"],

    semester: "Fall",
    year: 2021,
    difficulty: 3, // 1-5
    upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    workload: 3, // 1-5
    knowledge: 3, // 1-5
    grading: 3, // 1-5
    helpfulness: 3, // 1-5
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required
    project_required: false,
    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
      courses: [
        {
          id: 1,
          name: "CSCI 1070-40409",
          description: "Introduction to Computing",
          rating: 4.5,
          reviews: 20,
        },
        {
          id: 2,
          name: "CSCI 3030-43896",
          description: "Data Structures",
          rating: 4.5,
          reviews: 20,
        },
      ],
    },

    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        dueDate: "2021-09-01",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 2,
        name: "Assignment 2",
        dueDate: "2021-09-08",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 3,
        name: "Assignment 3",
        dueDate: "2021-09-15",
        grade: 100,
        medium: "online", // online, in-person
      },
    ],
  },
  {
    id: 3,
    name: "ENGL 2050-44685",
    time: "12:30pm-1:45pm",
    location: "George T Walker Hall 3-91",
    startTime: 12.5,
    endTime: 1.45,
    days: ["Mon", "Wed"],
    semester: "Fall",
    year: 2021,
    difficulty: 3, // 1-5
    workload: 3, // 1-5
    knowledge: 3, // 1-5
    grading: 3, // 1-5
    helpfulness: 3, // 1-5
    project_required: false,
    upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required
    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
      },
    ],

    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
      courses: [
        {
          id: 1,
          name: "CSCI 1070-40409",
          rating: 4.5,
          reviews: 20,
        },
        {
          id: 2,
          name: "CSCI 3030-43896",
          rating: 4.5,
          reviews: 20,
        },
      ],
    },

    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        dueDate: "2021-09-01",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 2,
        name: "Assignment 2",
        dueDate: "2021-09-08",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 3,
        name: "Assignment 3",
        dueDate: "2021-09-15",
        grade: 100,
        medium: "online", // online, in-person
      },
    ],

    exams: [
      {
        id: 1,
        name: "Midterm 1",
        date: "2021-10-01",
        time: "12:30pm-1:45pm",
        location: "George T Walker Hall 3-91",
        medium: "in-person", // online, in-person
      },
      {
        id: 2,
        name: "Midterm 2",
        date: "2021-11-01",
        time: "12:30pm-1:45pm",
        location: "George T Walker Hall 3-91",
        medium: "in-person", // online, in-person
      },
    ],
  },
  {
    id: 4,
    name: "CSCI 4055-45480",
    time: "2:00pm-3:15pm",
    location: "Hemphill Hall",
    startTime: 2,
    endTime: 3.15,
    days: ["Tues", "Thur"],

    semester: "Fall",
    year: 2021,
    difficulty: 3, // 1-5
    upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    workload: 3, // 1-5
    knowledge: 3, // 1-5
    grading: 3, // 1-5
    helpfulness: 3, // 1-5
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required
    project_required: false,
    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
      courses: [
        {
          id: 1,
          name: "CSCI 1070-40409",
          rating: 4.5,
          reviews: 20,
        },
        {
          id: 2,
          name: "CSCI 3030-43896",
          rating: 4.5,
          reviews: 20,
        },
      ],
    },

    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
      },
    ],

    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        dueDate: "2021-09-01",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 2,
        name: "Assignment 2",
        dueDate: "2021-09-08",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 3,
        name: "Assignment 3",
        dueDate: "2021-09-15",
        grade: 100,
        medium: "online", // online, in-person
      },
    ],
  },
  {
    id: 5,
    name: "CINS 3044-40277",
    time: "11:00am-12:15pm",
    location: "Hemphill Hall",
    startTime: 11,
    endTime: 12.15,
    days: ["Mon", "Wed"],

    semester: "Fall",
    year: 2021,
    difficulty: 3, // 1-5
    upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    workload: 3, // 1-5
    knowledge: 3, // 1-5
    grading: 3, // 1-5
    helpfulness: 3, // 1-5
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required
    project_required: false,
    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
      courses: [
        {
          id: 1,
          name: "CSCI 1070-40409",
          rating: 4.5,
          reviews: 20,
        },
        {
          id: 2,
          name: "CSCI 3030-43896",
          rating: 4.5,
          reviews: 20,
        },
      ],
    },

    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
      },
    ],

    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        dueDate: "2021-09-01",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 2,
        name: "Assignment 2",
        dueDate: "2021-09-08",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 3,
        name: "Assignment 3",
        dueDate: "2021-09-15",
        grade: 100,
        medium: "online", // online, in-person
      },
    ],
  },
  {
    id: 6,
    name: "CSCI 3020-42501",
    time: "12:30pm-1:45pm",
    location: "Hemphill Hall 308",
    startTime: 12.5,
    endTime: 1.45,
    days: ["Tues", "Thur"],

    semester: "Fall",
    year: 2021,
    difficulty: 3, // 1-5
    upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    workload: 3, // 1-5
    knowledge: 3, // 1-5
    grading: 3, // 1-5
    helpfulness: 3, // 1-5
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required
    project_required: false,

    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
      courses: [
        {
          id: 1,
          name: "CSCI 1070-40409",
          rating: 4.5,
          reviews: 20,
        },
        {
          id: 2,
          name: "CSCI 3030-43896",
          rating: 4.5,
          reviews: 20,
        },
      ],
    },

    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
      },
    ],

    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        dueDate: "2021-09-01",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 2,
        name: "Assignment 2",
        dueDate: "2021-09-08",
        grade: 100,
        medium: "online", // online, in-person
      },
      {
        id: 3,
        name: "Assignment 3",
        dueDate: "2021-09-15",
        grade: 100,
        medium: "online", // online, in-person
      },
    ],
  },
];

const getTime = (date: number) => {
  // time is in format HH.MM
  // but MM = 15, 30, 45
  // so we need to replace . with :
  const time = date.toString();
  // AM or PM
  // if 1 - 6, evening  else morning
  if (date >= 1 && date <= 6) {
    return time.replace(".", ":") + " PM";
  }
  return time.replace(".", ":") + " AM";
};

export default function Page() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(courses[0].id + "");

  const handleNextTab = () => {
    const index = courses.findIndex(
      (course) => course.id === parseInt(currentTab)
    );
    if (index < courses.length - 1) {
      setCurrentTab(courses[index + 1].id + "");
    }

    console.log("completed", completed);
  };
  return (
    <section className="container mx-auto grid gap-4 py-2">
      <Progress value={(completed.length / courses.length) * 100} />
      <Tabs
        defaultValue={currentTab}
        className="w-full"
        onChange={(value) => setCurrentTab(value + "")}
        translate="yes"
      >
        <TabsList>
          {courses.map((course) => (
            <TabsTrigger key={course.id} value={course.id + ""}>
              {completed.includes(course.id) ? (
                <CircleCheckBig className="w-4 h-4 text-green-500 mx-2"></CircleCheckBig>
              ) : (
                <BrainCog className="w-4 h-4 text-gray-500 mx-2"></BrainCog>
              )}
              {course.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {courses.map((course) => (
          <TabsContent key={course.id} value={course.id + ""}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Time
                    </p>
                    <p className="font-semibold">
                      {getTime(course.startTime)} - {getTime(course.endTime)}{" "}
                    </p>
                  </div>
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Semester
                    </p>
                    <p className="font-semibold">{course.semester}</p>
                  </div>
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Year
                    </p>
                    <p className="font-semibold">{course.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Difficulty
                    </p>
                    <p className="font-semibold">3.2</p>
                  </div>
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Days
                    </p>
                    <p className="font-semibold">
                      {course.days.map((day) => {
                        if (day === "Thur") return <span key={day}>Th</span>;
                        else {
                          return <span key={day}>{day.charAt(0)}</span>;
                        }
                      })}
                    </p>
                  </div>
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="font-semibold">{course.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Upvotes
                    </p>
                    <p className="font-semibold">23</p>
                  </div>
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Downvotes
                    </p>
                    <p className="font-semibold">5</p>
                  </div>
                </div>
                <Separator className="w-full" />
                <div className="grid gap-4">
                  <h3 className="font-semibold">Review this course</h3>

                  <form className="grid gap-4">
                    {/* medium */}

                    {/*   upvotes: 20,
    downvotes: 5,
    medium: "in-person", // online, in-person, hybrid
    attendance_required: true,
    attendance_medium: "online", // online, in-person
    purchase_required: false,
    purchase_amount: 0, // 0 if not required, amount if required */}

                    {/* upvote/downvote */}
                    <div className="flex items-center gap-2 absolute left-96">
                      <div className="grid gap-2">
                        <Label htmlFor="upvotes">Upvotes</Label>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="p-2"
                        >
                          <MoveUp className="w-12 h-12 text-green-500" />
                        </Button>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="downvotes">Downvotes</Label>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className="p-2"
                        >
                          <MoveDown className="w-12 h-12 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    {/* attendance */}
                    <div className="grid gap-2">
                      <Label htmlFor="attendance">Attendance</Label>
                      <Select name="attendance">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select an attendance type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Attendance</SelectLabel>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="in-person">In-person</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* purchase */}
                    <div className="grid gap-2">
                      <Label htmlFor="purchase">Purchase</Label>
                      <Select name="purchase">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select if purchase is required" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Purchase</SelectLabel>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="purchase-amount">Purchase Amount</Label>
                      <Input
                        type="number"
                        name="purchase-amount"
                        placeholder="Enter the purchase amount"
                        className="w-max"
                      />
                    </div>

                    {/* project */}

                    <div className="grid gap-2">
                      <Label htmlFor="project">Project</Label>
                      <Select name="project">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select if project is required" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Project</SelectLabel>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="medium">Medium</Label>
                      <Select name="medium">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a medium of study" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Medium</SelectLabel>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="in-person">In-person</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">
                        Difficulty
                        <span className="text-sm pl-2 font-semibold text-gray-500 dark:text-gray-400">
                          (rate the difficulty of this course from 1-5)
                        </span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="difficulty-1" value="1">
                            1
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="difficulty-1"
                          >
                            1
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="difficulty-2" value="2">
                            2
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="difficulty-2"
                          >
                            2
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="difficulty-3" value="3">
                            3
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="difficulty-3"
                          >
                            3
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="difficulty-4" value="4">
                            4
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="difficulty-4"
                          >
                            4
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="difficulty-5" value="5">
                            5
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="difficulty-5"
                          >
                            5
                          </Label>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="workload">
                        Workload
                        <span className="text-sm pl-2 font-semibold text-gray-500 dark:text-gray-400">
                          (rate how heavy the workload is from 1-5)
                        </span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="workload-1" value="1">
                            1
                          </RadioGroupItem>

                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="workload-1"
                          >
                            1
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="workload-2" value="2">
                            2
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="workload-2"
                          >
                            2
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="workload-3" value="3">
                            3
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="workload-3"
                          >
                            3
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="workload-4" value="4">
                            4
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="workload-4"
                          >
                            4
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="workload-5" value="5">
                            5
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="workload-5"
                          >
                            5
                          </Label>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="knowledge">
                        Knowledge
                        <span className="text-sm pl-2 font-semibold text-gray-500 dark:text-gray-400">
                          (rate how much knowledge you gained from this course
                          from 1-5)
                        </span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="knowledge-1" value="1">
                            1
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="knowledge-1"
                          >
                            1
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="knowledge-2" value="2">
                            2
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="knowledge-2"
                          >
                            2
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="knowledge-3" value="3">
                            3
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="knowledge-3"
                          >
                            3
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="knowledge-4" value="4">
                            4
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="knowledge-4"
                          >
                            4
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="knowledge-5" value="5">
                            5
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="knowledge-5"
                          >
                            5
                          </Label>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="grading">
                        Grading
                        <span className="text-sm pl-2 font-semibold text-gray-500 dark:text-gray-400">
                          (rate how you feel about the grading of this course
                          from 1-5)
                        </span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="grading-1" value="1">
                            1
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="grading-1"
                          >
                            1
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="grading-2" value="2">
                            2
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="grading-2"
                          >
                            2
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="grading-3" value="3">
                            3
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="grading-3"
                          >
                            3
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="grading-4" value="4">
                            4
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="grading-4"
                          >
                            4
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="grading-5" value="5">
                            5
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="grading-5"
                          >
                            5
                          </Label>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="helpfulness">
                        Helpfulness
                        <span className="text-sm pl-2 font-semibold text-gray-500 dark:text-gray-400">
                          (rate how helpful you found this course from 1-5)
                        </span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="helpfulness-1" value="1">
                            1
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="helpfulness-1"
                          >
                            1
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="helpfulness-2" value="2">
                            2
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="helpfulness-2"
                          >
                            2
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="helpfulness-3" value="3">
                            3
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="helpfulness-3"
                          >
                            3
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="helpfulness-4" value="4">
                            4
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="helpfulness-4"
                          >
                            4
                          </Label>
                        </RadioGroup>
                        <RadioGroup>
                          <div />
                          <RadioGroupItem id="helpfulness-5" value="5">
                            5
                          </RadioGroupItem>
                          <Label
                            className="cursor-pointer select-none"
                            htmlFor="helpfulness-5"
                          >
                            5
                          </Label>
                        </RadioGroup>
                      </div>
                    </div>
                    {/*  */}
                    <div className="grid gap-2">
                      <Label htmlFor="comments">Additional comments</Label>
                      <Textarea
                        className="min-h-[100px]"
                        id="comments"
                        placeholder="Enter your additional comments here..."
                      />
                    </div>
                  </form>
                </div>
                {/* rate professor */}
                {/* list assignment */}
                {/* list exams */}
                <Card>
                  <CardHeader>
                    <CardTitle>Professor</CardTitle>
                    <CardDescription>
                      Enter the professor&apos;s information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="professor-name">Name</Label>
                        <Input
                          id="professor-name"
                          placeholder="Professor's name"
                          value={course.professor.name}
                          disabled
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="professor-rating">Rating</Label>
                        <div className="flex items-center gap-2">
                          <RadioGroup>
                            <div />
                            <RadioGroupItem id="helpfulness-1" value="1">
                              1
                            </RadioGroupItem>
                            <Label
                              className="cursor-pointer select-none"
                              htmlFor="helpfulness-1"
                            >
                              1
                            </Label>
                          </RadioGroup>
                          <RadioGroup>
                            <div />
                            <RadioGroupItem id="helpfulness-2" value="2">
                              2
                            </RadioGroupItem>
                            <Label
                              className="cursor-pointer select-none"
                              htmlFor="helpfulness-2"
                            >
                              2
                            </Label>
                          </RadioGroup>
                          <RadioGroup>
                            <div />
                            <RadioGroupItem id="helpfulness-3" value="3">
                              3
                            </RadioGroupItem>
                            <Label
                              className="cursor-pointer select-none"
                              htmlFor="helpfulness-3"
                            >
                              3
                            </Label>
                          </RadioGroup>
                          <RadioGroup>
                            <div />
                            <RadioGroupItem id="helpfulness-4" value="4">
                              4
                            </RadioGroupItem>
                            <Label
                              className="cursor-pointer select-none"
                              htmlFor="helpfulness-4"
                            >
                              4
                            </Label>
                          </RadioGroup>
                          <RadioGroup>
                            <div />
                            <RadioGroupItem id="helpfulness-5" value="5">
                              5
                            </RadioGroupItem>
                            <Label
                              className="cursor-pointer select-none"
                              htmlFor="helpfulness-5"
                            >
                              5
                            </Label>
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="professor-reviews">Comment</Label>
                        <Textarea
                          id="professor-reviews"
                          placeholder="Enter your comment here..."
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>
                      Enter the courses' information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="course-id">ID</Label>
                        <Input id="course-id" placeholder="Course ID" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="course-name">Name</Label>
                        <Input id="course-name" placeholder="Course name" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="course-rating">Rating</Label>
                        <Input
                          id="course-rating"
                          placeholder="Rating"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="course-reviews">
                          Number of reviews
                        </Label>
                        <Input
                          id="course-reviews"
                          placeholder="Number of reviews"
                          type="number"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>
                      Enter the assignments&apos; information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="assignment-id">ID</Label>
                        <Input id="assignment-id" placeholder="Assignment ID" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="assignment-name">Name</Label>
                        <Input
                          id="assignment-name"
                          placeholder="Assignment name"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="assignment-due">Due date</Label>
                        <Input id="assignment-due" type="datetime-local" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="assignment-grade">Grade</Label>
                        <Input
                          id="assignment-grade"
                          placeholder="Grade"
                          type="number"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="assignment-medium">Medium</Label>
                        <Select>
                          <SelectTrigger id="assignment-medium">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="in-person">In-person</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* add more*/}
                    <Button
                      variant="outline"
                      onClick={() => {}}
                      className="justify-center"
                    >
                      Add more
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Exams</CardTitle>
                    <CardDescription>
                      Enter the exams&apos; information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="exam-id">ID</Label>
                        <Input id="exam-id" placeholder="Exam ID" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="exam-name">Name</Label>
                        <Input id="exam-name" placeholder="Exam name" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="exam-date">Date</Label>
                        <Input id="exam-date" type="date" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="exam-time">Time</Label>
                        <Input id="exam-time" type="time" />
                      </div>
                    </div>
                    {/* add more*/}
                    <Button
                      variant="outline"
                      onClick={() => {}}
                      className="justify-center"
                    >
                      Add more
                    </Button>
                  </CardContent>
                </Card>
                <div className="grid gap-4">
                  <h3 className="font-semibold">Professor</h3>
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                        Name
                      </p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                        Rating
                      </p>
                      <p className="font-semibold">-</p>
                    </div>
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                        Number of reviews
                      </p>
                      <p className="font-semibold">-</p>
                    </div>
                  </div>
                  <Separator className="w-full" />
                  <h3 className="font-semibold">Courses by this professor</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <Link className="flex-1" href="#">
                        CSCI 1070-40409: Introduction to Computing
                      </Link>
                      <div className="grid gap-1.5">
                        <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                          Rating
                        </p>
                        <p className="font-semibold">-</p>
                      </div>
                      <div className="grid gap-1.5">
                        <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                          Number of reviews
                        </p>
                        <p className="font-semibold">-</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <Link className="flex-1" href="#">
                        CSCI 1070-40409: Introduction to Computing
                      </Link>
                      <div className="grid gap-1.5">
                        <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                          Rating
                        </p>
                        <p className="font-semibold">-</p>
                      </div>
                      <div className="grid gap-1.5">
                        <p className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
                          Number of reviews
                        </p>
                        <p className="font-semibold">-</p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // scroll to top
                    window.scrollTo(0, 0);
                    if (!completed.includes(course.id)) {
                      setCompleted([...completed, course.id]);
                    }
                    handleNextTab();
                  }}
                  disabled={completed.includes(course.id)}
                  className={cn(
                    "jutify-center",
                    completed.includes(course.id)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white"
                  )}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
