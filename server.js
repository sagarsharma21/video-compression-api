
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
    console.log(req.files.video);
    res.send("Success");
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
