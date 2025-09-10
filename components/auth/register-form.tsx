"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRealTimeValidation } from "@/hooks/use-real-time-validation"
import { PasswordStrength } from "@/components/ui/password-strength"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const { toast } = useToast()

  const { validationState, validateFieldRealTime, validateAllFields } = useRealTimeValidation({
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 8,
      custom: (value: string) => {
        const hasUpper = /[A-Z]/.test(value)
        const hasLower = /[a-z]/.test(value)
        const hasNumber = /\d/.test(value)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)

        if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
          return "Password must contain uppercase, lowercase, number, and special character"
        }
        return null
      },
    },
    confirmPassword: {
      required: true,
      custom: (value: string) => {
        if (value !== formData.password) {
          return "Passwords do not match"
        }
        return null
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    if (!validateAllFields(formData)) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Registration Successful",
        description: "Welcome to EduStream! Please check your email to verify your account.",
      })

      window.location.href = "/login"
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (typeof value === "string" && field !== "agreeToTerms") {
      validateFieldRealTime(field, value)

      // Re-validate confirm password when password changes
      if (field === "password" && formData.confirmPassword) {
        validateFieldRealTime("confirmPassword", formData.confirmPassword)
      }
    }
  }

  const getFieldState = (fieldName: string) => {
    const state = validationState[fieldName]
    if (!state || !state.isDirty) return { hasError: false, hasSuccess: false, error: null }

    return {
      hasError: !state.isValid && state.error !== null,
      hasSuccess: state.isValid && formData[fieldName as keyof typeof formData],
      error: state.error,
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`${getFieldState("firstName").hasError ? "border-destructive pr-10" : ""} ${getFieldState("firstName").hasSuccess ? "border-green-500 pr-10" : ""}`}
            />
            {getFieldState("firstName").hasError && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
            )}
            {getFieldState("firstName").hasSuccess && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
          {getFieldState("firstName").error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {getFieldState("firstName").error}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={`${getFieldState("lastName").hasError ? "border-destructive pr-10" : ""} ${getFieldState("lastName").hasSuccess ? "border-green-500 pr-10" : ""}`}
            />
            {getFieldState("lastName").hasError && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
            )}
            {getFieldState("lastName").hasSuccess && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
          {getFieldState("lastName").error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {getFieldState("lastName").error}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`${getFieldState("email").hasError ? "border-destructive pr-10" : ""} ${getFieldState("email").hasSuccess ? "border-green-500 pr-10" : ""}`}
          />
          {getFieldState("email").hasError && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
          )}
          {getFieldState("email").hasSuccess && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
        {getFieldState("email").error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {getFieldState("email").error}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={`${getFieldState("password").hasError ? "border-destructive pr-20" : "pr-20"} ${getFieldState("password").hasSuccess ? "border-green-500" : ""}`}
          />
          <div className="absolute right-0 top-0 h-full flex items-center">
            {getFieldState("password").hasError && <AlertCircle className="h-4 w-4 text-destructive mr-2" />}
            {getFieldState("password").hasSuccess && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {getFieldState("password").error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {getFieldState("password").error}
          </p>
        )}
        <PasswordStrength password={formData.password} className="mt-2" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className={`${getFieldState("confirmPassword").hasError ? "border-destructive pr-20" : "pr-20"} ${getFieldState("confirmPassword").hasSuccess ? "border-green-500" : ""}`}
          />
          <div className="absolute right-0 top-0 h-full flex items-center">
            {getFieldState("confirmPassword").hasError && <AlertCircle className="h-4 w-4 text-destructive mr-2" />}
            {getFieldState("confirmPassword").hasSuccess && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {getFieldState("confirmPassword").error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {getFieldState("confirmPassword").error}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Privacy Policy
          </Button>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}
