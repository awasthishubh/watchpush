try{
    require('./rebuild.json')
} catch(e){
    throw e;
}

const config=require('./rebuild.json')
var {start}=require('./process.js')

console.log(typeof(start))
var pid=0, preProcesses=config.preProcesses, runScript=config.runScript;
(async ()=>{
    pid=await start(preProcesses,runScript)
    startserver=require('./server').start(preProcesses,runScript,pid)
})()
