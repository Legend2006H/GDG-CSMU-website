export interface EventItem {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  time?: string | null;
  location: string;
  mode: string;
  expectedAttendees: number | string;
  speaker: string;
  description: string;
  registrationLink?: string | null;
  image: string;
  status: string;
}

export interface EventsData {
  upcoming: EventItem[];
  past: EventItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  tenure?: string;
  photo?: string | null;
  linkedin?: string | null;
  github?: string | null;
  email?: string | null;
}

export interface TeamData {
  current: TeamMember[];
  past: {
    lead: TeamMember[];
    technicalHeads: TeamMember[];
    coreTeam: TeamMember[];
  };
}

