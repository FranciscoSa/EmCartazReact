import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMoviesList } from '../../services/repository';
import "./home.css";

function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(5);

    useEffect(() => {
        async function setMoviesData() {
            setMovies(await getMoviesList(page))
        }

        setMoviesData()
    }, []);

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