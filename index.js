const express = require ("express");
const app = express();

app.use(express.json());

app.listen(8080, () =>{
    console.log("Servidor ativo na porta 8080");
})
let Tasks = [
{
  id:"001",
  title: "Fazer API ",
  description: "Desenvolver API ate dia 21.04",
  completed: true
},
{
  id:"002",
  title: "Estudar para a prova",
  description: "Revisar os slides e livros",
  completed: true
}]

//GerarID
let createId = () => {
  let id = '';
  for(i=id.length; i<3; i++) {
    id += (Math.floor(Math.random()*9)).toString();
  }
  return id;
}

//VERIFICA ID PARA GERAR UM VALIDO E UNICO
let checkId = () => {
  let newId = createId();
  while (Tasks.find((t)=>t.id ===newId)){
    newId=checkId();
  }
  return newId;
}

//endpoint para listar as tarefas =)
app.get('/tasks', (req,res) =>{
  res.send(Tasks)
})

//GET /tasks: Cria uma nova tarefa na lista.
app.get('/tasks/:id', (req, res) => {
  const taskId = (req.params.id);
  const task = Tasks.find(t => t.id === taskId);
  if (task) {
    res.send(task);
  }
  else {
    res.status('404').json({ message: 'Tarefa não existe!!' });
  }
});

//POST /tasks: Cria uma nova tarefa na lista.
app.post('/tasks', (req, res) => {
  let idExist = Tasks.find((t) => t.id === req.body.id);
  if (!req.body.title) {
    res.status(404).send('INFORME UM TITULO PARA A TAREFA!!!');
    return
  }
  newTask = {
    id: checkId(),
    title:req.body.title,
    description: req.body.description,
    completed: req.body.completed || false
  }
  Tasks.push(newTask);
  res.send(`Tarefa numero ${newTask.id}:'${newTask.title}' criada`);
  
});
//PUT /tasks/:id 
