import { FeatureFlagResponse } from '../../types/FeatureFlags';
import { ResponseData } from '../../types/Respose';
import { api } from './api';

export interface FeatureFlags {
  enable_signature: boolean;
}

export async function fetchFeatureFlags(): Promise<FeatureFlags> {
  try {
    const response = await api.get<ResponseData<FeatureFlagResponse[]>>('/feature-flags');

    const flags: FeatureFlags = {
      enable_signature: false,
    };

    // Procura pela flag enable_signature
    const signatureFlag = response.data.data.find((flag) => flag.name === 'enable_signature');

    if (signatureFlag) {
      flags.enable_signature = signatureFlag.enabled;
    }

    return flags;
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return {
      enable_signature: false,
    };
  }
}
