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
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface ApiKeyResponse {
  api_key: string;
}

// interface BalanceResponse {
//   balance_usdt: number;
//   pending_balance: number;
//   currency: string;
//   last_updated: string;
// }

export interface StatsBalanceResponse {
  wallet_usdt: number;
  hold_rub: number;
  rub_in: number;
  rub_out: number;
  hold_usdt: number;
}

export interface GetWalletsResponse {
  total: number;
  wallets: string[];
}

class CryptUraApi {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await axios.post(
      "http://92.118.115.96:8004/api/register",
      payload
    );
    return data;
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await axios.post(
      "http://92.118.115.96:8004/api/login",
      payload
    );
    return data;
  }

  async refreshAccessToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("Нет refresh-токена");

    // Отправляем POST, передавая refresh_token в body как JSON
    const { data } = await axios.post<LoginResponse>(
      "http://92.118.115.96:8004/api/refresh",
      { refresh_token: refreshToken }
    );

    // Обновляем токены
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
    return data;
  }

  async getApiKey(): Promise<ApiKeyResponse> {
    const token = localStorage.getItem("token");
    console.log(`token getApiKey: ${token} `);

    if (!token) {
      throw new Error("Нет токена авторизации");
    }
    const { data } = await axios.get("http://92.118.115.96:8004/api/api-key", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("api_key", data.api_key);
    console.log(data);
    return data;
  }

  async getTransactions(
    offset: number,
    limit: number,
    status: string | null,
    search: string
  ): Promise<any> {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset,
          limit,
          ...(status ? { status } : {}),
          ...(search ? { search } : { search: "" }),
        },
      }
    );
    console.log(data);
    return data;
  }

  async getMerchantBalance(): Promise<any> {
    const token = localStorage.getItem("token");

  const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  async getStatsBalances(): Promise<StatsBalanceResponse> {
    const token = localStorage.getItem("token");

    // if (!api_key) {
    //   throw new Error("Нет API-ключа");
    // }

    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/stats/balances",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  async getSummaryStats(): Promise<{
    week: {
      total: number;
      completed: number;
      pending: number;
      cancelled: number;
    };
    month: {
      total: number;
      completed: number;
      pending: number;
      cancelled: number;
    };
    year: {
      total: number;
      completed: number;
      pending: number;
      cancelled: number;
    };
  }> {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/stats/summary",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }

  async createWithdraw(amount: number, wallet: string): Promise<any> {
    const token = localStorage.getItem("token");
    const api_key = localStorage.getItem("api_key");

    const { data } = await axios.post(
      "http://92.118.115.96:8004/api/merchant/withdraw",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": api_key,
        },
        params: {
          amount,
          wallet,
        },
      }
    );

    return data;
  }

  async rateUsdtRub(): Promise<any> {
    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/rate/usdt-rub"
    );
    return data;
  }

  async getWallets(): Promise<any> {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/wallets",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  async getCallbackApi(): Promise<any> {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/callback-url",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
  
  async getMerchantFee(): Promise<any> {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://92.118.115.96:8004/api/merchant/fee",
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
