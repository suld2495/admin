import { Info } from "@prisma/client";
import { InfoForm } from "pages/api/posts/[page]";
import axios from "./http"

type PostsResponse = {
  total: number;
  posts: Info[];
}

export const fetchPosts = (page: number = 1): Promise<PostsResponse> => {
  return axios.get(`/api/posts/${page}`);
}

export const createPost = (form: InfoForm) => {
  axios.put('/api/post', form);
}