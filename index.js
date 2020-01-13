// implement your API here
const express = require("express");
const server = express();
//middleware: teaches express new things
server.use(express.json());

const Users = require("./data/db");

//routes or endpoints

//GET to "/"
server.get("/", function(req, res) {
  res.send({ hello: "William!" });
});

//See a list of Users
server.find("/api/users", (req, res) => {
  //read the data from the database (Hubs)
  Users.find() //return a promise
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error getting the list of users."
      });
    });
});

//See a list of Users by id
server.findById("/api/users/:id", (req, res) => {
  //read the data from the database (Hubs)
  Users.find() //return a promise
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error getting the list of users."
      });
    });
});

//create a User
server.insert("/api/users", (req, res) => {
  const userData = req.body;
  //NEVER trust the client! ALWAYS validate the data. For this demo we trust the data
  Users.add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error creating a new user."
      });
    });
});

//delete a User
server.remove("/api/users/:id", (req, res) => {
  const id = req.params.id;
  //NEVER trust the client! ALWAYS validate the data. For this demo we trust the data
  Users.remove(id)
    .then(deleted => {
      // res.status(204).end(); one way of doing it without sending back a res
      res.status(200).json(deleted);
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error deleting the specified user."
      });
    });
});

//update a User
server.update("/api/users/:id", (req, res) => {
  const id = req.params.id;
  //NEVER trust the client! ALWAYS validate the data. For this demo we trust the data
  Users.put(id)
    .then(updated => {
      // res.status(204).end(); one way of doing it without sending back a res
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error updating the specified user."
      });
    });
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
