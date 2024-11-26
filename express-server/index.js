const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the template engine
app.set("view engine", "ejs");

// Route to render ID cards
app.get("/id-cards", (req, res) => {
  // Read userinfo.json
  fs.readFile(path.join(__dirname, "userinfo.json"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading user data.");
    }

    const users = JSON.parse(data); // Parse JSON data
    res.render("id-card", { users }); // Pass users to the EJS template
  });
});

// Start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
