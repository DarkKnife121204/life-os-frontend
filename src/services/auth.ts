import api from "./api";

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