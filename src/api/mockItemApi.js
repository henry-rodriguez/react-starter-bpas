import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const items = [
  {
    id: "1",
    title: "Item One",
  },
  {
    id: "2",
    title: "Item Two",
  },
  {
    id: "3",
    title: "Item Three",
  },
  {
    id: "4",
    title: "Item Four",
  },
  {
    id: "5",
    title: "Item Five",
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (item) => {
  return replaceAll(item.title, ' ', '-');
};

class ItemApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], items));
      }, delay);
    });
  }

  static saveItem(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (item.id) {
          const existingItemIndex = items.findIndex(a => a.id == item.id);
          items.splice(existingItemIndex, 1, item);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new items in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          item.id = generateId(item);
          items.push(item);
        }

        resolve(Object.assign({}, item));
      }, delay);
    });
  }

  static deleteItem(itemId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfitemToDelete = items.findIndex(item => {
          item.itemId == itemId;
        });
        items.splice(indexOfitemToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ItemApi;
