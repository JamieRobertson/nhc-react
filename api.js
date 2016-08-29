/**
 * Here is an API to serve updates on NHC twitter news and Transport news
 * 
 */

const mongoose = require('mongoose');

// Database variable outside of connection 
// https://devcenter.heroku.com/articles/mean-apps-restful-api
let db;