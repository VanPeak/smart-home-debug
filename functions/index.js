const functions = require('firebase-functions');
const syncHandler = require('./sync-handler');
const queryHandler = require('./query-handler');
const executeHandler = require('./execute-handler');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// TODO
// - How to handle a JSON parse error?

exports.homeAutomation = functions.https.onRequest((request, response) => {
  var headers = request.headers;
  var body = request.body;
    
  console.log(request.method, headers, body);

  if (!body.requestId ||
      !body.inputs ||
      !body.inputs.length == 1) {
    response.status(401).json({error: 'bad request'});
    return;
  }

  var intent = body.inputs[0].intent;
  console.log(intent);

  switch (intent) {
  case "action.devices.SYNC":
    syncHandler.sync(request, response);
    break;
  case "action.devices.QUERY":
    queryHandler.query(request, response);
    break;
  case "action.devices.EXECUTE":
    executeHandler.execute(request, response);
    break;
  default:
    response.status(401).json({error: 'bad intent'});
  }
});
