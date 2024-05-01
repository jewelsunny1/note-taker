const express= require('express');
const path= require('path'); //is this needed??
const fs =require('fs');
const uuid= require('./helpers/uuid');

const PORT= 3001;

const app= express();

//MIDDLEWARE//
//Allows parsse and gives req.body OBJECT
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//static file is public floor with ALL our front end files
app.use(express.static('public'));



//Based on the requirements, there needs to be two type of requests that need to be made: 
//GET:should read the db.json file and return all saved notes as JSON.and
//POST: should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//Remember that its ok to have the same rout for two diferrent kinds of request!

//access all the notes
app.get('api/notes', (req,res)=>{
    res.json(`${req.method} request received to get notes`);

    console.log(`${req.method} request received to get notes`);

});

//POST request to add/create a notes
app.post('api/notes', (req,res)=>{

});







app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
});
