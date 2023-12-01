const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(morgan('tiny'));
morgan.token('host', function(req, res) {
    return req.hostname;
    });
    app.use(morgan(' :method :host :status :res[content-length] - :response-time ms :res[body] '))
    
app.use(express.json())
 let persons =[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) =>{
    response.json(persons)
})

app.get("/info", (request, response) =>{
    const dateRequest = Date()
    response.send(`<div>Phonebook has info for ${persons.length} people </div>
                   </br>
                   <div>${dateRequest}</div>
    `)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    }
    else {
        response.status(404).end('4O4, person not found')
    }
    
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    console.log(persons)
    persons = persons.filter(person => person.id !== id)  
    response.json(persons)
})


function generateId(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
app.post("/api/persons", (request, response) => {
 
   console.log(request.body)
    let person = request.body
    if(person.name && person.number){
        pers = persons.find(per => per.name === person.name)
        if(pers){
            return response.status(400).json({error: "name must be unique"})
        }
        person.id = generateId(1, 10000)
        persons=persons.concat(person)
        response.json(person)
    }
    else {
        response.status(400).json({error: "name and number are obligatoire"})
    }
   

})

const PORT = product.env || 3001
app.listen(PORT, () => console.log("Server is running on port", PORT))