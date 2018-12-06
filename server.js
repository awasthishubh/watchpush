const express=require('express')
const config=require('./rebuild.json')
var restart=require('./process.js').restart
var auth=require('./policies').verify

async function start(pid, prs){
    app=express();

    app.post('/', auth, function(req,res){
        console.log(pid, prs);
        ({pid,prs}=await restart(pid,prs));
        res.json('triggered')
    })

    app.get('/', function(req,res){
        res.send('Listening to push triggers on port ' + config.port)
    })

    app.listen(config.port, function(err){
        if(err){
            throw err;
        }
        else{
            console.log('Listening to push triggers on port ' + config.port)
        }
    })
}

module.export={
    start
}