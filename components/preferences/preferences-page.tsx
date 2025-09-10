"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { usePreferences } from "@/contexts/preferences-context"
import { useTheme } from "next-themes"
import { Settings, Bell, Play, Eye, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PreferencesPage() {
  const { preferences, updatePreferences, resetPreferences } = usePreferences()
  const { setTheme } = useTheme()
  const { toast } = useToast()

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    updatePreferences({ theme: theme as "light" | "dark" | "system" })
  }

  const handleReset = () => {
    resetPreferences()
    setTheme("system")
    toast({
      title: "Preferences Reset",
      description: "All preferences have been reset to default values.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Preferences</h1>
          <p className="text-muted-foreground">Customize your learning experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the visual appearance of the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={preferences.theme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={preferences.language} onValueChange={(value) => updatePreferences({ language: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Select
                value={preferences.accessibility.fontSize}
                onValueChange={(value) =>
                  updatePreferences({
                    accessibility: { ...preferences.accessibility, fontSize: value as "small" | "medium" | "large" },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage how you receive updates and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.notifications.email}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    notifications: { ...preferences.notifications, email: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive browser notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={preferences.notifications.push}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    notifications: { ...preferences.notifications, push: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="course-updates">Course Updates</Label>
                <p className="text-sm text-muted-foreground">New lessons and course announcements</p>
              </div>
              <Switch
                id="course-updates"
                checked={preferences.notifications.courseUpdates}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    notifications: { ...preferences.notifications, courseUpdates: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions & Offers</Label>
                <p className="text-sm text-muted-foreground">Special deals and discounts</p>
              </div>
              <Switch
                id="promotions"
                checked={preferences.notifications.promotions}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    notifications: { ...preferences.notifications, promotions: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Playback Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Video Playback
            </CardTitle>
            <CardDescription>Configure video and audio playback preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoplay">Autoplay Next Video</Label>
                <p className="text-sm text-muted-foreground">Automatically play the next lesson</p>
              </div>
              <Switch
                id="autoplay"
                checked={preferences.playback.autoplay}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    playback: { ...preferences.playback, autoplay: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="quality">Default Video Quality</Label>
              <Select
                value={preferences.playback.quality}
                onValueChange={(value) =>
                  updatePreferences({
                    playback: { ...preferences.playback, quality: value as "auto" | "720p" | "1080p" },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed">Default Playback Speed</Label>
              <Select
                value={preferences.playback.speed.toString()}
                onValueChange={(value) =>
                  updatePreferences({
                    playback: { ...preferences.playback, speed: Number.parseFloat(value) },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1">1x (Normal)</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="captions">Show Captions by Default</Label>
                <p className="text-sm text-muted-foreground">Display subtitles when available</p>
              </div>
              <Switch
                id="captions"
                checked={preferences.playback.captions}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    playback: { ...preferences.playback, captions: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility</CardTitle>
            <CardDescription>Options to improve accessibility and usability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
              </div>
              <Switch
                id="reduced-motion"
                checked={preferences.accessibility.reducedMotion}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    accessibility: { ...preferences.accessibility, reducedMotion: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <Switch
                id="high-contrast"
                checked={preferences.accessibility.highContrast}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    accessibility: { ...preferences.accessibility, highContrast: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Reset Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset Preferences
            </CardTitle>
            <CardDescription>Reset all preferences to their default values</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto bg-transparent">
              Reset All Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
