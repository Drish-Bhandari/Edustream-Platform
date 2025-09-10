"use client"

import { useState, useCallback } from "react"

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface ValidationState {
  [key: string]: {
    error: string | null
    isValid: boolean
    isDirty: boolean
  }
}

export function useRealTimeValidation(rules: ValidationRules) {
  const [validationState, setValidationState] = useState<ValidationState>({})

  const validateField = useCallback(
    (fieldName: string, value: string): { error: string | null; isValid: boolean } => {
      const rule = rules[fieldName]
      if (!rule) return { error: null, isValid: true }

      // Required validation
      if (rule.required && (!value || value.trim() === "")) {
        return { error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`, isValid: false }
      }

      // Skip other validations if field is empty and not required
      if (!value && !rule.required) {
        return { error: null, isValid: true }
      }

      // Min length validation
      if (rule.minLength && value.length < rule.minLength) {
        return { error: `Must be at least ${rule.minLength} characters`, isValid: false }
      }

      // Max length validation
      if (rule.maxLength && value.length > rule.maxLength) {
        return { error: `Must be no more than ${rule.maxLength} characters`, isValid: false }
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        if (fieldName === "email") {
          return { error: "Please enter a valid email address", isValid: false }
        }
        return { error: "Invalid format", isValid: false }
      }

      // Custom validation
      if (rule.custom) {
        const customError = rule.custom(value)
        if (customError) {
          return { error: customError, isValid: false }
        }
      }

      return { error: null, isValid: true }
    },
    [rules],
  )

  const validateFieldRealTime = useCallback(
    (fieldName: string, value: string) => {
      const validation = validateField(fieldName, value)

      setValidationState((prev) => ({
        ...prev,
        [fieldName]: {
          ...validation,
          isDirty: true,
        },
      }))

      return validation
    },
    [validateField],
  )

  const validateAllFields = useCallback(
    (formData: Record<string, string>) => {
      const newValidationState: ValidationState = {}
      let isFormValid = true

      Object.keys(rules).forEach((fieldName) => {
        const value = formData[fieldName] || ""
        const validation = validateField(fieldName, value)

        newValidationState[fieldName] = {
          ...validation,
          isDirty: true,
        }

        if (!validation.isValid) {
          isFormValid = false
        }
      })

      setValidationState(newValidationState)
      return isFormValid
    },
    [rules, validateField],
  )

  const clearFieldError = useCallback((fieldName: string) => {
    setValidationState((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error: null,
        isValid: true,
      },
    }))
  }, [])

  const resetValidation = useCallback(() => {
    setValidationState({})
  }, [])

  return {
    validationState,
    validateFieldRealTime,
    validateAllFields,
    clearFieldError,
    resetValidation,
  }
}
