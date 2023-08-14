export const decodeAccessToken = (token: string) => {
  try {
    const tokenParts = token.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
  } catch (error) {
    return null;
  }
};
