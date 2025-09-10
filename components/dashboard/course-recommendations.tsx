import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"
import Link from "next/link"

const recommendations = [
  {
    id: 7,
    title: "Advanced JavaScript Concepts",
    instructor: "David Kim",
    rating: 4.9,
    students: 8500,
    price: 99.99,
    image: "/javascript-advanced.jpg",
    category: "Development",
    reason: "Based on your React progress",
  },
  {
    id: 8,
    title: "Mobile App Design Principles",
    instructor: "Lisa Chen",
    rating: 4.7,
    students: 6200,
    price: 79.99,
    image: "/mobile-design.jpg",
    category: "Design",
    reason: "Complements your UI/UX skills",
  },
  {
    id: 9,
    title: "Python for Beginners",
    instructor: "Mark Johnson",
    rating: 4.8,
    students: 12000,
    price: 69.99,
    image: "/python-basics.jpg",
    category: "Development",
    reason: "Popular in your learning path",
  },
]

export function CourseRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((course) => (
          <div key={course.id} className="space-y-3">
            <div className="flex gap-3">
              <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-sm line-clamp-2">{course.title}</h4>
                <p className="text-xs text-muted-foreground">by {course.instructor}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                  <span className="text-sm font-bold">${course.price}</span>
                </div>

                <p className="text-xs text-muted-foreground italic">{course.reason}</p>
              </div>
            </div>

            <Button size="sm" className="w-full" asChild>
              <Link href={`/courses/${course.id}`}>View Course</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
