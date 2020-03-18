const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));

// Require Users routes
app.use("/api", require("./app/routes/users.routes.js"));

app.listen(3000, () => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});
