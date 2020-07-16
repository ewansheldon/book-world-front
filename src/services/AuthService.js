const authTokenName = "_nico";

export const isLoggedIn = cookies => {
    return !!cookies.get(authTokenName);
};

export const setLoggedIn = (cookies, token) => {
    cookies.set(authTokenName, token);
};

export const logOut = cookies => {
    cookies.remove(authTokenName);
};

export const getToken = cookies => {
    return cookies.get(authTokenName);
}