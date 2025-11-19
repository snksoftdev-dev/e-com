import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function getServerSideAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return { user: null, isAuthenticated: false };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return { user: null, isAuthenticated: false };
    }

    // You can extend this to fetch full user data from database
    const user = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.email.split('@')[0], // Simple name extraction
    };

    return { user, isAuthenticated: true };
  } catch (error) {
    console.error('Server-side auth error:', error);
    return { user: null, isAuthenticated: false };
  }
}
