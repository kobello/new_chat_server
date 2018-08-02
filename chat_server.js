const http = require('http');
const mime = require('mime-types');
const Assistant = require('./assistant');
const House = require('./lib/house');
const port = process.env.PORT || 5000;
let messages = [];
let house = new House();

http.createServer(handleRequest).listen(port);
console.log("Listening on port " + port);

function handleRequest(request, response) {
  let url = require('url').parse(request.url);
  let path = url.pathname;
  let assistant = new Assistant(request, response);
  let [_, base, roomId] = path.split('/')[1]

  if (roomId = "") {
    roomId === 'general'
  }
  roomId = roomId || 'general'

  function sendMessages(messages) {
    let data = JSON.stringify(messages);
    let type = mime.lookup('json');
    assistant.finishResponse(type, data);
  }
  // function submitName(messages) {
  //   let data = JSON.stringify(messages);
  //   let type = mime.lookup('json');
  //   assistant.finishResponse(type, data)
  // }

  try {
    let data = JSON.stringify(messages);
    let type = mime.lookup('json');
    if (path === '/') {
      assistant.sendFile('index.html');

    } else if (path === '/chat') {
      console.log(request.method)

      if (request.method === 'GET') {
        let room = house.roomWithId(roomId)
        let messages = room.messagesSince(0)
        sendMessages(messages)

      } else {
        console.log('Parsing the POST');
        assistant.parsePostParams((params) => {
          let message = {
            body: params.body,
            when: new Date().toISOString()
          }
        
          messages.push(message);
          house.sendMessageToRoom(roomId, message);
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


// function handleRequest(request, response0 {
//   let url = require('url')
// })

        // console.log('Parsing the GET')
        // let data = JSON.stringify(messages);
        // let type = mime.lookup('json');
        // assistant.finishResponse(type, data);