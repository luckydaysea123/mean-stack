const seeder = require('mongoose-seed');
const config = require('../config')
var ObjectID = require('mongodb').ObjectId;

const n = 20;
const items = [];

for (let index = 0; index < n; index++) {
  if (index < 5) {
    items.push({
      type: 0,
      name: 'Dell ' + index,
      desc: 'this is description',
      owner: ObjectID('5face641517b4f16b4b7eef3'),
      status: 1
    })
  } else {
    items.push({
      type: 0,
      name: 'Dell ' + index,
      desc: 'this is description',
    })
  }
}
let data = [{
  'model': 'Equipment',
  'documents': items
}]

// connect mongodb
seeder.connect(config.db_url, function () {
  seeder.loadModels([
    './model/equipment.model.js'  // load mongoose model 
  ]);
  seeder.clearModels(['Equipment'], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});