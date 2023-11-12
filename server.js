const { fork } = require("child_process");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

//Create an express application instance
const PORT = 5000;
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Add file upload middleware
app.use(
    fileupload({
        tempFIleDir: "temp",
        useTempFiles: true,
    })
);

//Routes
app.get("/", (req,res) => {
    res.send("Hello world!")
});

//Create a Post route
app.post("/compress-video", (req, res) => {
    const video = req.files.video;
    //When file is uploaded it is stored in temp
    //This is achieved by using express-fileupload
    const tempFilePath = video.tempFilePath;
    
    if(video && tempFilePath) {
        //Create a new child process
        const child = fork("video.js");
        //Send message to child process
        child.send(tempFilePath);
        //Listen for message from child process
        child.on("message", (message)=> {
            console.log("🚀 ~ file: server.js ~ line 37 ~ child.on ~ message", 
            message);
            res.send("Success");
        });
    } else {
        res.status(400).send("No file uploaded");
    }
    // console.log(req.files.video);
    // res.send("Success");
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
