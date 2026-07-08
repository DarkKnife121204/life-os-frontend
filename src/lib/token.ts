export const setToken = (token: string) => {
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

export const getToken = () => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    return token ? decodeURIComponent(token) : null;
};

export const removeToken = () => {
    document.cookie = "token=; path=/; max-age=0";
};