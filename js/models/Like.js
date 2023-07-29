export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, author, title, img) {
        let like = { id, author, title, img };
        this.likes.push(like)
        this.persistData
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.persistData
        this.likes.splice(index, 1);
    }

    islike(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    renderData(){
        const storage = JSON.parse(localStorage.getItem('likes'));

        if(storage)  this.likes = storage;
    }
 
}