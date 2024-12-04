import APP_ENVS from "../constants/appEnvs";

const interactionService = {
  async saveInteraction(songId, duration, accessToken) {
    const response = await fetch(
      `${APP_ENVS.EXPO_PUBLIC_API_URL}/interactions/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          songId,
          duration,
        }),
      }
    );

    if (!response.ok) {
      throw await response.json();
    }
  },
};

export default interactionService;
