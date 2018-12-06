try{
    require('./rebuild.json')
} catch(e){
    throw e;
    process.exit(1)
}
const config=require('./rebuild.json')
start=require('./process.js').start
restart=require('./process.js').restart
startserver=require('./server').start
var pid=[], process=config.scripts

start(process,pid,startserver)

console.log(122323232,config);
