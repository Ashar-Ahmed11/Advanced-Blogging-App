const express = require('express');
const app = express();  
const port = 5000;
var cors = require('cors')
const connectToMongo = require('./db'); // if this connects to MongoDB
connectToMongo();


app.use(express.json())
app.use(cors())

app.use("/api/settings", require("./routes/settings"))
app.use("/api/category", require("./routes/category"))
app.use("/api/post", require("./routes/post"))
app.use("/api/auth", require("./routes/auth"))

app.get('/', (req, res) => {
  res.send('Hello, Backend running!');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});