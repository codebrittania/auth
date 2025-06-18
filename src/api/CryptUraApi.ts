// src/api/crypturaApi.ts
import axios from "axios";

export interface RegisterPayload {
  username: string;
  password: string;
}

export interface RegisterResponse {
  username: string;
  totp_secret: string;
  totp_uri: string;
}

// ✅ Новый интерфейс для логина
export interface LoginPayload {
  username: string;
  password: string;
  totp_code: string; // 👈 точное соответствие API
}

export interface LoginResponse {
  access_token: "string";
  token_type: "string";
}

class CryptUraApi {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await axios.post("/api/register", payload);
    return data;
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await axios.post("/api/login", payload);
    return data;
  }
}

export const cryptUraApi = new CryptUraApi();
