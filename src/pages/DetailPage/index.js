import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../services/repository";
import "./detail.css"

function DetailPage(){
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState();
    const [loading, setLoading] = useState(true)

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
    } else if (movieDetail.id === 'erro') {
       
    }

    return(
        <div className="detailContainer">

            <img id="movieImage" src={ movieDetail.url } alt= {movieDetail.title} />
            
            <div className="infoContainer">

                <article id="titleGroup"> 
                    <h1>{ movieDetail.title }</h1>
                    <h2>{ `Nota: ${ movieDetail.vote_average } / Avaliações: ${movieDetail.vote_count}` }</h2>
                </article>
                
                <div id="movieGenres">
                    {
                        movieDetail.genres.map((genre) => {
                            return (
                                <strong id={ genre.id } key={genre.id}> { genre.name } </strong>
                            )
                        })
                    }
                </div>
                
                <p> { movieDetail.overview } </p>

            </div>

        </div>
    );
}

export default DetailPage;