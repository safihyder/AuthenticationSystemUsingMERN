const mongoose=require("mongoose")
const DB="mongodb+srv://alqaim0987:alqaim0987@cluster0.zfmlj4t.mongodb.net/Authusers?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB).then(()=> console.log("Database connected")).catch((err)=>console.log(err))