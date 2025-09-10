"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Play, Lock } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Lesson {
  id: number
  title: string
  duration: string
  videoUrl: string
}

interface Section {
  id: number
  title: string
  duration: string
  lessons: Lesson[]
}

interface CourseCurriculumProps {
  curriculum: Section[]
}

export function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  const [openSections, setOpenSections] = useState<number[]>([1])

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => (prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]))
  }

  const totalLessons = curriculum.reduce((acc, section) => acc + section.lessons.length, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Course Curriculum</CardTitle>
        <p className="text-sm text-muted-foreground">
          {curriculum.length} sections • {totalLessons} lessons
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {curriculum.map((section) => (
          <Collapsible
            key={section.id}
            open={openSections.includes(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  {openSections.includes(section.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">{section.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {section.lessons.length} lessons • {section.duration}
                    </div>
                  </div>
                </div>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-2">
              <div className="ml-4 space-y-2">
                {section.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {index === 0 ? (
                        <Play className="h-4 w-4 text-primary" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{lesson.title}</div>
                        <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                      </div>
                    </div>

                    {index === 0 && (
                      <Button size="sm" variant="ghost">
                        Preview
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
