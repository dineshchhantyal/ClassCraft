import Layout from "@/components/layout/layout";
import AuthLayout from "@/components/layout/authLayout";

const courses = [
  {
    id: 1,
    name: "CSCI 1070-40409",
    time: "8:00am-9:15am",
    startTime: 8,
    endTime: 9.15,
    location: "Hemphill Hall 308",
    days: ["Mon", "Wed"],
    upvotes: 20,
    downvotes: 5,
    professor: {
      name: "-",
      rating: 4.5,
      reviews: 20,
    },
    comments: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Great professor, very helpful and understanding.",
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
    professor: "-",
  },
  {
    id: 3,
    name: "ENGL 2050-44685",
    time: "12:30pm-1:45pm",
    location: "George T Walker Hall 3-91",
    startTime: 12.5,
    endTime: 1.45,
    days: ["Mon", "Wed"],
    professor: "-",
  },
  {
    id: 4,
    name: "CSCI 4055-45480",
    time: "2:00pm-3:15pm",
    location: "Hemphill Hall",
    startTime: 2,
    endTime: 3.15,
    days: ["Tues", "Thur"],
    professor: "-",
  },
  {
    id: 5,
    name: "CINS 3044-40277",
    time: "11:00am-12:15pm",
    location: "Hemphill Hall",
    startTime: 11,
    endTime: 12.15,
    days: ["Mon", "Wed"],
    professor: "-",
  },
  {
    id: 6,
    name: "CSCI 3020-42501",
    time: "12:30pm-1:45pm",
    location: "Hemphill Hall 308",
    startTime: 12.5,
    endTime: 1.45,
    days: ["Tues", "Thur"],
    professor: "-",
  },
];

export default function Page() {
  return (
    <section className="container mx-auto">
      <div className="grid place-items-center text-center">
        <div>
          <h1>Share Experience</h1>
          <p className="text-gray-500 text-sm">
            Share your experience with us.
          </p>
        </div>
      </div>
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
