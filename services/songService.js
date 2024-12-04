import APP_ENVS from "../constants/appEnvs";

const songService = {
  searchSongs: async (title, page = 0, size = 15) => {
    const query = new URLSearchParams({ title, page, size }).toString();
    const url = `${APP_ENVS.EXPO_PUBLIC_API_URL}/songs/search?${query}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw response.json();
    }

    return response.json();
  },
};

export default songService;
