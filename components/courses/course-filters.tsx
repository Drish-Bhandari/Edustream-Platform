"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = ["Development", "Design", "Business", "Marketing", "Data Science", "Photography"]

const levels = ["Beginner", "Intermediate", "Advanced"]

const durations = ["0-5 hours", "5-10 hours", "10-20 hours", "20+ hours"]

export function CourseFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
    setSelectedDurations([])
    setPriceRange([0, 200])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedLevels.length > 0 || selectedDurations.length > 0) && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleCategoryChange(category, false)}
              >
                {category} ×
              </Badge>
            ))}
            {selectedLevels.map((level) => (
              <Badge key={level} variant="secondary" className="cursor-pointer">
                {level} ×
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Level Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level}
                checked={selectedLevels.includes(level)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedLevels([...selectedLevels, level])
                  } else {
                    setSelectedLevels(selectedLevels.filter((l) => l !== level))
                  }
                }}
              />
              <Label htmlFor={level} className="text-sm">
                {level}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Duration Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {durations.map((duration) => (
            <div key={duration} className="flex items-center space-x-2">
              <Checkbox
                id={duration}
                checked={selectedDurations.includes(duration)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDurations([...selectedDurations, duration])
                  } else {
                    setSelectedDurations(selectedDurations.filter((d) => d !== duration))
                  }
                }}
              />
              <Label htmlFor={duration} className="text-sm">
                {duration}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
