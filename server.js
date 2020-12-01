const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json());

var global = [];

app.get('/tasks', (req, res) => {
  res.json(global)
})

app.post('/tasks', (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const finish = req.body.finish;

    if(name && date && finish){
        global.push(req.body);
        res.json(global);
    }else{
        res.send('Une erreur est survenue');
    }

})

app.get('/tasks/:uid(\\d+)', (req, res) => {
    global[req.params.uid - 1] ? res.json(global[req.params.uid - 1]) : res.send('Une erreur est survenue');
})

app.put('/tasks/:uid(\\d+)', (req, res) => {
    if(global[req.params.uid - 1] && req.body.name && req.body.date && req.body.finish){
        global[req.params.uid - 1] = req.body;
        res.json(global[req.params.uid - 1]);
    }else{
        res.send('Une erreur est survenue');
    }
})

app.delete('/tasks/:uid(\\d+)', (req, res) => {
    if(global[req.params.uid - 1]){
        global.splice(req.params.uid - 1, 1);
        res.json(global);
    }else{
        res.send('Une erreur est survenue');
    }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})