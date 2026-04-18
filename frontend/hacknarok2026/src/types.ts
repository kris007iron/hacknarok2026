export type Project= {
  id: number;
  name: string;
  date_added: string | Date;
  owner: string;
  photo_url: string;
  repo_url: string;
  tags: string; 
  description: string;
};

export type ProjectRating= {
  id: number;
  project_id: number;
  rating: number;
  description: string;
  isSlop: boolean;
  verified: boolean;
  checker_id: number;
  category:string;
};

export type UserRole = 'user' | 'checker' | 'admin';

export type User =  {
  id: number;
  name: string;
  surname: string;
  email: string;
  password?: string; 
  role: UserRole;
  photo_url: string; 
}
export type ProjectComment ={
  id: number;
  project_id: number;
  name: string; 
  description: string;
}