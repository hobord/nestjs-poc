export interface JwtPayload {
  sub: string;  // user id
  email: string;
  name: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}
