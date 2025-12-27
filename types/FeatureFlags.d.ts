export interface FeatureFlagResponse {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
