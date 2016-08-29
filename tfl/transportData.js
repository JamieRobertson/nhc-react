/**
 * https://api.tfl.gov.uk/Line/victoria/Disruption?app_id=&app_key= 
 * You can use the /Line/ endpoint to retrieve all lines and their ids
 * https://api-portal.tfl.gov.uk/docs
 */

// Do this with superAgent instead
// const request 	= require('request');
const auth 		= require('./auth/tflAuth.js');


const app_id = auth.app_id;
const app_key = auth.app_key;

// const lineEndpoint = 'https://api.tfl.gov.uk/Line?app_id='+ app_id +'&app_key='+ app_key;

/* The following examples are for "now", the API also supports dates in the future, where known planned works are factored in to provide a future status.
 * Returns the current status of the tube lines - Includes status e.g "Good Service" and descriptive text. 
 */
const tubeStatus = 'https://api.tfl.gov.uk/line/mode/tube/status?app_id='+ app_id +'&app_key='+ app_key;



// Do this with superAgent instead

// request(lineEndpoint, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage.
//   } else {
//   	console.log(response.statusCode + '\n' + error);
//   }
// });

// console.log(app_key + '\n' + app_id);