import APP_ENVS from "../constants/appEnvs";
console.log("🚀 ~ APP_ENVS:", APP_ENVS);

const authService = {
  async register(fullName, email, password) {
    const response = await fetch(
      `${APP_ENVS.EXPO_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      return await response.json();
    }

    throw await response.json();
  },
};

export default authService;
