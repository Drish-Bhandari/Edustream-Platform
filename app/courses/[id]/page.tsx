import { CoursePlayer } from "@/components/courses/course-player"
import { CourseInfo } from "@/components/courses/course-info"
import { CourseCurriculum } from "@/components/courses/course-curriculum"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

// Mock course data - in real app this would come from API/database
const courseData = {
  1: {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12500,
    duration: "40 hours",
    price: 89.99,
    image: "/web-development-coding.png",
    category: "Development",
    level: "Beginner",
    videoUrl: "/sample-course-intro.mp4",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp that will take you from beginner to job-ready developer.",
    whatYouWillLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Master JavaScript ES6+ and modern programming concepts",
      "Create dynamic web applications with React",
      "Build backend APIs with Node.js and Express",
      "Work with databases using MongoDB",
      "Deploy applications to production",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Web Development",
        duration: "2 hours",
        lessons: [
          { id: 1, title: "Course Overview", duration: "10 min", videoUrl: "/lesson-1-1.mp4" },
          { id: 2, title: "Setting Up Development Environment", duration: "20 min", videoUrl: "/lesson-1-2.mp4" },
          { id: 3, title: "How the Web Works", duration: "15 min", videoUrl: "/lesson-1-3.mp4" },
        ],
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        duration: "4 hours",
        lessons: [
          { id: 4, title: "HTML Structure and Syntax", duration: "25 min", videoUrl: "/lesson-2-1.mp4" },
          { id: 5, title: "Working with Text and Links", duration: "30 min", videoUrl: "/lesson-2-2.mp4" },
          { id: 6, title: "Images and Media", duration: "20 min", videoUrl: "/lesson-2-3.mp4" },
        ],
      },
    ],
  },
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const courseId = Number.parseInt(params.id)
  const course = courseData[courseId as keyof typeof courseData]

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <CoursePlayer course={course} />
          </div>

          {/* Course Info Sidebar */}
          <div className="lg:col-span-1">
            <CourseInfo course={course} />
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="container py-8">
          <CourseCurriculum curriculum={course.curriculum} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
