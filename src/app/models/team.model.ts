export interface Team {
  id: number;
  name: string;
  created_at: string;
  members_count?: number;
}

export interface TeamMember {
  id: number;
  role: string;
}