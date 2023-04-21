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
},
{
  id:"003",
  title: "Ir para academia",
  description: "Treino de musculos superiores",
  completed: false
}]

//GerarID
let createId = () => {
  let id = '';
  for(i=id.length; i<3; i++) {
    id += (Math.floor(Math.random()*10)).toString();
  }
  return id;
}

//Verifica ID para gerar um valido e unico
let checkId = () => {
  let newId = createId();
  while (Tasks.find((t)=>t.id ===newId)){
    newId=checkId();
  }
  return newId;
}

//Endpoint para listar as tarefas =)
app.get('/tasks', (req,res) =>{
  res.send(Tasks)
})

//GET /tasks:id Retorna tarefa com Id correspondente
app.get('/tasks/:id', (req, res) => {
  const taskId = (req.params.id);
  const task = Tasks.find((t) => t.id === taskId);
  if (task) {
    res.send(task);
  }
  else {
    res.status('404').json({ message: 'Tarefa não existe!!' });
  }
});

//POST /tasks Cria uma nova tarefa na lista
app.post('/tasks', (req, res) => {
  let idVerification = Tasks.find((t) => t.id === req.body.id);
  if (!req.body.title) {
    res.status(404).send('Informe um titulo para a tarefa!!!');
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

//PUT /tasks/:id : Atualiza uma tarefa
app.put("/tasks/:id", (req,res) =>{
  const { id } = req.params;
  let idVerification = Tasks.find((t) => t.id === id);
  if(!idVerification){
    res.status(404).send ("ID de Tarefa inexistente! Informe um ID valido.");
    return
  }
  let taskFound = Tasks.findIndex((t) => t.id === req.body.id);
  Tasks[taskFound] = req.body;
  Tasks[taskFound].id = id;
  res.send(` A tarefa numero ${id} foi atualizada. `);
});

//DELETE /tasks/:id: Remove a tarefa com o ID correspondente.
app.delete("/tasks/:id", (req, res)=>{
  const { id } = req.params;
  let idVerification = Tasks.find((t) => t.id === id);
  if(!idVerification){
    res.status(404).send ("ID de Tarefa inexistente! Informe um ID valido.");
    return
  }
  let taskFound = Tasks.findIndex((t) => t.id === req.body.id);
  Tasks.splice(taskFound,1);
  res.send(`A tarefa ${id} foi deletada com sucesso.`);
})