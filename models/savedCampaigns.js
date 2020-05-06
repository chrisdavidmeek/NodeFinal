const Campaign = require("./Campaign");
var arr = [];

exports.create = async function (key, title, desc) {
  arr[key] = new Campaign(key, title, desc); //refers to an individual campaign
  return arr[key];
};

exports.read = async function (key) {
  return arr[key];
};
exports.keylist = async function () {
  return Object.keys(arr); //refers to all campaigns in array
};

exports.count = async function () {
  return arr.length;
};
exports.close = async function () {};
