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
          console.log('Invalid operation');
        }
        callback(null, { id: current, text: text });
      });
    }
  });
};

exports.readAll = (callback) => {
  return new Promise((resolve, reject) => {
    fs.readdir(exports.dataDir, (err, fileData) => {
      if (err) {
        reject(err, console.log('Error reading all files'));
      } else {
        var files = _.map(fileData, (file) => {
          var replace = file.replace('.txt', '');
          return { id: replace, text: replace };
        });
        // fileData.map(file => {
        //   return {id, text};
        // });
        resolve(files);
      }
    });
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
      callback(null, { id: id, text: text });
    }
  });
  // var text = items[id];

};

exports.update = (id, text, callback) => {
  // var oldText
  var filePath = path.join(exports.dataDir, `${id}.txt`);
  //create our path to individual file
  //fs.readFile(path, callback
  //check error
  //if no error return callback
  fs.readFile(filePath, 'utf8', (err, oldText) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(filePath, text, 'utf8', (err) => {
        if (err) {
          throw ('ERROR');
        } else {
          callback(null, { id: id, text: text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {

  //access specific id file path
  //if exists unlink it
  // check err
  //change counter to maintain current value
  // run callback
  var filePath = path.join(exports.dataDir, `${id}.txt`);

  fs.readFile(filePath, 'utf8', (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw ('ERROR');
        } else {
          callback();
        }
      });
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
