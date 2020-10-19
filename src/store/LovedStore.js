import { observable, action } from 'mobx';
import Cookie from 'js-cookie';

const lovedItems = Cookie.getJSON("lovedItems") || [];

class LovedStore {
    rootStore;
    @observable loved = lovedItems;
    @observable totalQty = 0;
    @observable loading = false;

    @action
    addToLoved = async (id) => {
        console.log("adding to loved ones");
    }

    @action
    removeFromLoved = async (id) => {
        console.log("removing from loved ones");
    }

    @action 
    clearLoved = () => {
        console.log("clearing loved ones")
    }
}

export default LovedStore;