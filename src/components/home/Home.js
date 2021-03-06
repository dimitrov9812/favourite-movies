import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Nav from '../../navigation/Nav';
import { RootStoreContext } from '../../store/RootStore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { RingLoader } from 'react-spinners';
import { useObserver } from 'mobx-react';
import useForceUpdate from 'use-force-update';

const Home = ({ history }) => {
    const store = useContext(RootStoreContext);
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        setLoading(true);
        store.userStore.getMovies('top-rated').then(() => {
            console.log("after");
            setMovies(store.userStore.movies);
            setLoading(false);
        });
    }, [store.userStore])

    const nextPage = () => {
        setLoading(true);
        store.userStore.page = store.userStore.page + 1;
        store.userStore.getMovies('top-rated').then(() => {
            console.log("NEW MOVIES");
            setMovies(store.userStore.movies);
            setLoading(false);
        });
    }

    const previousPage = () => {
        setLoading(true);
        store.userStore.page = store.userStore.page - 1;
        store.userStore.getMovies('top-rated').then(() => {
            console.log("Previous MOVIES");
            setMovies(store.userStore.movies);
            setLoading(false);
        });
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMovieSelect = (id) => {
        store.userStore.selectedMovieId = id;
        history.push("/details");
    }
    const renderMovieCards = () => {
        return movies.map((movie) => {
            return (
                <Card style={{ width: '300px', margin: 20 }} onClick={() => handleMovieSelect(movie.id)}>
                    <CardActionArea>
                        <CardMedia
                            image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            title={movie.title}
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <img className={store.userStore.nightMode? 'darkImg' : null} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="recipe thumbnail" />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {movie.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {movie.overview}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        })
    }

    const renderMovies = () => {
        if (loading) {
            return (
                <RingLoader color="red" />
            )
        }

        if (movies.length > 0) {
            return (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {renderMovieCards()}
                    </div>
                    <div style={{display:'flex',justifyContent:'center', alignContent:'center',}}>
                        <Button onClick={() => previousPage()}>
                            Previous page
                        </Button>
                        <Button onClick={() => nextPage()}>
                            Next page
                        </Button>
                        <Button style={{position:'absolute',right:250}} onClick={() => scrollTop()}>
                            Scroll to Top
                        </Button>
                    </div>
                </div>
            )
        }

        return (
        <h1>No movies to render {store.userStore.test}</h1>
        )
    }
    return useObserver(() => (
        <div>
            <Nav />
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#e8e7e3'}}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '80%', margin: '0 auto' }}>
                    {renderMovies()}
                </div>
            </div>
        </div>
    ))
}

export default Home;