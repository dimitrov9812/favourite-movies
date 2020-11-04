import { Button, FormControlLabel, Paper, Switch, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../store/RootStore';
import SearchIcon from '@material-ui/icons/Search';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import useForceUpdate from 'use-force-update';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const Nav = () => {
    const store = useContext(RootStoreContext);
    const [filter, setFilter] = useState('');
    const [hiddenMenu, setHiddenMenu] = useState(false);
    const forceUpdate = useForceUpdate();
    const history = useHistory();
    const width = window.innerWidth;
    

    useEffect(() => {
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
          }
    },[])

    useEffect(() => {
        checkMobile();
        forceUpdate();
    }, [window.innerWidth]);

    const resize = () => forceUpdate();

    const handleSearch = () => {
        console.log(filter);
        if (filter !== '') {
            store.userStore.filter = filter;
            history.push('/search');
            forceUpdate();
        }
    }

    const renderHiddenMenu = () => {
        if (hiddenMenu) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#cccccc'}}>
                    <Link to="/home" onClick={async () => await store.userStore.getMovies("top-rated")}><Tab label="Home"></Tab></Link>
                    <Link to="/popular" onClick={async () => await store.userStore.getMovies("popular")}><Tab label="Popular"></Tab></Link>
                    <Link to="/upcoming" onClick={async () => await store.userStore.getMovies("upcoming")}><Tab label="Upcomi ng"></Tab></Link>
                    <Link to="/random" onClick={() => console.log("random")}><Tab label="Random"></Tab></Link>
                    <Link onClick={() => console.log("logging out")}><Tab label="Logout"></Tab></Link>
                </div>
            )
        }
    }
    const checkMobile = () => {
        if (width < 1226) {
            return renderMobileNav();
        }
        return renderDesktopNav();
    }
    const renderMobileNav = () => {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cccccc' }}>
                    <MenuIcon onClick={() => setHiddenMenu(!hiddenMenu)} style={{ fontSize: '50px', cursor: 'pointer' }}></MenuIcon>
                    <TextField style={{ marginBottom: 15 }} id="standard-basic" label="Enter movie keyword" onChange={(e) => setFilter(e.target.value)} />
                    <SearchIcon style={{ cursor: 'pointer', fontSize: '50px' }} onClick={() => handleSearch()}>Search</SearchIcon>
                </div>
                {hiddenMenu ? renderHiddenMenu() : null}
            </div>
        )
    }
    const renderDesktopNav = () => {
        return (
            <div className="App">
                <Paper square>
                    <Tabs indicatorColor="primary"
                        textColor="primary"
                        onChange={(e) => console.log(e.target.value)}
                        aria-label="disabled tabs example">
                        <div style={{ width: '100%', backgroundColor: '#cccccc', }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: "0 auto", width: '80%' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Link to="/home" onClick={async () => await store.userStore.getMovies("top-rated")}><Tab label="Home"></Tab></Link>
                                    <Link to="/popular" onClick={async () => await store.userStore.getMovies("popular")}><Tab label="Popular"></Tab></Link>
                                    <Link to="/upcoming" onClick={async () => await store.userStore.getMovies("upcoming")}><Tab label="Upcomi ng"></Tab></Link>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
                                    <TextField style={{ marginBottom: 15 }} id="standard-basic" label="Enter movie keyword" onChange={(e) => setFilter(e.target.value)} />
                                    {/* <Link to={`/search/:${filter}`}><Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{ margin: 10 }}
                                    startIcon={<SearchIcon />}>Search</Button></Link> */}
                                    <SearchIcon style={{ cursor: 'pointer' }} onClick={() => handleSearch()}>Search</SearchIcon>
                                    <Link to="/random" onClick={() => console.log("random")}><Tab label="Random"></Tab></Link>
                                    <Link onClick={() => console.log("logging out")}><Tab label="Logout"></Tab></Link>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </Paper>
            </div>
        )
    }
    return (
        checkMobile()
    )
}

export default Nav;