export const setToken = (token: string) => {
    document.cookie = `token=${token}; path=/`;
};

export const getToken = () => {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
};