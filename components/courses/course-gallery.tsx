"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Users, Search, Grid, List, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const allCourses = [
  {
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
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp.",
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 8200,
    duration: "25 hours",
    price: 129.99,
    image: "/react-typescript-programming.jpg",
    category: "Development",
    level: "Advanced",
    videoUrl: "/react-course-preview.mp4",
    description: "Master React with TypeScript, advanced patterns, and modern development practices.",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emma Davis",
    rating: 4.7,
    students: 15600,
    duration: "30 hours",
    price: 99.99,
    image: "/ui-ux-design-interface.png",
    category: "Design",
    level: "Intermediate",
    videoUrl: "/design-course-intro.mp4",
    description: "Create beautiful, user-centered designs with industry-standard tools and techniques.",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Alex Rodriguez",
    rating: 4.6,
    students: 9800,
    duration: "20 hours",
    price: 79.99,
    image: "/digital-marketing-strategy.jpg",
    category: "Marketing",
    level: "Beginner",
    videoUrl: "/marketing-course-preview.mp4",
    description: "Build comprehensive digital marketing campaigns that drive results and ROI.",
  },
  {
    id: 5,
    title: "Data Science with Python",
    instructor: "Dr. Lisa Wang",
    rating: 4.8,
    students: 11200,
    duration: "45 hours",
    price: 149.99,
    image: "/data-science-python.jpg",
    category: "Data Science",
    level: "Intermediate",
    videoUrl: "/data-science-intro.mp4",
    description: "Master data analysis, machine learning, and visualization with Python.",
  },
  {
    id: 6,
    title: "Photography Fundamentals",
    instructor: "James Mitchell",
    rating: 4.5,
    students: 7300,
    duration: "15 hours",
    price: 59.99,
    image: "/photography-fundamentals.jpg",
    category: "Photography",
    level: "Beginner",
    videoUrl: "/photography-course-intro.mp4",
    description: "Learn composition, lighting, and camera techniques to capture stunning photos.",
  },
]

export function CourseGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [courses] = useState(allCourses)
  const { addItem, isInCart } = useCart()
  const { toast } = useToast()

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.students - a.students
    }
  })

  const handleAddToCart = (course: (typeof allCourses)[0]) => {
    if (isInCart(course.id)) {
      toast({
        title: "Already in Cart",
        description: "This course is already in your cart.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      image: course.image,
      category: course.category,
    })

    toast({
      title: "Added to Cart",
      description: `${course.title} has been added to your cart.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedCourses.length} of {courses.length} courses
      </div>

      {/* Course Grid/List */}
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
        {sortedCourses.map((course) => (
          <Card
            key={course.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}
          >
            <CardHeader className={`p-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
              <div className="aspect-video relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {course.category}
                </Badge>
              </div>
            </CardHeader>

            <div className={viewMode === "list" ? "flex-1 flex flex-col" : ""}>
              <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-6 space-y-4`}>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  {viewMode === "list" && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">{course.level}</Badge>
                  <span className="text-2xl font-bold">${course.price}</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 gap-2">
                <Button className="flex-1" asChild>
                  <Link href={`/courses/${course.id}`}>View Course</Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleAddToCart(course)}
                  disabled={isInCart(course.id)}
                >
                  {isInCart(course.id) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
