export interface Configuration {
  id: string;
  key: string;
  value: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConfigurationInput {
  key: string;
  value: string;
  description?: string;
}
