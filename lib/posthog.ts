import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined") {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (posthogKey && posthogHost) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
        },
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true, // Enable pageleave capture

        // Session Recording Configuration for detailed user behavior analysis
        session_recording: {
          recordCrossOriginIframes: true,
          recordHeaders: true,
          recordBody: true,
          recordInitialRequests: true,
          recordPerformance: true,
          maskAllInputs: false, // Set to true if you want to mask sensitive inputs
          maskInputOptions: {
            password: true,
            email: false, // We want to see email interactions for UX analysis
          },
          sampleRate: 1.0, // Record 100% of sessions for new user analysis
          minimumDuration: 2000, // Only record sessions longer than 2 seconds
          linkedFlag: "session-recording-enabled", // Can be controlled via feature flag
        },

        // Autocapture Configuration for heatmaps and interaction tracking
        autocapture: {
          dom_event_allowlist: ["click", "change", "submit"], // Capture clicks, form changes, and submissions
          url_allowlist: [window.location.origin], // Only capture events on your domain
          css_selector_allowlist: [
            "[data-attr]", // Elements with data-attr attribute
            "button", // All buttons
            "a", // All links
            'input[type="submit"]', // Submit buttons
            ".btn", // Elements with btn class
            '[role="button"]', // Elements with button role
          ],
          element_allowlist: [
            "button",
            "a",
            "form",
            "input",
            "select",
            "textarea",
          ],
        },

        // Heatmap Configuration
        enable_heatmaps: true,
        heatmaps: {
          sample_rate: 1.0, // Capture 100% of interactions for heatmaps
        },

        // Advanced tracking options
        cross_subdomain_cookie: false,
        secure_cookie: true,
        persistence: "localStorage+cookie",

        // Privacy and compliance
        respect_dnt: true, // Respect Do Not Track headers
        opt_out_capturing_by_default: false,

        // Performance optimizations
        batch_requests: true,
        request_batching: {
          size: 10,
          timeout_ms: 1000,
        },
      });
    }
  }
};

export { posthog };
