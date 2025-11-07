export interface Activity {
  date: string;
  commits: number;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  commits: number;
  repos: number;
  stars: number;
  topLanguage: string;
  languages: string[];
  activity: Activity[];
  avatar: string;
  bio: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
}

export const mockEmployee: Employee = {
  id: 1,
  name: "Vamshi Krishna",
  username: "vamshi-github",
  commits: 245,
  repos: 12,
  stars: 38,
  topLanguage: "TypeScript",
  languages: ["TypeScript", "JavaScript", "Python", "Go"],
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vamshi",
  bio: "Full-stack developer passionate about building scalable applications",
  activity: [
    { date: "2025-10-15", commits: 5 },
    { date: "2025-10-16", commits: 8 },
    { date: "2025-10-17", commits: 12 },
    { date: "2025-10-18", commits: 6 },
    { date: "2025-10-19", commits: 15 },
    { date: "2025-10-20", commits: 9 },
    { date: "2025-10-21", commits: 11 },
  ],
};

export const mockTeam: Employee[] = [
  {
    id: 1,
    name: "Vamshi Krishna",
    username: "vamshi-github",
    commits: 245,
    repos: 12,
    stars: 38,
    topLanguage: "TypeScript",
    languages: ["TypeScript", "JavaScript", "Python", "Go"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vamshi",
    bio: "Full-stack developer passionate about building scalable applications",
    activity: [
      { date: "2025-10-15", commits: 5 },
      { date: "2025-10-16", commits: 8 },
      { date: "2025-10-17", commits: 12 },
      { date: "2025-10-18", commits: 6 },
      { date: "2025-10-19", commits: 15 },
      { date: "2025-10-20", commits: 9 },
      { date: "2025-10-21", commits: 11 },
      { date: "2025-10-22", commits: 7 },
      { date: "2025-10-23", commits: 9 },
      { date: "2025-10-24", commits: 13 },
      { date: "2025-10-25", commits: 10 },
      { date: "2025-10-26", commits: 8 },
      { date: "2025-10-27", commits: 11 },
      { date: "2025-10-28", commits: 14 },
    ],
  },
  {
    id: 2,
    name: "Aarav Sharma",
    username: "aarav-dev",
    commits: 180,
    repos: 10,
    stars: 25,
    topLanguage: "JavaScript",
    languages: ["JavaScript", "React", "Node.js", "CSS"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
    bio: "Frontend specialist with a keen eye for design",
    activity: [
      { date: "2025-10-15", commits: 3 },
      { date: "2025-10-16", commits: 7 },
      { date: "2025-10-17", commits: 9 },
      { date: "2025-10-18", commits: 5 },
      { date: "2025-10-19", commits: 11 },
      { date: "2025-10-20", commits: 6 },
      { date: "2025-10-21", commits: 8 },
      { date: "2025-10-22", commits: 5 },
      { date: "2025-10-23", commits: 7 },
      { date: "2025-10-24", commits: 9 },
      { date: "2025-10-25", commits: 6 },
      { date: "2025-10-26", commits: 8 },
      { date: "2025-10-27", commits: 10 },
      { date: "2025-10-28", commits: 7 },
    ],
  },
  {
    id: 3,
    name: "Diya Patel",
    username: "diya-code",
    commits: 210,
    repos: 15,
    stars: 42,
    topLanguage: "Python",
    languages: ["Python", "Django", "PostgreSQL", "Docker"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diya",
    bio: "Backend engineer focused on scalable architectures",
    activity: [
      { date: "2025-10-15", commits: 6 },
      { date: "2025-10-16", commits: 10 },
      { date: "2025-10-17", commits: 8 },
      { date: "2025-10-18", commits: 9 },
      { date: "2025-10-19", commits: 13 },
      { date: "2025-10-20", commits: 7 },
      { date: "2025-10-21", commits: 10 },
      { date: "2025-10-22", commits: 8 },
      { date: "2025-10-23", commits: 11 },
      { date: "2025-10-24", commits: 9 },
      { date: "2025-10-25", commits: 12 },
      { date: "2025-10-26", commits: 7 },
      { date: "2025-10-27", commits: 10 },
      { date: "2025-10-28", commits: 13 },
    ],
  },
  {
    id: 4,
    name: "Rohan Mehta",
    username: "rohan-tech",
    commits: 195,
    repos: 11,
    stars: 31,
    topLanguage: "Go",
    languages: ["Go", "Kubernetes", "Terraform", "AWS"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    bio: "DevOps engineer automating everything",
    activity: [
      { date: "2025-10-15", commits: 4 },
      { date: "2025-10-16", commits: 8 },
      { date: "2025-10-17", commits: 10 },
      { date: "2025-10-18", commits: 7 },
      { date: "2025-10-19", commits: 12 },
      { date: "2025-10-20", commits: 8 },
      { date: "2025-10-21", commits: 9 },
      { date: "2025-10-22", commits: 6 },
      { date: "2025-10-23", commits: 8 },
      { date: "2025-10-24", commits: 11 },
      { date: "2025-10-25", commits: 7 },
      { date: "2025-10-26", commits: 9 },
      { date: "2025-10-27", commits: 10 },
      { date: "2025-10-28", commits: 8 },
    ],
  },
];

export const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "react-dashboard",
    description: "Modern analytics dashboard built with React and TypeScript",
    stars: 156,
    forks: 23,
    language: "TypeScript",
    lastUpdated: "2025-10-20",
  },
  {
    id: 2,
    name: "api-gateway",
    description: "Microservices API gateway with authentication and rate limiting",
    stars: 89,
    forks: 12,
    language: "Go",
    lastUpdated: "2025-10-19",
  },
  {
    id: 3,
    name: "ml-pipeline",
    description: "Scalable machine learning pipeline for data processing",
    stars: 234,
    forks: 45,
    language: "Python",
    lastUpdated: "2025-10-21",
  },
  {
    id: 4,
    name: "mobile-app",
    description: "Cross-platform mobile application with React Native",
    stars: 67,
    forks: 8,
    language: "JavaScript",
    lastUpdated: "2025-10-18",
  },
  {
    id: 5,
    name: "design-system",
    description: "Component library and design system for enterprise apps",
    stars: 123,
    forks: 19,
    language: "TypeScript",
    lastUpdated: "2025-10-17",
  },
];

export const getEmployeeById = (id: number): Employee | undefined => {
  return mockTeam.find((employee) => employee.id === id);
};

export const getTeamStats = () => {
  return {
    totalCommits: mockTeam.reduce((sum, emp) => sum + emp.commits, 0),
    totalRepos: mockTeam.reduce((sum, emp) => sum + emp.repos, 0),
    totalStars: mockTeam.reduce((sum, emp) => sum + emp.stars, 0),
    teamSize: mockTeam.length,
  };
};
