import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function FavoritePage(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
   
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
            <div className='loadContainer'>
                <h1>Carregando Filmes ...</h1>
            </div>
        );
    }
    
    return(
        <div className='container'>
        {
            movies.map((movie) => {
                return (
                    <article key={movie.id} className='movieBox'>
                        <p className='movieTitle'> {movie.title} </p>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.url_poster}`} className='movieImage' alt={movie.title} />
                        <Link to={`/detail/${movie.id}`} className='movieButton'> Saiba Mais </Link>
                    </article>
                )
            })
        }
    </div>
    );
}

export default FavoritePage