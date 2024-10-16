import type UserData from '~/core/session/types/user-data';

/**
 * This interface combines the user's metadata from
 * Supabase Auth and the user's record in Database
 */
interface UserSession {
  auth?: {
    accessToken: Maybe<string>;

    user: {
      _id: string;
      email: Maybe<string>;
    };
  };

  data: Maybe<UserData>;
}

export default UserSession;
