var {secret}=require(path.join(process.cwd(),'./rebuild.json'))
const crypto=require('crypto')

function verify(req,res, next){
    var hmac = crypto.createHmac("sha1", secret);
    var calculatedSignature = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");
    console.log(req.headers["x-hub-signature"] === calculatedSignature); // Returns false
    console.log(req.headers["x-hub-signature"]) // => sha1=blablabla
    console.log(calculatedSignature) // => sha1=foofoofoo
    if(req.headers["x-hub-signature"] === calculatedSignature) next();
    else{
        res.json({
            err: 'Unable to verify secret token'
        })
    }
}

module.exports={
    verify
}