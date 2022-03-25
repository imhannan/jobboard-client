import type Company from "./Company";
import type Tag from "./Tag";
interface Job {
  id: string;
  slug: string;
  link: string;
  highlighted: boolean;
  pinned: boolean;
  title: string;
  location: string;
  company: Company;
  tags: Tag[];
}

export default Job;
