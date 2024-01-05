import axios from 'axios';
import { toast } from "react-toastify"

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
        url_banner : null,
        url_poster: null,
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
        detailMovie.url_banner = `https://image.tmdb.org/t/p/original/${ response.data.backdrop_path }`;
        detailMovie.url_poster = `https://image.tmdb.org/t/p/original/${ response.data.poster_path }`;
        detailMovie.vote_average = response.data.vote_average;
        detailMovie.vote_count = response.data.vote_count;
        detailMovie.overview = response.data.overview

        response.data.genres.map((genre)=>{
            detailMovie.genres.push(genre)
        });

    }).catch((error)=>{
        toast.error(`Ouve um erro ao carregar os detalhes desse filme`);
    })
   
    return detailMovie
}

export function saveMovie(movieDetail) {
    const localFavorite = localStorage.getItem("@EmCartazFavorite")
    const favoriteList = localFavorite ? JSON.parse(localFavorite) : [];

    const isMovieAlreadySaved = favoriteList.some((movie) => movie.id === movieDetail.id);

    if (!isMovieAlreadySaved) {

        favoriteList.push(movieDetail);

        localStorage.setItem( "@EmCartazFavorite", JSON.stringify(favoriteList));

    } 

    return !isMovieAlreadySaved ?  toast.success("Filme salvo na sua lista com sucesso.") : toast.warn("Este filme já esta na sua lista.");
}

export function updateFavoriteList(favoriteList, movieId) {
    const newFavoriteList = favoriteList.filter((movie) => movie.id !== movieId);

    localStorage.setItem("@EmCartazFavorite", JSON.stringify(newFavoriteList));
    
    toast.success(" Filme removido com sucesso da lista.");

    return newFavoriteList;
}