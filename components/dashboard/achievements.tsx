import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Target, Zap, BookOpen, Clock, Star } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "First Course Completed",
    description: "Completed your first course",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    earned: true,
    earnedDate: "2 weeks ago",
  },
  {
    id: 2,
    title: "Learning Streak",
    description: "7 days of continuous learning",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    earned: true,
    earnedDate: "5 days ago",
  },
  {
    id: 3,
    title: "Course Collector",
    description: "Enrolled in 10+ courses",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    earned: true,
    earnedDate: "1 week ago",
  },
  {
    id: 4,
    title: "Time Master",
    description: "50+ hours of learning",
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-100",
    earned: false,
    progress: 95,
  },
  {
    id: 5,
    title: "Perfect Student",
    description: "Complete 5 courses with 100%",
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    earned: false,
    progress: 60,
  },
  {
    id: 6,
    title: "Goal Crusher",
    description: "Achieve monthly learning goal",
    icon: Target,
    color: "text-red-600",
    bgColor: "bg-red-100",
    earned: false,
    progress: 80,
  },
]

export function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.earned ? "border-primary bg-primary/5" : "border-muted bg-muted/30"
              }`}
            >
              <div className="space-y-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.earned ? achievement.bgColor : "bg-muted"
                  }`}
                >
                  <achievement.icon
                    className={`h-4 w-4 ${achievement.earned ? achievement.color : "text-muted-foreground"}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>

                {achievement.earned ? (
                  <Badge variant="secondary" className="text-xs">
                    Earned {achievement.earnedDate}
                  </Badge>
                ) : (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">{achievement.progress}% complete</div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
