import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(user: any): string {
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
      const decoded = jwt.decode(token);
      return {
        accessToken: token,
        user: {
          email: decoded.sub.email,
          _id: decoded.sub._id,
        },
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
