import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  type Project,
  type ProjectRating,
  type Comment,
} from "./types";
import service from "./api";
type DataContextType = {
  projects: Project[] | undefined;
  setProjects: (projects: Project[] | undefined) => void;

  comments: Comment[] | undefined;
  setComments: (comments: Comment[] | undefined) => void;

  projectRatings: ProjectRating[] | undefined;
  setProjectRatings: (projectRatings: ProjectRating[] | undefined) => void;

  currentProject: Project | undefined;
  setCurrentProject: (project: Project | undefined) => void;

  loggedInUser: User | undefined;
  setLoggedInUser: (User: User | undefined) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>();
  const [projectRatings, setProjectRatings] = useState<ProjectRating[]>();
  const [currentProject, setCurrentProject] = useState<Project>();
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    service
      .getProjects()
      .then((res) => res.data)
      .then((proj) => setProjects(proj));
    service
      .getProjectRatings()
      .then((res) => res.data)
      .then((rat) => setProjectRatings(rat));
    // service
    //   .getComments()
    //   .then((res) => res.data)
    //   .then((com) => setComments(com));
  }, []);
  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
        projectRatings,
        setProjectRatings,
        currentProject,
        setCurrentProject,
        loggedInUser,
        setLoggedInUser,
        comments,
        setComments,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
