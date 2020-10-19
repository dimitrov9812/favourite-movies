import { observable } from 'mobx';
import { createContext } from 'react';
import LovedStore from './LovedStore';
import UserStore from './UserStore';

export default class RootStore {

    @observable lovedStore;
    @observable userStore;
    
    constructor() {
        this.lovedStore = new LovedStore();
        this.userStore = new UserStore();
    }
}

export const RootStoreContext = createContext(new RootStore());