const express = require('express');
const app = express();

// app.use( (req, res, next) => {
//   console.log("Hi, I am 1st middleware");
//   return next();
//   console.log("This is after next")
// });

// app.use( (req, res, next) => {
//   console.log("Hi, I am the 2nd middleware");
//   next();
// });

//logger middleware
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});



app.get("/", (req, res) => {
  res.send("Hi, I am the root");
});


app.get("/random", (req, res) => {
  res.send("This is a random page");
});






app.listen(3000, () => {
  console.log('Server is running on port 3000');
});