import { observable } from 'mobx';
import bluebird from 'bluebird';

class Gist {
    @observable id;
    @observable name;
    @observable description;
    @observable matches;
    @observable image;
    @observable url;
    @observable username;

    constructor(data) {
        Object.assign(this, data);
    }
}

function getGists() {
    const gists = Array(10).fill(0).map((_,i) => getGist(i));
    return gists;
}

 function getGist(id) {
    return new Gist({
        id, 
        name: `Gist #${id}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        matches: '.*',
        image: `http://lorempizza.com/240/120/${id}`,
        url: 'http://example.com',
        username: 'rlemon'
    });
}

export default { 
    getGists,
    getGist
};