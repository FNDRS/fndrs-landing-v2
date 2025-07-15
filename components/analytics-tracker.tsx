'use client'

import { useEffect } from 'react'
import { usePostHog } from '@/hooks/use-posthog'
import { useLanguage } from '@/hooks/use-language'

/**
 * Analytics Tracker Component
 * Handles automatic tracking of user behavior and new user identification
 */
export function AnalyticsTracker() {
  const { setUserProperties, trackEvent } = usePostHog()
  const { language } = useLanguage()

  useEffect(() => {
    // Track user's preferred language
    setUserProperties({
      preferred_language: language,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })

    // Track if this is a new visitor
    const isNewVisitor = !localStorage.getItem('posthog_visitor_tracked')
    if (isNewVisitor) {
      trackEvent('new_visitor', {
        landing_page: window.location.pathname,
        referrer: document.referrer || 'direct',
        language: language,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem('posthog_visitor_tracked', 'true')
    }

    // Track session start
    trackEvent('session_start', {
      page: window.location.pathname,
      language: language,
    })

    // Track scroll depth
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        
        // Track milestone scroll depths
        if (scrollPercent >= 25 && scrollPercent < 50 && maxScrollDepth < 50) {
          trackEvent('scroll_depth_25', { page: window.location.pathname })
        } else if (scrollPercent >= 50 && scrollPercent < 75 && maxScrollDepth < 75) {
          trackEvent('scroll_depth_50', { page: window.location.pathname })
        } else if (scrollPercent >= 75 && scrollPercent < 90 && maxScrollDepth < 90) {
          trackEvent('scroll_depth_75', { page: window.location.pathname })
        } else if (scrollPercent >= 90 && maxScrollDepth < 100) {
          trackEvent('scroll_depth_90', { page: window.location.pathname })
        }
      }
    }

    // Track time on page
    const startTime = Date.now()
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackEvent('time_on_page', {
        page: window.location.pathname,
        time_spent_seconds: timeSpent,
      })
    }

    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth, { passive: true })
    window.addEventListener('beforeunload', trackTimeOnPage)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth)
      window.removeEventListener('beforeunload', trackTimeOnPage)
    }
  }, [language, setUserProperties, trackEvent])

  // This component doesn't render anything
  return null
}

/**
 * Hook for tracking user engagement patterns
 */
export function useUserEngagement() {
  const { trackEvent } = usePostHog()

  const trackEngagement = (action: string, details?: Record<string, any>) => {
    trackEvent('user_engagement', {
      action,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      ...details,
    })
  }

  const trackCTAClick = (ctaText: string, location: string) => {
    trackEngagement('cta_click', {
      cta_text: ctaText,
      location,
    })
  }

  const trackFormInteraction = (formName: string, fieldName: string, action: 'focus' | 'blur' | 'change') => {
    trackEngagement('form_interaction', {
      form_name: formName,
      field_name: fieldName,
      action,
    })
  }

  const trackVideoInteraction = (videoTitle: string, action: 'play' | 'pause' | 'complete', currentTime?: number) => {
    trackEngagement('video_interaction', {
      video_title: videoTitle,
      action,
      current_time: currentTime,
    })
  }

  const trackDownload = (fileName: string, fileType: string) => {
    trackEngagement('file_download', {
      file_name: fileName,
      file_type: fileType,
    })
  }

  return {
    trackEngagement,
    trackCTAClick,
    trackFormInteraction,
    trackVideoInteraction,
    trackDownload,
  }
}
