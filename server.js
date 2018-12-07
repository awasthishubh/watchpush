const express=require('express')
const config=require(path.join(process.cwd(),'./rebuild.json'))
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
        res.send('Listening to push triggers on port ' + config.port)
    })

    app.listen(config.port, function(err){
        if(err){
            throw err;
        }
        else{
            console.log('\n\x1b[35mListening to push triggers on port \x1b[32m' + config.port+'\n')
        }
    })
}

module.exports={
    start
}