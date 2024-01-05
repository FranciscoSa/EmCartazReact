import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetail, saveMovie } from "../../services/repository";
import "./detail.css"

function DetailPage(){
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getDetailMovie() {
            setMovieDetail(await getMovieDetail(id))
            setLoading(false)
        }

        getDetailMovie();
    }, []);

    if (loading) {
        return (
            <div className='loadContainer'>
                <h1> Carregando Filmes ... </h1>
            </div>
        );
    } else if (movieDetail.id === null) {
        navigate("/", { replace: true })
    }


    return(
        <div className="detailContainer">

            <img id="movieImage" src={ movieDetail.url_banner } alt= {movieDetail.title} />
            
            <div className="infoContainer">

                <h1 id="titleLabel">{ movieDetail.title }</h1>
                
                <div id="movieGenres">
                    {
                        movieDetail.genres.map((genre) => {
                            return (
                                <strong id={ genre.id } key={genre.id}> { genre.name } </strong>
                            )
                        })
                    }

                    <div id="voteGroup">
                        <h2>{ `Nota: ${ movieDetail.vote_average } / 10 `}</h2>
                        <h2>{ `Avaliações: ${movieDetail.vote_count}`}</h2>
                    </div>

                </div>
                
                <p> { movieDetail.overview } </p>

                <button id="addMyListButton" onClick={ ()=>{ saveMovie(movieDetail) } }>Adiconar a Minha lista</button>
                
                <a target="blank" 
                    rel="external" 
                    href= {`https://youtube.com/results?search_query= ${ movieDetail.title } Trailer `} 
                    id="goToTrailer">Trailer</a>
            </div>

        </div>
    );
}

export default DetailPage;