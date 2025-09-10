import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { LearningProgress } from "@/components/dashboard/learning-progress"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { CourseRecommendations } from "@/components/dashboard/course-recommendations"
import { LearningStats } from "@/components/dashboard/learning-stats"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Continue your learning journey and track your progress</p>
          </div>

          <DashboardOverview />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <LearningProgress />
              <RecentActivity />
            </div>
            <div className="space-y-8">
              <LearningStats />
              <CourseRecommendations />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
