import { CourseGallery } from "@/components/courses/course-gallery"
import { CourseFilters } from "@/components/courses/course-filters"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold">All Courses</h1>
            <p className="text-xl text-muted-foreground">Discover thousands of courses across multiple disciplines</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <CourseFilters />
            </aside>
            <div className="lg:col-span-3">
              <CourseGallery />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
