// implement your API here
const express = require("express");
const server = express();

//middleware: teaches express new things
server.use(express.json());

const Users = require("./data/db");

//routes or endpoints

//GET to "/"
server.get("/", function(req, res) {
  res.send({ hello: "Node API 1 Project!" });
});

//See a list of Users
server.get("/api/users", (req, res) => {
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
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(req, "request by id");

  Users.findById(id) //return a promise
    .then(user => {
      console.log(user, "user");
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json("The specified user could not be found.");
      }
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error getting the specified user."
      });
    });
});

//create a User
server.post("/api/users", (req, res) => {
  const userData = req.body;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errMsg: "Please provide a name and bio for the new user." });
  }
  Users.insert(userData)
    .then(user => {
      console.log(user);
      res.status(201).json(userData);
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
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(deleted => {
      // res.status(204).end(); one way of doing it without sending back a res
      if (!deleted) {
        res
          .status(404)
          .json({ errMsg: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ deleted });
      }
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
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ errMsg: "Please provide a user name and bio." });
  }
  Users.update(id, { name, bio })
    .then(updated => {
      if (updated) {
        Users.findById(id).then(user => {
          res.status(201).json(user);
        });
      } else {
        res
          .status(404)
          .json({ errMsg: `The user with id ${id} was not found.` });
      }
    })
    .catch(err => {
      console.log(err);
      //handle the error
      res.status(500).json({
        errMsg: "Sorry, we ran into an error updating the specified user."
      });
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
