//framework -> by making framework , we don't have to right one type of code every time,we just make a framework
// having all type of facilities together in one piece of packet.we provide abstraction. ex push(), pop()

//middleware -> connects clients and backend system
//what is Express -> express is a nodejs framework.

//why Express -> Express.js basically helps you manage everything, from routes, to handling requests and views
//without express(plain nodejs)it will take many lines of code to do a task. 

//cookie-parser -> 

//body-parser -> extracts the entire body portion of an incoming request stream and exposes it on req.body
//You need to use bodyParser() if you want the form data to be available in req.body.
//It returns a function that acts as middleware. The function listens for req.on(‘data’) and constructs req.body from the chunks of data it gets.
//https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90

//express-validator -> for server-side data validation.
//express-validator why? -> you must care about server-side validation because data coming from other clients (single-page apps, regular web apps, mobile applications, etc.) cannot be trusted
//https://morioh.com/p/f559e6886d18/express-validator-tutorial

//ejs -> EJS is a tool to generate HTML markup with plain Javascript.

//mongoose -> 