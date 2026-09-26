export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  avatarUrl?: string | null;
}

export interface AuthSession {
  accessToken: string;
  user: User;
}

export interface IdentityProvider {
  name: 'google' | 'facebook' | 'github';
  enabled: boolean;
}
