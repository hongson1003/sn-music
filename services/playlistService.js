import APP_ENVS from "../constants/appEnvs";

const playlistService = {
  getPlaylist: async () => {
    const url = `${APP_ENVS.EXPO_PUBLIC_API_URL}/playlists`;

    const response = await fetch(url);

    if (!response.ok) {
      throw response.json();
    }

    return response.json();
  },
};

export default playlistService;
