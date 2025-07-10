import axios from 'axios';
import type { ModuleStatus, User, SimpleAPIResponse } from '@aibos/types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

export const fetchModules = async (): Promise<ModuleStatus[]> => {
  const res = await api.get<SimpleAPIResponse<ModuleStatus[]>>('/modules');
  return res.data.data || [];
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get<SimpleAPIResponse<User[]>>('/users');
  return res.data.data || [];
};

export const createModule = async (moduleData: Partial<ModuleStatus>): Promise<ModuleStatus> => {
  const res = await api.post<SimpleAPIResponse<ModuleStatus>>('/modules', moduleData);
  return res.data.data!;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const res = await api.post<SimpleAPIResponse<User>>('/users', userData);
  return res.data.data!;
}; 