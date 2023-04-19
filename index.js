const express = require ("express");
const app = express();

app.use(express.json());

app.listen(8080, () =>{
    console.log("Servidor ativo na porta 8080");
})
let Tasks = [
{
  id:1,
  title: "Fazer API ",
  description: "Desenvolver API ate dia 21.04",
  completed: true
},
{
  id:2,
  title: "Estudar para a prova",
  description: "Revisar os slides e livros",
  completed: true
}]

//endpoint para listar as tarefas =)
app.get('/tasks', (req,res) =>{
  res.send(Tasks)
})


app.get('/tasks/:id', (req, res) => {
  const taskId = (req.params.id);
  const task = Tasks.find(t => t.id === taskId);
  if (task) {
    res.send(task);
  }
  else {
    res.json({ message: 'Tarefa não existe!!' });
  }
});

//POST /tasks: Cria uma nova tarefa na lista.
app.post('/tasks', (req, res) => {
  const task = req.body;
  if (!task.id || !task.title) {
    res.send('ID e Titulo é obrigatorio!!');
  } else {
    Tasks.push(task);
    res.json(task);
  }
});
 
