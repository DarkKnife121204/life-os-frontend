import api from "./api.ts";

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
};

export const login = async (email: string, password: string) => {
    try {
        const { data } = await api.post("/login", { email, password });

        return {
            success: true,
            token: data.access_token,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message,
            status: error.response?.status,
        };
    }
};

export const getMe = async (): Promise<User> => {
    const { data } = await api.get<{ data: User }>("/self");

    return data.data;
};