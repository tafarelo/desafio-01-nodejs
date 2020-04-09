const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  let newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(newRepository);
  response.status(201).json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const projectIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (projectIndex < 0) {
    response.status(404).json({err : "Projeto nao encontrado"})
  } else {
    const oldRepository = repositories[projectIndex];
    repositories[projectIndex] = {
      id,
      title,
      url,
      techs,
      likes: oldRepository.likes
    }
    response.status(200).json(repositories[projectIndex]);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (projectIndex < 0) {
    response.status(404).json({err : "Projeto nao encontrado"})
  } else {
    repositories.splice(projectIndex, 1);
    response.status(200).json("Usuario deletado");
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const projectIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (projectIndex < 0) {
    response.status(404).json({err : "Projeto nao encontrado"})
  } else {
    repositories[projectIndex].likes = repositories[projectIndex].likes+=1;
    response.status(200).json(repositories[projectIndex]);
  }
});

module.exports = app;
