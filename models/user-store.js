'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
  addUser(user, file, response) {
    if (file) {
      this.store.addToCloudinary(file).then((result) => {
        user.picture = result;
        this.store.addCollection(this.collection, user);
        response();
      }).catch((error) => {
        logger.error("Error uploading user picture:", error);
        response(error);
      });
    } else {
      this.store.addCollection(this.collection, user);
      response();
    }
  },

};

export default userStore;
