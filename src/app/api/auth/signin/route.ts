import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '~/lib/mongodb/client';
import Users from '~/models/Users';
import { generateToken } from '~/lib/jwt/jwt';

interface Credentials {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Credentials;
    await connectDB();

    // Find user by email
    const user = await Users.findOne({ email: body.email });
    console.log('user------', user);

    if (!user) {
      return NextResponse.json({ error: 'User not Found' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = bcrypt.compareSync(body.password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = generateToken({ _id: user.id, email: user.email });

    // Don't send password back to client
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
    };

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Signin error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to sign in' },
      { status: 500 },
    );
  }
}
