import axios from './index';
import { Info } from "@prisma/client";

type PostsResponse = {
  total: number;
  posts: Info[];
}

export const fetchPosts = (page: number = 1): Promise<PostsResponse> => {
  return axios.get(`/api/posts/${page}`);
}