const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('develop/public'))

let notes = [];

app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `/develop/public/index.html`)));

app.get(`/notes`, (req, res) => res.sendFile(path.join(__dirname, `/develop/public/notes.html`)));

app.get(`/api/notes`, (req, res) => res.json(notes));


app.post(`/api/notes`, (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    res.json(newNote);

})

app.delete(`/api/notes/:id`, (req, res) => {
    notes = notes.filter((note) => {
        return (req.params.id !== note.id)
    })
    res.json(notes);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));