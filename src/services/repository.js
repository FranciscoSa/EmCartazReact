import axios from 'axios';
import { redirect } from 'react-router-dom'

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

export async function getMovieDetail(id) {

    let detailMovie = {
        id: null,
        title : null,
        url : null,
        vote_average: null,
        vote_count: null,
        overview: null,
        genres: []
    }

    await BaseApi.get(`movie/${id}`, {
        params: {
            api_key: "146e18d192e063b3f30d264301c8cb27",
            language: "pt-BR"
        }
    }).then((response)=>{

        detailMovie.id = response.data.id
        detailMovie.title = response.data.title;
        detailMovie.url = `https://image.tmdb.org/t/p/original/${ response.data.backdrop_path }`;
        detailMovie.vote_average = response.data.vote_average;
        detailMovie.vote_count = response.data.vote_count;
        detailMovie.overview = response.data.overview

        response.data.genres.map((genre)=>{
            detailMovie.genres.push(genre)
        });

    }).catch((error)=>{
       detailMovie.id = 'erro'
    })
   
    return detailMovie
}
