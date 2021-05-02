let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let todayDate = Date.parse(`${year}-${month}-${day}`) / 1000;

module.exports = todayDate;
