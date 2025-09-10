import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Award } from "lucide-react"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

interface CourseInfoProps {
  course: {
    id: number
    title: string
    instructor: string
    rating: number
    students: number
    duration: string
    price: number
    level: string
    category: string
    image: string
    whatYouWillLearn: string[]
  }
}

export function CourseInfo({ course }: CourseInfoProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Purchase Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">${course.price}</div>
            <div className="text-sm text-muted-foreground line-through">$199.99</div>
          </div>

          <div className="space-y-3">
            <AddToCartButton course={course} />
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href="/checkout">Buy Now</a>
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">30-day money-back guarantee</div>
        </CardContent>
      </Card>

      {/* Course Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-sm text-muted-foreground">rating</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{course.students.toLocaleString()} students</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{course.duration} total</span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline">{course.level}</Badge>
          </div>

          <div className="pt-2">
            <Badge>{course.category}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* What You'll Learn */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {course.whatYouWillLearn.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
