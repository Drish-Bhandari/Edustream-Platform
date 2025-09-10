"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  notifications: {
    email: boolean
    push: boolean
    courseUpdates: boolean
    promotions: boolean
  }
  playback: {
    autoplay: boolean
    quality: "auto" | "720p" | "1080p"
    speed: number
    captions: boolean
  }
  accessibility: {
    reducedMotion: boolean
    highContrast: boolean
    fontSize: "small" | "medium" | "large"
  }
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  language: "en",
  notifications: {
    email: true,
    push: true,
    courseUpdates: true,
    promotions: false,
  },
  playback: {
    autoplay: false,
    quality: "auto",
    speed: 1,
    captions: false,
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: "medium",
  },
}

interface PreferencesContextType {
  preferences: UserPreferences
  updatePreferences: (updates: Partial<UserPreferences>) => void
  resetPreferences: () => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("edustream-preferences")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setPreferences({ ...defaultPreferences, ...parsed })
      } catch (error) {
        console.error("Failed to parse stored preferences:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("edustream-preferences", JSON.stringify(preferences))
    }
  }, [preferences, isLoaded])

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...updates,
      notifications: updates.notifications ? { ...prev.notifications, ...updates.notifications } : prev.notifications,
      playback: updates.playback ? { ...prev.playback, ...updates.playback } : prev.playback,
      accessibility: updates.accessibility ? { ...prev.accessibility, ...updates.accessibility } : prev.accessibility,
    }))
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
