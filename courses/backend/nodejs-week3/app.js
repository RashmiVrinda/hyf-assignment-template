import "dotenv/config";
import express from "express";
import snippetsRouter from "./api/src/routers/snippets.js";
import tagsRouter from "./api/src/routers/tags.js";
import usersRouter from "./api/src/routers/users.js";; // 2. Import your new users router
const app = express();
app.use(express.json());

app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/users", usersRouter);

app.use("/api/snippets", snippetsRouter);
app.get("/", (req, res) => {
  res.send("This is a search engine");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
