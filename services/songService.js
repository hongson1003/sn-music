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
  getNewsSongs: async (limit = 10) => {
    const url = `${APP_ENVS.EXPO_PUBLIC_API_URL}/songs/newest?limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw response.json();
    }

    return response.json();
  },
  getRecommendSongs: async (accessToken) => {
    const url = `${APP_ENVS.EXPO_PUBLIC_API_URL}/recommendations`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw response.json();
    }

    return response.json();
  },
  getLikedSongs(accessToken) {
    const url = `${APP_ENVS.EXPO_PUBLIC_API_URL}/interactions/get-liked-songs`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    });
  },
};

export default songService;
