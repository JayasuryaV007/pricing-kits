import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '~/lib/mongodb/client';
import { Users as UserType } from '~/types/users';
import Users from '~/models/Users';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as UserType;
    await connectDB();

    // Check if user already exists
    const existingUser = await Users.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already registered' },
        { status: 400 },
      );
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);

    // Create user
    const user = await Users.create({
      email: body.email,
      password: hashedPassword,
    });

    // Don't send password back to client
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to create user' },
      { status: 500 },
    );
  }
}
