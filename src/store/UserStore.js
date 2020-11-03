import { observable, action } from 'mobx';
import Cookie from 'js-cookie';
import Axios from 'axios';

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
    @observable movies = {};
    @observable test = 'test';
    @observable isLoading = false;
    @observable filter = '';
    @observable page = 1;
    @observable URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${this.page}`;
    @observable selectedMovieId = '';

    @action
    loginUser = (user) => {
        this.user._id = user._id;
        this.user.username = user.username;
        this.user.email = user.email;

        Cookie.set("user", JSON.stringify(this.user));
    }
    @action
    async getMovies(filter) {
        this.isLoading = true;
        // set the filter
        switch (filter) {
            case "top-rated":
                this.URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${this.page}`
                break;
            case "popular":
                console.log("Popular")
                this.URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${this.page}`;
                break;
            case "upcoming":
                this.URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${this.page}`
                break;
            case "random":
                let random = Math.floor(Math.floor((Math.random() * 10000) + 1))
                this.URL = `https://api.themoviedb.org/3/movie/${random}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
                break;
            case "details":
                let id = this.selectedMovieId;
                this.URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
                break;
            case "search":
                this.URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${this.filter}&page=1&include_adult=false`
                break;
            case '':
                this.URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${this.page}`
                break;
            default:
                console.log(filter)
                this.URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${this.filter}&page=1&include_adult=false`
                break;
        }

        // get the movies
            const movies = await Axios.get(this.URL);

            if(filter === 'random' || filter === 'details') {
                try {
                    await Promise.resolve(movies).then((res) => {
                    
                    this.movies = res.data;
                    this.isLoading = false;
                    })
                }
                catch(e){
                    await this.getMovies('random');
                }
            }
            else {
                await Promise.resolve(movies).then((res) => {
                    console.log("HERE")
                    console.log(this.filter);
                    console.log(res);
                    this.movies = res.data.results;
                    this.isLoading = false;
                })
            }
    }

    @action
    loadMoviesWithKeyword = async (filter) => {
        this.loadMoviesWithKeyword = true;
        this.searchedMovies = [];
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&query=${filter}&page=1&include_adult=false`

        await Axios.get(URL).then((res) => {
            console.log(res.data.results);
            this.searchedMovies.push(res.data.results);
            console.log("SEARCHED MOVIES DATA");
            console.log(this.searchedMovies[0]);
            this.loadingMoviesWithFilter = false;
        });
    }

    @action
    registerUser = (name,username,email,password) => {
        console.log(name, username, email, password);
    }
}

export default UserStore;