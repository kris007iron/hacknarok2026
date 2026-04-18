import React, { createContext, useContext, useEffect, useState } from "react";
import { type User, type Project, type ProjectRating } from "./types";
type DataContextType = {
  projects: Project[] | undefined;
  setProjects: (projects: Project[] | undefined) => void;

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
  useEffect(() => {
    setProjects([
      {
        id: 1,
        name: "Tomegg",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description:
          "very good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good projectvery good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 2,
        name: "Tomeggster",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
      {
        id: 3,
        name: "EGGGTomegg",
        date_added: "Today",
        owner: "me",
        photo_url:
          "https://media.licdn.com/dms/image/v2/C560BAQF3v90K5XSbfQ/company-logo_200_200/company-logo_200_200/0/1630623981742?e=2147483647&v=beta&t=EXiq2PJEToPAh96erH4RxaV9DH0FoYpxIHL6lwjLYoE",
        repo_url: "git",
        tags: "pyton, java/script",
        description: "very good project",
      },
    ]);
    setProjectRatings([
      {
        id: 1,
        project_id: 1,
        rating: 7,
        description:
          "vKróki opis krókrotki opis krotk krotkkrotkkrotkk rotkkrot kkrotkkrotk krotkkrotkkrotkk ro tkkrot krotkkrotkk rotkkrotk",
        isSlop: false,
        verified: true,
        checker_id: 1,
        category: "main",
      },
    ]);
    setLoggedInUser({
      id: 1,
      name: "Tomasz",
      surname: "K***r",
      email: "tomasz.k@hacknarok2026.pl",
      role: "checker",
      photo_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tomasz",
    });
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
