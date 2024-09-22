export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};

export const clearLS = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') ?? '';
};
