export const authHeader = () => {
  return {
    headers: {
      Authorization: localStorage.getItem("userToken"),
    },
  };
};
