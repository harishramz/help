/**
 * API-Ready Service Layer for TrustConnect
 * Currently backed by local state/mock data.
 * Replace each method body with fetch/axios calls to your Spring Boot REST API
 * (e.g., GET /api/v1/requests, POST /api/v1/assistance-requests) when backend is connected.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const TrustApiService = {
  baseUrl: API_BASE_URL,

  endpoints: {
    requests: '/requests',
    directRequests: '/assistance-requests',
    contributions: '/contributions',
    donors: '/donors',
    stories: '/success-stories',
    activities: '/activities',
    siteContent: '/site-content',
    auth: '/auth/login'
  },

  async healthCheck() {
    return { status: 'mock-mode', readyForSpringBoot: true, baseUrl: API_BASE_URL };
  }
};
