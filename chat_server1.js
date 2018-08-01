const http = require('http');
const mime = require('mime-types');
const Assistant = require('./assistant');

const port = process.env.PORT || 5000;
let messages = [];

http.createServer(handleRequest).listen(port);
console.log("Listening on port " + port);

function handleRequest(request, response) {
  let assistant = new Assistant(request, response);
  let path = assistant.path;

  try {
    if (path === '/') {
      assistant.sendFile('index.html');

    } else if (path === '/chat') {
      console.log(assistant.request.method)
      if (request.method === 'GET') {
        console.log('Parsing the GET')
        mostRecentMessageAt = new Date().toISOString()
        
        console.log(mostRecentMessageAt)
        console.log(messages[0].when)
        let data = JSON.stringify(messages);
        let type = mime.lookup('json');
        assistant.finishResponse(type, data);
      } else {
        console.log('Parsing the POST');
        assistant.parsePostParams((params) => {
          let message = {
            name: "Anonymous",
            body: params.body,
            when: new Date().toISOString()
          }
          messages.push(message);
          let data = JSON.stringify(messages);
          let type = mime.lookup('json');
          assistant.finishResponse(type, data);
        })
      }
    } else {
      let fileName = path.slice(1);
      assistant.sendFile(fileName)
    }
  } catch (error) {
    assistant.sendError(404, "Error: " + error.toString());
  }
}

