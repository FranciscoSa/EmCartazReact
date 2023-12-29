import {useEffect, useState} from 'react';
import { getMoviesList } from '../../services/repository';
function Home() {
    const[movies, setMovies] = useState([]);

    useEffect(()=>{
        setMovies (getMoviesList('1'))
    },[])


    return(
        <h1>Home page</h1>
    );
}

export default Home;