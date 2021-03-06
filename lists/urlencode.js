/**
 * Returns the urlencoded version of the view value 
 *
 * @author Max Ogden
 */
function(head, req) {
  // Send the same Content-Type as CouchDB would
  if (req.headers.Accept.indexOf('application/json')!=-1)
    start({"headers":{"Content-Type" : "application/json"}});
  else
    start({"headers":{"Content-Type" : "text/plain"}});

  if ('callback' in req.query) send(req.query['callback'] + "(");

  var rows = []
  while (row = getRow()) {
    rows.push(row.value)
  }
  send(escape(JSON.stringify(rows)));
  
  if ('callback' in req.query) send(")");
};
