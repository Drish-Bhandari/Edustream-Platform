import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Play, Award, BookOpen } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Completed 'Advanced React Hooks'",
    course: "Advanced React & TypeScript",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "course_started",
    title: "Started 'Digital Marketing Strategy'",
    course: "Digital Marketing Strategy",
    time: "1 day ago",
    icon: Play,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "certificate_earned",
    title: "Earned Certificate in UI/UX Design",
    course: "UI/UX Design Masterclass",
    time: "3 days ago",
    icon: Award,
    color: "text-yellow-600",
  },
  {
    id: 4,
    type: "lesson_completed",
    title: "Completed 'Building REST APIs'",
    course: "Complete Web Development Bootcamp",
    time: "5 days ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 5,
    type: "course_enrolled",
    title: "Enrolled in 'Data Science with Python'",
    course: "Data Science with Python",
    time: "1 week ago",
    icon: BookOpen,
    color: "text-purple-600",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>

              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.course}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
