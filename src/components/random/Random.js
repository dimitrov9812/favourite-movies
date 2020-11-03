import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import Nav from '../../navigation/Nav';
import { RootStoreContext } from '../../store/RootStore';

const Random = () => {
    const store = useContext(RootStoreContext);
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        store.userStore.getMovies('random').then(() => {
            console.log("after");
            setMovies(store.userStore.movies);
            console.log(store.userStore.movies);
            setLoading(false);
        });
    }, [store.userStore])

    const scrollTop = async () => {
        window.location.reload();
    };

    const renderMovies = () => {
        if (loading) {
            return (
                <RingLoader color="red" />
            )
        }
            return (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        <Card style={{ width: '300px', margin: 20 }}>
                            <CardActionArea>
                                <CardMedia
                                    image={`https://image.tmdb.org/t/p/w200${store.userStore.movies.poster_path}`}
                                    title={store.userStore.movies.title}
                                    style={{ justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <img className={store.userStore.nightMode? 'darkImg' : null} src={`https://image.tmdb.org/t/p/w300${store.userStore.movies.poster_path}`} alt="recipe thumbnail" />
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {store.userStore.movies.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {store.userStore.movies.overview}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                    <div style={{display:'flex',justifyContent:'center', alignContent:'center',}}>
                        <Button style={{position:'absolute',right:250}} onClick={() => scrollTop()}>
                            Get Another
                        </Button>
                    </div>
                </div>
            )
    }

    return (
        <div>
            <Nav />
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#e8e7e3'}}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '80%', margin: '0 auto' }}>
                    {renderMovies()}
                </div>
            </div>
        </div>

    )
}

export default Random;