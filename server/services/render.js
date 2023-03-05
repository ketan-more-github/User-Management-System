
const axios = require("axios");

exports.HomeRoute = (req, res) =>
{
    //get reqest to api
    axios.get('http://localhost:3000/api/users')
    .then(function(responce){
       
        res.render("index" , {users: responce.data});
    })
    .catch(err=>{
        res.send(err); 
    })
    
}
exports.AddUser = (req, res) =>
{
    res.render("add-user")
}

exports.UpdateUser = (req, res) =>
{

    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})

    .then(function(userdata){
       
        res.render("update_user" , {users: userdata.data})
    })
    .catch(err=>{
        res.send(err); 
    })
    
}