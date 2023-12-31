
const uniqid = () => {
    var id = Math.random().toString(16).slice(2)
    return id;
}


export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, inrediants) {
        const item = {
            id: uniqid(),
            count,
            unit,
            inrediants
        }
        this.items.push(item)
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}