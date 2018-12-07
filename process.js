child_process = require('child_process') 

function start(preProcesses, runScript){
    preProcesses.forEach(pr => {
        console.log("\n\x1b[33m",`executing \x1b[32m${pr}...`)
        process.stdout.write("\x1b[0m")
        process.stdout.write(child_process.execSync(pr).toString())
        // console.log("\x1b[33m", `******\n`)
    });

    return new Promise(function(resolve, reject){
        var first=true
        console.log("\n\x1b[33m",`RunScript: \x1b[32m${runScript}`)
        process.stdout.write("\x1b[0m")
        child=child_process.exec(`${runScript} & echo $!`, (err, stdout, stderr) => {  
            if (err) {
                console.error(err);
                return reject();
            }
            // console.log(stdout)
        });

        child.stdout.on('data', function(data) {
            if(first){
                console.log("\x1b[33m",'RunScript pid: \x1b[32m', data.toString())
                resolve(parseInt(data.toString()))
                first=false;
            }
            else process.stdout.write(data.toString()); 
        });

        child.stderr.on('data', function(data) {
            process.stdout.write(data.toString()); 
        });

        child.on('exit', function (code, signal) {
        });
    })
}

function restart(preProcesses,runScript,pid){
    console.log("\x1b[35m",'Restarting Processes...')
    console.log("\x1b[31m",'Killing pid \x1b[32m', pid)
    process.stdout.write(child_process.execSync(`kill ${pid}`).toString())
    return new Promise(async function(resolve, reject){
        pid=await start(preProcesses,runScript,pid)
        resolve(pid)
    })
}

module.exports={
    start, restart
}