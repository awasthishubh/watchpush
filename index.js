try{
    require('./rebuild.json')
} catch(e){
    throw e;
    process.exit(1)
}
const config=require('./rebuild.json')
({start,restart}=require('./process.js'))
startserver=require('./server').start
var pid=[], process=config.scripts
start(process,pid,startserver)
console.log(122323232,config);
