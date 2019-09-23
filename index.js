//add dependencies of the project
const express = require('express');
const Joi = require('joi');
const app = express();

//treat objects as JSON objects
app.use(express.json());

const movies = [
    {id:1, name:'Scary Movie1', genre:'Scary'},
    {id:2, name:'Scary Movie2', genre:'Scary'},
    {id:3, name:'Scary Movie3', genre:'Scary'},
];

app.post('/api/genres', (req, res) =>{
    //Validate user input
    const {error } = movieValidate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //if valid assign id, genre, and name 
    const movie ={
        id: movies.length + 1,
        genre: req.body.genre,
        name: req.body.name
    }

    //add to array and display
    movies.push(movie);
    res.send(movie);
});

app.get('/api/genres/:id', (req,res) =>{
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send("Movie id could not be found in list of movies");
    res.send(movie);
})

app.put('/api/genres/:id', (req,res)=>{
    //Check that the id is in the array
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send("Movie id could not be found in list of movies");
    
    //Validate user input
    const { error } = movieValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    movie.genre = req.body.genre;
    movie.name  = req.body.name;
    res.send(movie);
});

app.delete('/api/genres/:id', (req,res) =>{
    const movie = movies.find(m => m.id ===parseInt(req.param.id));
    if(!movie) return res.status(404).send("Movie id could not be found in the list of movies");

    const index = movies.indexOf(movie)
    movies.splice(index, 1);

    res.send(movie);
});

function movieValidate(course){
    const schema = {
        genre: Joi.string().min(3).max(30).required(),
        name: Joi.string().min(3).max(30).required(),
    };
    return Joi.validate(course, schema);
}

//port
const port = process.env.port || 3000;

app.listen(port, () => console.log(`Port ${port} is listening...`));