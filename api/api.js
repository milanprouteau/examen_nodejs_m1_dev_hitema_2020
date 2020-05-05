const express = require("express");
const bodyParser = require("body-parser");

const PeopleService = require("./people-service");
const peopleService = new PeopleService();
const app = express();
const v1 = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", v1);

v1.put('/people/:id', async (request, response) => {
    const id = request.params.id;
    const object = request.body;

    const people = peopleService.updatePeople(id, object);

    if (people) {
        response.sendStatus(HttpStatus.OK);
    } else {
        response.sendStatus(HttpStatus.NOT_FOUND);
    }
});

v1.get('/people', async (request, response) => {
    const filter = request.query;
    filter ? response.send(peopleService.getPeople(filter)) : response.sendStatus(HttpStatus.NOT_FOUND);
});

module.exports = app;
