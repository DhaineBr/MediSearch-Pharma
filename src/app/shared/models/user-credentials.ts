
export interface UserCredentials {
  email: string;
  password: string;
  authType: 'pharmacy_staff' | 'customer' | 'admin'
}
