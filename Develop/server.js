const express= require('express');
const path= require('path'); //is this needed??
const fs =require('fs');
const uuid= require('./helpers/uuid');

const PORT= process.env.PORT || 3001; //need to add process.env.PORT || for render deployment site to work correctly//
const app= express();

//MIDDLEWARE//
//Allows parsse and gives req.body OBJECT
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//static file is public floor with ALL our front end files
app.use(express.static('public'));

//Based on the requirements, there needs to be two type of requests that need to be made: 
//GET:
//POST: 
//Remember that its ok to have the same route for two diferrent types of request!

//access all the notes
app.get('/api/notes', (req,res)=>{
    res.json(`${req.method} request received to get notes`);

    console.log(`${req.method} request received to get notes`);
});
//POST request to add/create a notes
app.post('/api/notes', (req,res)=>{
    console.info(`${req.method} request received to add notes`);

    const{title, text}= req.body;

    if(title && text){
        const newNote={
            title,
            text,
            noteId: uuid(),

        };
        //now we want to readFile b/c we want to see the existing notes
        //remember that with readFile, you want to be sure to have where your reading, and how to handle (err, and date)
        //utf8 is OPTIONAL 
        //data is refering to what is being read from ./db/notes.json'
        //fs.readFile() reads files as **strings** by default. Hence why we need to parse it 
        fs.readFile('./db/notes.json', 'utf8',(err,data) => {
           if (err){
            console.log(err);
            res.status(500).json({error:`Error reading notes file`});
            return;//stop execution if ther is an error
           } 
            const parsedNotes = JSON.parse(data);//parsing the content of /db/notes.json
            parsedNotes.push(newNote);//since we are pushing here we know that **parsedNotes is an array** 
            //you add newNote object to the array of existing notes found in /db/notes.json
            //remem** write file takes in data as string
            //adding null, 2 to format!
            fs.writeFile('./db/notes.json',JSON.stringify(parsedNotes, null, 2),(err)=>{
                if(err){
                 console.log(err);
                 res.status(500).json({error: `Error writing to the notes file`})
                 return; // When error occurs during fs.writeFile operation, you handle it by sending an error resp and then
                 //use 'return' to exit the function!! Hense why we dont need else block after this if block!
                } 
                
                console.log('Sucessfully wrote/added a new note :)')
                const response= {//created a response obj here to provide a structure way to communicate the outcome of the req from server to client!
                    status: 'success',
                    body: newNote,
                };
                console.log(response);
                res.status(200).json(response);
            });
           
        });

       
    } else{ //this ELSE block is from the IF block that reads 'if(title && text)'
        res.status(500).json('Error in creating new note')
    }

});
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
});
