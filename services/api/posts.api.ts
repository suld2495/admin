import axios from './index';

export interface Post {
  id: string;
  title: string;
  content: string;
}

export const fetchPosts = (page: number = 1): Promise<Post[]> => {
  return axios.get(`/api/posts/${page}`);
}