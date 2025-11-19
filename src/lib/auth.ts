import jwt from 'jsonwebtoken';
import { User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export function generateToken(user: User): string {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch {
    return null;
  }
}

// Mock user database (in production, use a real database)
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
  },
];

export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find(user => user.email === email);
}

export function createUser(email: string, name: string): User {
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    email,
    name,
  };
  mockUsers.push(newUser);
  return newUser;
}

export function validatePassword(email: string, password: string): boolean {
  // In production, hash and compare passwords properly
  // For demo purposes, accept any password for demo@example.com
  return email === 'demo@example.com' && password === 'password';
}
