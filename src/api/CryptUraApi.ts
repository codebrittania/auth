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

export interface LoginPayload {
  username: string;
  password: string;
  totp_code: string;
}

export interface LoginResponse {
  access_token: "string";
  token_type: "string";
}

export interface ApiKeyResponse {
  api_key: string;
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

  async getApiKey(): Promise<ApiKeyResponse> {
    const token = localStorage.getItem("access_token");
    console.log(`token getApiKey: ${token} `);

    if (!token) {
      throw new Error("Нет токена авторизации");
    }
    const { data } = await axios.get("http://92.118.115.96:8004/api/key", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
  async getBalance(): Promise<string> {
    const token = localStorage.getItem("access_token");
    console.log(`token getBalance: ${token} `);
    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
}

export const cryptUraApi = new CryptUraApi();
