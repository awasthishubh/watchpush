# WatchPush
It is a package that ease the development process on IaaS. With this package you can automatically rebuild and restart your application as you push changes to your github repository.

## Install/Run
```python
npm install -g watchpush #installation
watchpull #run application
```
> **NOTE:** This package need to be installed globally

## Configuration
`watchpush.json` file is required in the root directory of your application
It contains following configurations:-
``` javascript
{
    "name": "Name of your project",
    "hook_port":4000, // Port at which webhook sends request
    "secret":"Secret token registered at github webhook",
    "preProcesses":[ // Processes that need to run before starting app
        "git pull",
        "install module"
    ],
    "runScript":"Final command that lifts/run/start your application"
}
```
Start your app by running `watchpull` command in cli at root directory of your application from where all the above commands need to run

#### Setup webhook
* You need to add a webhook in your repository setting to listen to push event
* Create a new webhook with following settings:
    * **Payload URL**: `YourHostAdd:hook_port` 
        * eg http://192.23.34.5:5000, if your machine's external ip address is 192.23.34.5 and 5000 is configured as hook_port in watchpush.json
    * **Content type:** `application/json`
    * **Secret:** Token that is configured in watchpush.json
    * Check ***Just the push event***. 

For more infromation refer: https://developer.github.com/webhooks/

#### Note
* hook_port is different from the port your app might be listening.
* Make sure hook_port configured in watchpush.json is publically accessible.
* Get request on `YourHostAdd:hook_port` should return 
    > Listening to push events on port *'hook_port'*
* Package currently support only **application/json**, so make sure same is configured on github webhook

## Examples
### For a node app
``` javascript
{
    "name": "Simple node project",
    "hook_port":4000,
    "secret":"qwerty",
    "preProcesses":[
        "git pull origin master",
        "npm install"
    ],
    "runScript":"node index.js"
}
```

### For a react app
``` javascript
{
    "name": "Simple react project",
    "hook_port":4000,
    "secret":"qwerty",
    "preProcesses":[
        "git pull origin master",
        "npm install",
        "npm run build"
    ],
    "runScript":"serve ./public"
}
```

### For a python app
``` javascript
{
    "name": "Simple python project",
    "hook_port":4000,
    "secret":"qwerty",
    "preProcesses":[
        "git pull origin master",
        "pip install -r requirements.txt"
    ],
    "runScript":"python app.py"
}
```
