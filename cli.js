#!/usr/bin/env node

path=require('path')
try{
    require(path.join(process.cwd(),'./rebuild.json'))
} catch(e){
    throw e;
}
const config=require(path.join(process.cwd(),'./rebuild.json'))
var {start}=require(path.join(__dirname,'./process.js'))

console.log(typeof(start))
var pid=0, preProcesses=config.preProcesses, runScript=config.runScript;
(async ()=>{
    pid=await start(preProcesses,runScript)
    startserver=require('./server').start(preProcesses,runScript,pid)
})()
