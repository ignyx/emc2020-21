const http = require('http');
const exec = require('child_process').exec;

// Creates a webserver that calls the webhook.sh shellscript when called on /webhook
// Used to listen to github commit webhooks, for an auto-updating website
// You might want to block the port and forward it through a https gateway
// You might also want to authentify the Github request.

// Rate limiting
var lastUpdate = 0
const MIN_TIME_BETWEEN_REQ = 30000 // in ms
const PORT = 12347

http.createServer(function(req, res) {
  if (req.url == "/webhook" && Date.now() - lastUpdate > MIN_TIME_BETWEEN_REQ) {
    lastUpdate = Date.now();
    now = new Date();
    console.log("New call at " + new Date());
    exec('sh webhook.sh "build-' + now.getUTCFullYear() + "-" + now.getUTCMonth() + "-" + now.getUTCDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds() + '"',
      (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      });
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World!');
}).listen(PORT);
