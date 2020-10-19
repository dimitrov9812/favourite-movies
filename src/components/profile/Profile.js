import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../store/RootStore';

const Profile = () => {
    const store = useContext(RootStoreContext);

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
        </div>

    )
}

export default Profile;