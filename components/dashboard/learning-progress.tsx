"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    progress: 75,
    totalLessons: 45,
    completedLessons: 34,
    timeSpent: "28 hours",
    nextLesson: "Building REST APIs with Node.js",
    category: "Development",
    image: "/web-development-coding.png",
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    instructor: "Mike Chen",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    timeSpent: "12 hours",
    nextLesson: "Advanced Hooks Patterns",
    category: "Development",
    image: "/react-typescript-programming.jpg",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emma Davis",
    progress: 90,
    totalLessons: 28,
    completedLessons: 25,
    timeSpent: "22 hours",
    nextLesson: "Final Project Review",
    category: "Design",
    image: "/ui-ux-design-interface.png",
  },
]

export function LearningProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  </div>
                  <Badge variant="outline">{course.category}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      {course.completedLessons} of {course.totalLessons} lessons
                    </span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.timeSpent}</span>
                    </div>
                    {course.progress === 100 ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      <span>Next: {course.nextLesson}</span>
                    )}
                  </div>

                  <Button size="sm" asChild>
                    <Link href={`/courses/${course.id}`}>
                      <Play className="h-3 w-3 mr-1" />
                      Continue
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
