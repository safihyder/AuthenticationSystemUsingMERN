const express =require('express')
const app=express();
const cookieParser=require("cookie-parser")
const cors=require("cors")
require("./db/conn")
const router=require("./routes/router")
const port = 5000;
// app.get('/',(req,res)=>{
// res.status(200).json("Served Created");
// })
app.use(express.json())
app.use(cookieParser())

app.use(cors())
app.use(router)
app.listen(port,()=>{
    console.log(`The server started on the port no: ${port}`)
})
