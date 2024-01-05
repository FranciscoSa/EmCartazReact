import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMoviesList, saveMovie, getMovieDetail } from '../../services/repository';
import "./home.css";

function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function setMoviesData() {
            setMovies(await getMoviesList(page));
            setLoading(false);
        }

        setMoviesData()
    }, []);

    async function saveMovieOnfavoriteList(id) {
        const movieDetail = await getMovieDetail(id)
        saveMovie(movieDetail)
    }

    if (loading) {
        return (
            <div className='loadContainerHome'>
                <div class="loaderHome "></div>
                <h1>Carregando Filmes</h1>
            </div>
        );
    }

    return (
        <div className='containerHome'>
            {
                movies.map((movie) => {
                    return (
                        <article key={movie.id} className='movieBoxHome'>
                            <p className='movieTitleHome'> {movie.title} </p>
                            
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='movieImageHome' alt={movie.title} />
                    
                            <div className="buttonGroupHome">
                                <Link to={`/detail/${movie.id}`} className='movieButtonHome'> Saiba Mais </Link>
                                <button className="addMyListButtonHome" onClick={() => saveMovieOnfavoriteList(movie.id)}>Adicionar a lista</button>
                            </div>

                        </article>
                    )
                })
            }
        </div>
    )
}

export default Home;