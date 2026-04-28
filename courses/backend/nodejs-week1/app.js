import express from "express";
import snippetRouter from "./api/src/routers/snippets.js";
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/snippets", snippetRouter);
app.get("/", (req, res) => {
  res.send("This is a search engine");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
