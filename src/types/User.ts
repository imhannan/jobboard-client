import type Company from "./Company";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  profile: Company;
}

export default User;
