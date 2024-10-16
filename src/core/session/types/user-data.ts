// import { Database } from '~/database.types';

/**
 * This interface represents the user record in the Database
 * Not to be confused with {@link User} defined in Supabase Auth
 * This data is always present in {@link UserSession}
 */
interface UserData {
  _id?: string;
  email?: string;
  subscription?: any | null;
}

export default UserData;
