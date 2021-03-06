const express=require('express')
const config=require(path.join(process.cwd(),'./watchpush.json'))
var restartPros=require('./process.js').restart
var auth=require('./policies').verify
var bodyParser = require('body-parser')

function start(preProcesses,runScript,pid){
    app=express();
    app.use(bodyParser.json())
    app.post('/',auth, async function(req,res){
        // console.log('Start script running on',pid);
        pid=await restartPros(preProcesses,runScript,pid);
        res.json('triggered')
    })

    app.get('/', function(req,res){
        res.send('Listening to push triggers on port ' + config.hook_port)
    })

    app.listen(config.hook_port, function(err){
        if(err){
            throw err;
        }
        else{
            console.log('\n\x1b[35mListening to push events on port \x1b[32m' + config.hook_port+'\n')
        }
    })
}

module.exports={
    start
}