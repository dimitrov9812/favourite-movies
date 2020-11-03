import { Button, FormControlLabel, Paper, Switch, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../store/RootStore';
import SearchIcon from '@material-ui/icons/Search';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import useForceUpdate from 'use-force-update';
import Cookie from 'js-cookie';

const Nav = ({ navigation }) => {
    const store = useContext(RootStoreContext);
    const [filter, setFilter] = useState('');
    const forceUpdate = useForceUpdate();

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
                                <Link to={`/search/:${filter}`}><Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{ margin: 10 }}
                                    startIcon={<SearchIcon />}>Search</Button></Link>
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

export default Nav;