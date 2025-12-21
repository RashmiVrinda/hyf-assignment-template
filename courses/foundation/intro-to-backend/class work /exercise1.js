import express from "express";

const app = express();
const port = 3000;

const dateToday  =new Date();
let yearNow = dateToday.getFullYear();


app.get("/", (req, res) => {
  res.send("Hello from exercise 1!");
});

app.get("/currentYear", (req, res) => {
  // TODO: Implement this function to return a JSON object containing the current year
  res.send `Its $(yearNow) now 3`
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
