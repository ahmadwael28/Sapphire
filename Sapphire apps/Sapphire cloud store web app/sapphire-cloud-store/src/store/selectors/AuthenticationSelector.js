export const authErrorSelector = (state) => state.auth.loginError;
export const signUpErrorSelector = (state) => state.auth.signupError;
export const signupSuccessSelector = (state) => state.auth.signupSucces;
export const isUsernameExistsSelector = (state) => state.auth.isUsernameExists;
export const isEmailExistsSelector = (state) => state.auth.isEmailExists;
