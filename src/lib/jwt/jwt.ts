import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Define the shape of the user payload
interface UserPayload {
  email: string;
  _id: string;
}

// Define the shape of the token's sub property
interface DecodedToken {
  sub: UserPayload;
}

export function generateToken(user: UserPayload): string {
  return jwt.sign({ sub: user }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function decodeToken(token: string | null) {
  try {
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken | null;

      if (decoded?.sub) {
        return {
          accessToken: token,
          user: {
            email: decoded.sub.email,
            _id: decoded.sub._id,
          },
        };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}
