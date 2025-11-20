import { axiosInstance } from "@/constants";

export class LogoutService {
  private static LOGOUT_URL = "/logout";

  public static async logout() {
    return axiosInstance.post<any>(this.LOGOUT_URL);
  }
}
