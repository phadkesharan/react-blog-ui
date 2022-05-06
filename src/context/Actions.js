export const loginStart = (userCredentials) =>({
    type: "LOGIN_START"
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginFailure = (user) => ({
    type: "LOGIN_FAILURE",
    payload: user
});

export const logout = (user)=>({
    type: "LOGOUT"
});


export const updateStart = (userCredentials) =>({
    type: "UPDATE_START"
});

export const updateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user
});

export const updateFailure = (user) => ({
    type: "UPDATE_FAILURE",
    payload: user
});