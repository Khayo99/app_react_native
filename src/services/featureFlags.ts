export interface FeatureFlags {
  enable_signature: boolean;
}

export async function fetchFeatureFlags(): Promise<FeatureFlags> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      enable_signature: true,
    };
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return {
      enable_signature: false,
    };
  }
}
