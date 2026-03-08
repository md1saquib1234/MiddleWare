const express = require('express');
const app = express();
const ExpressError = require("./ExpressError");

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
// app.use((req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

// app.use("/random", (req, res, next) => {
//   console.log("I am only for random page");
//   next();
// });

const checkToken =  (req, res, next) => {
   let {token} = req.query;
    if(token === "giveaccess") {
      next();
    }
    throw new ExpressError(401, "Access Denied!");
};

// app.get("/err", (req, res) => {
//   abcd = abcd;
// });

app.get("/api" , checkToken, (req, res)=> {
  res.send("data");
});

app.get("/", (req, res) => {
  res.send("Hi, I am the root");
});


app.get("/random", (req, res) => {
  res.send("This is a random page");
});



app.get("/err", (req, res) => {
  abcd = abcd;
});

app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden");
});

app.use((err, req, res, next) => {
  let {status=500, message = "Some error occured"} = err;
  res.status(status).send(message);
});





//404 page
// app.use((req, res, next) => {
//   res.status(404).send("404! Page not found");
// });










app.listen(3000, () => {
  console.log('Server is running on port 3000');
});