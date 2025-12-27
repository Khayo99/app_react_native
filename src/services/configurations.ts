import { Configuration, ConfigurationInput } from '../../types/Configuration';
import { ResponseData } from '../../types/Respose';
import { api } from './api';

export async function fetchConfigurations(): Promise<Configuration[]> {
  try {
    const response = await api.get<ResponseData<Configuration[]>>('/configurations');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching configurations:', error);
    throw error;
  }
}

export async function fetchConfigurationByKey(key: string): Promise<Configuration | null> {
  try {
    const response = await api.get<ResponseData<Configuration>>(`/configurations/key/${key}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching configuration by key ${key}:`, error);
    return null;
  }
}

export async function createConfiguration(data: ConfigurationInput): Promise<Configuration> {
  try {
    const response = await api.post<ResponseData<Configuration>>('/configurations', data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating configuration:', error);
    throw error;
  }
}

export async function updateConfiguration(
  id: string,
  data: Partial<ConfigurationInput>
): Promise<Configuration> {
  try {
    const response = await api.put<ResponseData<Configuration>>(`/configurations/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating configuration:', error);
    throw error;
  }
}
