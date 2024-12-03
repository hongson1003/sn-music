import APP_ENVS from "../constants/appEnvs";

const songService = {
  searchSongs: async (title) => {
    const url = `${APP_ENVS.EXPO_PUBLIC_API_URL}/songs/search?title=${title}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw response.json();
    }

    return response.json();
  },
};

export default songService;
