//Create a new video.js file
//Separate and offload the process of video compression to a child process, so that it does not block any other request on the server.

//Listening to the message in video.js

process.on("message", (message)=> {
    console.log("Received:", message)
    setTimeout(()=>{
        process.send("Hello from child process");
        process.exit();
    }, 3000);
});