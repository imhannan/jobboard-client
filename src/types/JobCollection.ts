import type Job from "./Job";
interface JobCollection {
  data: Job[];
  links: Link;
  meta: Meta;
}

interface Link {
  first: string;
  last: string;
  prev: string;
  next: string;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export default JobCollection;
