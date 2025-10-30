export type LoginResponse = {
    message: string,
    accessToken: string,
    refreshToken: string
    userId: string
}

export interface RefreshTokenResponse {
  accessToken: string;
}