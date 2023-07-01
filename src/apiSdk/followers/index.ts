import axios from 'axios';
import queryString from 'query-string';
import { FollowerInterface, FollowerGetQueryInterface } from 'interfaces/follower';
import { GetQueryInterface } from '../../interfaces';

export const getFollowers = async (query?: FollowerGetQueryInterface) => {
  const response = await axios.get(`/api/followers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFollower = async (follower: FollowerInterface) => {
  const response = await axios.post('/api/followers', follower);
  return response.data;
};

export const updateFollowerById = async (id: string, follower: FollowerInterface) => {
  const response = await axios.put(`/api/followers/${id}`, follower);
  return response.data;
};

export const getFollowerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/followers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFollowerById = async (id: string) => {
  const response = await axios.delete(`/api/followers/${id}`);
  return response.data;
};
