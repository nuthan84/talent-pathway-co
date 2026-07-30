/** Shared domain types for the ProConnect onboarding portal (UI-only mock data). */

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "documents_verified"
  | "approved"
  | "rejected";

export type DocumentStatus = "missing" | "uploaded" | "verifying" | "verified" | "rejected";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  jobs: number;
  avgEarning: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  state: string;
  category: string;
  experience: number;
  rating: number;
  status: ApplicationStatus;
  appliedOn: string;
  skills: string[];
  bio: string;
  languages: string[];
}

export interface ProviderDocument {
  id: string;
  label: string;
  hint: string;
  required: boolean;
  status: DocumentStatus;
  fileName?: string;
  progress: number;
  type: "image" | "pdf";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "success" | "pending" | "rejected" | "approved";
  read: boolean;
}

export interface TimelineStep {
  key: ApplicationStatus;
  title: string;
  description: string;
  date?: string;
}