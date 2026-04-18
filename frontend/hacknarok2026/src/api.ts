import axios from "axios";
import type { Comment, Project, ProjectRating, User } from "./types";
import { ApiUrl } from "./config";

const api = axios.create({
    baseURL: ApiUrl + "/api",
    withCredentials: true
})
const getHeaders = () => {
  return {
    "Content-Type": "application/json"
  };
};
const service = {
  getProject: (projectId: number) => {
    const headers = getHeaders();
    return api.get<Project>(`/projects/${projectId}`, { headers });
  },
  getProjects: () => {
    const headers = getHeaders();
    return api.get<Project[]>("/projects", { headers });
  },
  createProject: (project:Project) =>{
    const headers = getHeaders()
    return api.post("/projects",project,{headers})
  },
  getProjectRating: (projectRatingId: number) => {
    const headers = getHeaders();
    return api.get<ProjectRating>(`/ratings/${projectRatingId}`, { headers });
  },
  getProjectRatings: () => {
    const headers = getHeaders();
    return api.get<ProjectRating[]>("/ratings", { headers });
  },
  createProjectRating: (projectRating:ProjectRating) =>{
    const headers = getHeaders()
    return api.post("/ratings",projectRating,{headers})
  },
  login:(email:string,password:string) =>{
    const headers = getHeaders()
    return api.post("/users/login",{email,password},{headers  })
  },
  register:(user:User) =>{
    const headers = getHeaders()
    return api.post("/users/register",user,{headers})
  },
  getComments: () => {
    const headers = getHeaders();
    return api.get<Comment[]>("/comments", { headers });
  },
  postComment: (comment:Comment) =>{
    const headers = getHeaders()
    return api.post("/comments",comment,{headers})
  },
};
export default service;
