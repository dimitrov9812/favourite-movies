import { observable, action } from 'mobx';
import Cookie from 'js-cookie';

const user = Cookie.getJSON("user") || {
    _id: '',
    username: '',
    email: '',
    favouriteMovies: ''
};

class UserStore {
    rootStore;
    @observable user = user;
    @observable loggedIn = false;

    @action
    loginUser = (user) => {
        this.user._id = user._id;
        this.user.username = user.username;
        this.user.email = user.email;

        Cookie.set("user", JSON.stringify(this.user));
    }

    @action
    registerUser = (name,username,email,password) => {
        console.log(name, username, email, password);
    }
}

export default UserStore;