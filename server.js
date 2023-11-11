
const express = require("express");
const cors = require("cors");

//Create an express application instance
const PORT = 5000;
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req,res) => {
    res.send("Hello world!")
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
