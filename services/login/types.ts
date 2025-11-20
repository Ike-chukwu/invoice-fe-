export type LoginResponse = {
    message: string,
    accessToken: string,
    refreshToken: string
    email: string
}

export interface RefreshTokenResponse {
  accessToken: string;
}