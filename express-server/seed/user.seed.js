const seeder = require('mongoose-seed');
const config = require('../config')
var ObjectID = require('mongodb').ObjectId;

const items = [
  {
    username: 'admin1',
    password: '$2a$10$YhEUPqwSwkfROq/QV.Tmye7woskN6z2cuGPdrLyanFSmstWZij6Ti',
    role: 0,
  },
  {
    username: 'admin2',
    password: '$2a$10$YhEUPqwSwkfROq/QV.Tmye7woskN6z2cuGPdrLyanFSmstWZij6Ti',
    role: 0,
  },
  {
    _id: ObjectID('5face641517b4f16b4b7eef3'),
    username: 'ddduong0',
    password: '$2a$10$YhEUPqwSwkfROq/QV.Tmye7woskN6z2cuGPdrLyanFSmstWZij6Ti',
  }
]
const n = 20;
for (let index = 1; index < n; index++) {
  items.push({
    username: 'ddduong' + index,
    password: '$2a$10$YhEUPqwSwkfROq/QV.Tmye7woskN6z2cuGPdrLyanFSmstWZij6Ti',
  })
}

let data = [{
  'model': 'User',
  'documents': items
}]

// connect mongodb
seeder.connect(config.db_url, function () {
  seeder.loadModels([
    './model/user.model.js'  // load mongoose model 
  ]);
  seeder.clearModels(['User'], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});