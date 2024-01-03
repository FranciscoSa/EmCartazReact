import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMoviesList } from '../../services/repository';
import "./home.css";

function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function setMoviesData() {
            setMovies(await getMoviesList(page));
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

    return (
        <div className='container'>
            {
                movies.map((movie) => {
                    return (
                        <article key={movie.id} className='movieBox'>
                            <p className='movieTitle'> {movie.title} </p>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='movieImage' alt={movie.title} />
                            <Link to={`/detail/${movie.id}`} className='movieButton'> Saiba Mais </Link>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default Home;