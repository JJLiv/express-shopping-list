const items = require("./fakeDB");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    
    items.push(this);
  }


  static findAll(){
    return items
  }

  static find(name) {
    const item = items.find(i => i.name === name);
    if(item === undefined){
      throw { message: "Item Not Found", status: 404 }
    }
    return item
  }


  static edit(name, data) {
    let item = Item.find(name);
    if (item === undefined) {
      throw {message: "Item Not Found", status: 404}
    }
    item.name = data.name;
    item.price = data.price;

    return item;
  }


  static remove(name) {
    let idx = items.findIndex(i => i.name === name);
    if (idx === -1) {
      throw {message: "Item Not Found", status: 404}
    }
    items.splice(idx, 1);
  }

}



module.exports = Item;