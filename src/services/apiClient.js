import axios from "axios";

const API_KEY = '5e25897eb4dad75cd4e4d86fc894eb3d'

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3", 
    params: { api_key: API_KEY },
})

export default apiClient;