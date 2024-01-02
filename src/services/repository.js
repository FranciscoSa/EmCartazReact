import axios from 'axios';
// URL base: https://api.themoviedb.org/3
// API key: api_key=146e18d192e063b3f30d264301c8cb27
// Complement: movie/now_playing?language=pt-br&page=1&
const BaseApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});


export async function getMoviesList(page) {

    const response = await BaseApi.get("movie/now_playing", {
        params:{ 
            api_key: "146e18d192e063b3f30d264301c8cb27",
            language: "pt-BR",
            page: page
        }
    });
    
    return response.data.results
}

export async function getDetailMovie(id) {
    const response = await BaseApi.get(`movie/${id}`, {
        params: {
            api_key: "146e18d192e063b3f30d264301c8cb27",
            language: "pt-BR"
        }
    });
}
