// create an express app
const express = require("express")
const path = require("path")
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()

// have some http status codes
let rawdata = fs.readFileSync('public/code.json');
let codeInfo = JSON.parse(rawdata);
codeInfo.type = x => codeInfo.core[x.toString()[0]-1] || 'not a HTTP status code'
codeInfo.display = c => `${c} ${c in codeInfo?codeInfo[c].short+": "+codeInfo[c].long:"not known"} (${codeInfo.type(c)})`

let requestCount=0

app.use(postlogger)
app.use(prelogger)

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')))

// getting up server responses
app.get("/", (req, res) => {
  res.send(`<h1>Don't look here</h1><h2>look <a href="/static">here</a></h2>`)
})

// define the info route
app.get('/info', (req,res)=> {
	if (req.query.code) {
	   res.json({"code":`${codeInfo.display(req.query.code)}`})
           res.status(req.query.code)
	} else if (req.query.all){
	   res.json(codeInfo)
        } else {
	   res.json({answer:42,data:req.query})
	}
})

app.get("/bit", (req, res) =>{
  let bit = req.query.code === undefined ? "404" : req.query.code
  res.send(doSomething(bit)); 
});

app.post("/bit",(req, res) =>{
  console.log(">>post ...",req.body,req.query);
  let bit = "code" in req.body? req.body.code: "101"  
  if (bit in codeInfo) res.sendStatus(401)
  else {
    let data = "data" in req.body? req.body.data: "nice weather"  
    addSomething(bit,data) 
    res.sendStatus(200)
  }
})

// start the server listening for requests
let listener = app.listen(process.env.PORT || 3000, 
	() => console.log(`Server is running...${listener.address().port}`))

// info loggers
function prelogger(req,res,next){
	console.log("before -",req.query,req.url,req.method)
	next()
}
function postlogger(req,res,next){
	next()
	const c = res.statusCode
	requestCount++
	console.log(`after ${requestCount} - ${codeInfo.display(c)}"`)
}

const doSomething = x => `<details><summary>${x} ${codeInfo[x].short}</summary>${codeInfo.display(x)}</details>`
const addSomething = (x,data) => {
	codeInfo[x]={short:"blank",long:data}
	console.log("add",x,data,codeInfo[x])
}
