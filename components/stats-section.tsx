import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Students",
    description: "Learning and growing every day",
  },
  {
    icon: BookOpen,
    value: "1,000+",
    label: "Courses Available",
    description: "Across multiple disciplines",
  },
  {
    icon: Award,
    value: "500+",
    label: "Expert Instructors",
    description: "Industry professionals",
  },
  {
    icon: Globe,
    value: "100+",
    label: "Countries Reached",
    description: "Global learning community",
  },
]

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Trusted by Learners Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto text-pretty">
            Join our global community of learners and start your journey today
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="font-semibold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
