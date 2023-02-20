export interface ShortAccessTokenResponse {
  access_token: string;
  user_id: number;
}

export interface LongAccessTokenResponse {
  access_token: string;
  token_type: number;
  expires_in: number;
}
