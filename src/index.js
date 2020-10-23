const sc = require('sourcecred').default
const fetch = require('node-fetch')
const dotenv = require('dotenv')
const { dbHandler } = require('./utilities/db')
const cron = require('node-cron')
require('./db/connection')

dotenv.config()

const NodeAddress = sc.core.address.makeAddressModule({
  name: 'NodeAddress',
  nonce: 'N',
  otherNonces: new Map().set('E', 'EdgeAddress'),
})

const mergeSort = array => {
  //Check if array can be split
  if(array.length < 2) return array;
  //Get Middle index
  const middle = Math.floor(array.length / 2);
  //Split Array In Two Sides
  const leftSide = array.slice(0, middle);
  const rightSide = array.slice(middle, array.length);
  //Use recusion to continue splitting
  return merge(mergeSort(leftSide), mergeSort(rightSide));
}

const merge = (left, right) => {
  //Create New Array
  const result = [];
  //Check if left array and right array is empty
  while(left.length && right.length) {
    //Find lower value
    if(left[0].cred[left[0].cred.length - 1] <= right[0].cred[right[0].cred.length - 1]) {
      //Add left value
      result.push(left.shift());
    } else {
      //Add right value
      result.push(right.shift());
    }
  }
  //Merge left array
  while(left.length) result.push(left.shift());
  //Merge right array
  while(right.length) result.push(right.shift());
  //return result array
  return result;
}

async function run() {
  const credAccounts = await(
    await fetch('https://raw.githubusercontent.com/1Hive/pollen/gh-pages/output/accounts.json')
  ).json()

  try {
    const accounts = mergeSort(credAccounts.accounts)
    let count = accounts.length - 1
    let top10 = []
    while(top10.length < 10) {
      --count
      if(accounts[count].account.identity.name === 'sourcecred') continue
      top10.push(accounts[count])
    }
    dbHandler(top10)
  } catch (err) {
    console.log('error:', err)
  }
}

run()

cron.schedule(process.env.CRON_SCHEDULER, function() {
  run()
  console.log('running every minute')
})
