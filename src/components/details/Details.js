import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import Nav from '../../navigation/Nav';
import { RootStoreContext } from '../../store/RootStore';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TheatersIcon from '@material-ui/icons/Theaters';
import useForceUpdate from 'use-force-update';

const Details = ({ history }) => {
    const store = useContext(RootStoreContext);
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(false);
    const forceUpdate = useForceUpdate();
    const width = window.innerWidth;
    
    useEffect(() => {
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
          }
    },[])

    useEffect(() => {
        setLoading(true);
        if (store.userStore.selectedMovieId === '') {
            history.push("/home");
        }
        store.userStore.getMovies('details').then(() => {
            console.log(store.userStore.selectedMovieId);
            setMovies(store.userStore.movies);
            console.log(store.userStore.movies);
            console.log(store.userStore.movies.genres[0].name)
            setLoading(false);
        });
    }, [store.userStore])

    const resize = () => forceUpdate();

    const scrollTop = async () => {
        window.location.reload();
    };
    const handleImdbSearch = () => {
        const title = store.userStore.movies.title;
        const splittedTitle= title.split(' ').join('+');
        console.log(splittedTitle);
        window.open(`https://www.imdb.com/find?q=${splittedTitle}&ref_=nv_sr_sm`, '_blank')
    }
    const handleYouTubeSearch = () => {
        window.open(`https://www.youtube.com/results?search_query=${store.userStore.movies.title}+movie+trailer`, '_blank');
    }
    const renderMovieDetails = (imageSize) => {
        return (
            <div style={{ display: 'flex', flexDireciton: 'column', padding:20}}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            title={store.userStore.movies.title}
                            style={{ justifyContent: 'center', alignItems: 'center', padding: 10, paddingTop:20, paddingRight: 20}}>
                            <img style={{display:'flex', width:`${imageSize}`, margin:'0 auto'}} src={`https://image.tmdb.org/t/p/w${imageSize}${store.userStore.movies.poster_path}`} alt="recipe thumbnail" />
                        </CardMedia>
                    </CardActionArea>
                </Card>
                <div style={{marginLeft: 20, width:'60%' }}>
                    <Card>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Original Title</h4>{store.userStore.movies.title}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Average vote</h4>{store.userStore.movies.vote_average}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Genre</h4>{store.userStore.movies.genres? store.userStore.movies.genres[0].name : "Can't get genre"}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Release Date</h4>{store.userStore.movies.release_date}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Overview</h4>{store.userStore.movies.overview}
                                    </Typography>
                                </CardContent>
                                <CardContent style={{display:'flex',flexDirection:'row'}}>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <div style={{display:'flex', flexDirection:'column', cursor:'pointer'}} onClick={() => handleYouTubeSearch()}>
                                            <span style={{marginLeft:14}}>See Trailer</span>
                                            <YouTubeIcon style={{color:'red', fontSize:100}}></YouTubeIcon>
                                        </div>
                                    </Typography>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <div style={{display:'flex', flexDirection:'column', cursor:'pointer'}} onClick={() => handleImdbSearch()}>
                                            <span style={{marginLeft:35}}>IMDB</span>
                                            <TheatersIcon style={{color:'black', fontSize:100, rotate:'90deg'}}></TheatersIcon>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
    const checkMobile = () => {
        if (width < 1226) {
            return renderMobileDetails();
        }
        if (width > 1226 && width < 1500) {
            return renderTabletDetails();
        }
        return renderDesktopDetails();
    }

    const renderMobileDetails = () => {
        return (
            <div style={{padding:20}}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            title={store.userStore.movies.title}
                            style={{ justifyContent: 'center', alignItems: 'center', padding: 10, paddingTop:20, paddingRight: 20}}>
                            <img style={{display:'flex', width:300, margin:'0 auto'}} src={`https://image.tmdb.org/t/p/w300${store.userStore.movies.poster_path}`} alt="recipe thumbnail" />
                        </CardMedia>
                    </CardActionArea>
                    <div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Original Title</h4>{store.userStore.movies.title}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Average vote</h4>{store.userStore.movies.vote_average}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Genre</h4>{store.userStore.movies.genres? store.userStore.movies.genres[0].name : "Can't get genre"}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Release Date</h4>{store.userStore.movies.release_date}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <h4>Overview</h4>{store.userStore.movies.overview}
                                    </Typography>
                                </CardContent>
                                <CardContent style={{display:'flex',flexDirection:'row'}}>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <div style={{display:'flex', flexDirection:'column', cursor:'pointer'}} onClick={() => handleYouTubeSearch()}>
                                            <span style={{marginLeft:14}}>See Trailer</span>
                                            <YouTubeIcon style={{color:'red', fontSize:100}}></YouTubeIcon>
                                        </div>
                                    </Typography>
                                    <Typography  variant="body2" color="textSecondary" component="p">
                                        <div style={{display:'flex', flexDirection:'column', cursor:'pointer'}} onClick={() => handleImdbSearch()}>
                                            <span style={{marginLeft:35}}>IMDB</span>
                                            <TheatersIcon style={{color:'black', fontSize:100, rotate:'90deg'}}></TheatersIcon>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </div>
                        </div>
                </Card>
            </div>
        )
    }

    const renderDesktopDetails = () => {
        return renderMovieDetails(500);
    }

    const renderTabletDetails = () => {
        return renderMovieDetails(300)
    }


    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', backgroundColor: '#e8e7e3',height: '93vh'}}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: '0 auto' }}>
                    {/* {renderMovieDetails()} */}
                    {checkMobile()}
                </div>
            </div>
        </div>

    )
}

export default Details;