import { Button } from '@material-ui/core';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../store/RootStore';

const Home = () => {
    const store = useContext(RootStoreContext);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getMovies();
    },[]);

    const getMovies = async () => {
        const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${page}`

        await Axios.get(URL).then((res) => {
            console.log(res.data.results);
            movies.push(res.data.results);
            setMovies(movies)
            renderMovies();
            setPage(page + 1);
        });
    }

    const nextPage = () => {
        getMovies();
    }

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
     };

    const renderMovies = () => {
        console.log("Length" + movies.length);
        return movies.map((movieArr) => {
            return movieArr.map((movie) => {
                return (
                    <div style={{width:'400px', height:'600px', border:'1px solid black'}} key={movie.id}>
                        <h3 onClick={() => console.log("loading movie details")}>{movie.title}</h3>
                        <h6>{movie.release_date}</h6>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} onClick={() => console.log("loading movie details")} alt="poster"/>
                        <h6>{movie.overview}</h6>
                    </div>
                )
            })
        })
    }
    return (
        <div>
            <div>
                <nav style={{backgroundColor: 'red', height: '15vh'}}>
                    <li>
                        <Link to="/home">Movies</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/logout">Logout</Link>
                    </li>
                </nav>
            </div>
            <div>
                <div style={{display:'flex', flexDirection:'row',flexWrap:'wrap', justifyContent:'space-around'}}>
                {renderMovies()}
                </div>
                <Button onClick={() => nextPage()}>
                    Next page
                </Button>
                <Button onClick={() => scrollTop()}>
                    Scroll to Top
                </Button>
            </div>
        </div>

    )
}

export default Home;