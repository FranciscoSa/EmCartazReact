import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./favorite.css"
import { updateFavoriteList } from "../../services/repository";

function FavoritePage(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
   
    useEffect(() => {
        async function setMoviesData() {
            const localFavorite = localStorage.getItem("@EmCartazFavorite")
            setMovies(localFavorite ? JSON.parse(localFavorite) : []);

            setLoading(false);
        }

        setMoviesData()
    }, []);

    if (loading) {
        return (
            <div className='loadContainerFavoriteList'>
                <div class="loaderFavoriteList "></div>
                <h1>Carregando Filmes</h1>
            </div>
        );
    } else if (movies.length == 0) {
        return(
            <div className="containerErrorFavorite">
                <h1> Ops ! </h1>
                 <strong> Sua lista esta vazia !!!</strong>
                 <Link className="homeButtonFavorite" to="/"> Ir para Home </Link>
            </div>
        );
    }
    
    return(
        <div>
            <h1 id="titleFavoriteList"> Lista de Favoritos </h1>
            
            <div className='container'>
            {
                movies.map((movie) => {
                    return (
                        <article key={movie.id} className='movieBox'>
                            <p className='movieTitle'> {movie.title} </p>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.url_poster}`} className='movieImage' alt={movie.title} />
                            <div className="buttonGroup">
                                <Link to={`/detail/${movie.id}`} className='movieButton'> Saiba Mais </Link>
                                <button className="addMyListButton" onClick={() => { setMovies(updateFavoriteList(movies, movie.id)) }}>
                                    Remover da lista
                                </button>
                            </div>
                        </article>
                    )
                })
            }
            </div>
        </div>

    );
}

export default FavoritePage