//Create a new video.js file
//Separate and offload the process of video compression to a child process, so that it does not block any other request on the server.
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
//Listening to the message in video.js
/*
process.on("message", (message)=> {
    console.log("Received:", message)
    setTimeout(()=>{
        process.send("Hello from child process");
        process.exit();
    }, 3000);
});*/

process.on("message", (payload) => {
const { tempFilePath, name } = payload;
const endProcess = (endPayload) => {
  const { statusCode, text } = endPayload;
  // Remove temp file
  fs.unlink(tempFilePath, (err) => {
    if (err) {
      process.send({ statusCode: 500, text: err.message });
    }
  });
  // Format response so it fits the api response
  process.send({ statusCode, text });
  // End process
  process.exit();
};
// Process video and send back the result
ffmpeg(tempFilePath)
  .fps(30)
  .addOptions(["-crf 28"])
  .on("end", () => { 
    endProcess({ statusCode: 200, text: "Success" });
  })
  .on("error", (err) => {
    endProcess({ statusCode: 500, text: err.message });
  }).save(`./temp/${name}`);
});
