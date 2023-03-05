var Userdb = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate req
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty ketan",
    });
    return;
  }
  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in db

  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect('/add-user')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured ",
      });
    });
};

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`user not foun of id ${id} enter approprite id`})
            }else{
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({message:"error in id "})
        })

    }else{

  Userdb.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error occur while retriving" });
    });
};
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty ketan",
    });
    return;
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot find user of id ${id}. user not found` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error update user information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete id ${id}. ` });
      } else {
        res.send({
          message: "User deleted succesfully",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error delete user information" });
    });
};
