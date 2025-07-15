'use client'

import { useCallback } from 'react'
import { posthog } from '@/lib/posthog'

export interface UserProperties {
  email?: string
  name?: string
  company?: string
  plan?: string
  language?: string
  [key: string]: any
}

export interface EventProperties {
  [key: string]: any
}

export const usePostHog = () => {
  // Track custom events
  const trackEvent = useCallback((eventName: string, properties?: EventProperties) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }
  }, [])

  // Identify user
  const identifyUser = useCallback((userId: string, properties?: UserProperties) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, properties)
    }
  }, [])

  // Set user properties
  const setUserProperties = useCallback((properties: UserProperties) => {
    if (typeof window !== 'undefined') {
      posthog.setPersonProperties(properties)
    }
  }, [])

  // Track page view manually
  const trackPageView = useCallback((url?: string, properties?: EventProperties) => {
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', {
        $current_url: url || window.location.href,
        ...properties,
      })
    }
  }, [])

  // Reset user (for logout)
  const resetUser = useCallback(() => {
    if (typeof window !== 'undefined') {
      posthog.reset()
    }
  }, [])

  // Check feature flags
  const isFeatureEnabled = useCallback((flagKey: string): boolean => {
    if (typeof window !== 'undefined') {
      return posthog.isFeatureEnabled(flagKey) || false
    }
    return false
  }, [])

  // Get feature flag value
  const getFeatureFlag = useCallback((flagKey: string): string | boolean | undefined => {
    if (typeof window !== 'undefined') {
      return posthog.getFeatureFlag(flagKey)
    }
    return undefined
  }, [])

  return {
    trackEvent,
    identifyUser,
    setUserProperties,
    trackPageView,
    resetUser,
    isFeatureEnabled,
    getFeatureFlag,
  }
}

// Predefined event tracking functions for common actions
export const useAnalytics = () => {
  const { trackEvent } = usePostHog()

  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    trackEvent('button_clicked', {
      button_name: buttonName,
      location: location || 'unknown',
    })
  }, [trackEvent])

  const trackFormSubmission = useCallback((formName: string, success: boolean = true) => {
    trackEvent('form_submitted', {
      form_name: formName,
      success,
    })
  }, [trackEvent])

  const trackContactFormSubmission = useCallback((data: {
    name: string
    email: string
    company?: string
    services?: string[]
    budget: string
  }) => {
    trackEvent('contact_form_submitted', {
      user_name: data.name,
      user_email: data.email,
      user_company: data.company,
      services_interested: data.services,
      budget_range: data.budget,
    })
  }, [trackEvent])

  const trackBlogPostView = useCallback((postTitle: string, postSlug: string, readTime: number) => {
    trackEvent('blog_post_viewed', {
      post_title: postTitle,
      post_slug: postSlug,
      estimated_read_time: readTime,
    })
  }, [trackEvent])

  const trackBlogPostShare = useCallback((postTitle: string, platform: string) => {
    trackEvent('blog_post_shared', {
      post_title: postTitle,
      platform,
    })
  }, [trackEvent])

  const trackServiceInterest = useCallback((serviceName: string, location?: string) => {
    trackEvent('service_interest', {
      service_name: serviceName,
      location: location || 'unknown',
    })
  }, [trackEvent])

  const trackLanguageChange = useCallback((fromLanguage: string, toLanguage: string) => {
    trackEvent('language_changed', {
      from_language: fromLanguage,
      to_language: toLanguage,
    })
  }, [trackEvent])

  const trackNewUserSignup = useCallback((method: string = 'contact_form') => {
    trackEvent('new_user_signup', {
      signup_method: method,
    })
  }, [trackEvent])

  return {
    trackButtonClick,
    trackFormSubmission,
    trackContactFormSubmission,
    trackBlogPostView,
    trackBlogPostShare,
    trackServiceInterest,
    trackLanguageChange,
    trackNewUserSignup,
  }
}
