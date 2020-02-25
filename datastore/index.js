const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {

  counter.getNextUniqueId((err, current) => {
    if (err) {
      return console.log('An error has occurred');
    } else {
      var filePath = path.join(exports.dataDir, `${current}.txt`);
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          return console.log('Invalid operation');
        }
        return callback(null, { id: current, text: text });
      });
    }
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, fileData) => {
    if (err) {
      throw ('Error reading all files');
    } else {
      var files = _.map(fileData, (file) => {
        var replace = file.replace('.txt', '');
        return {id: replace, text: replace};
      });
      // fileData.map(file => {
      //   return {id, text};
      // });
      callback(null, files);
    }
  });
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var filePath = path.join(exports.dataDir, `${id}.txt`);
  //create our path to individual file
  //fs.readFile(path, callback
  //check error
  //if no error return callback
  fs.readFile(filePath, 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id: id, text: text});
    }
  });
  // var text = items[id];

};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
