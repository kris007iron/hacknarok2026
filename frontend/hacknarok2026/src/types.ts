export type Project= {
  id?: number;
  name?: string;
  date_added: string | Date;
  owner?: string;
  photo_url?: string;
  repo_url: string;
  tags: string; 
  description: string;
  stars?: number;
  forks?: number;
  open_issues?: number;
  main_language?: string;
  created_at?: Date;
  updated_at?: Date;
  last_synced_at?: Date;
};

export type ProjectRating= {
  id?: number;
  project_id: number;
  rating: number;
  description: string;
  is_slop?: number;
  verified?: number;
  checker_id: number;
  category:string;
};

export type UserRole = 'user' | 'checker' | 'admin';

export type User =  {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password?: string; 
  role: UserRole;
  photo_url: string; 
  money?:number;
}
export type Comment ={
  id?: number;
  project_id: number;
  name: string; 
  description: string;
}

export type Language = {
  id?: number;
  project_id: number;
  name: string;
  bytes: number
};

export type Commit = {
  id?: number;
  project_id: number;
  sha: string;
  message: string;
  author: string;
  date: Date;
  url: string
};

export type Contributor = {
  id?: number;
  project_id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};