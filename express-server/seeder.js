const user = require('./seed/user.seed');
const equipment = require('./seed/equipment.seed');

async function dbseed() {
  await user();
  await equipment();
  console.log('data generate successfull');
}