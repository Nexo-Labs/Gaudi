export interface SessionModel {
    status: boolean;
    user: {
      name: string;
      email: string;
      idToken: string;
      accessToken: string;
      refreshToken: string;
    };
}
