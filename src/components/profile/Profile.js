import React, { useContext } from 'react';
import Nav from '../../navigation/Nav';
import { RootStoreContext } from '../../store/RootStore';

const Profile = () => {
    const store = useContext(RootStoreContext);

    return (
        <div>
            <Nav />
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#e8e7e3'}}>
                <h1>Favourites</h1>
            </div>
        </div>

    )
}

export default Profile;