const API_BASE_URL = "https://api.jikan.moe/v4";

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    if (!response.ok) throw new Error(`ERROR: ${response.status}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
