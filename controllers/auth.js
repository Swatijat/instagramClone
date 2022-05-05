
const User = mongoose.model("User")
const createUser = async(req,res)=>{
    const {name,email,password,pic} = req.body 
    try {
        if(!email || !password || !name){
            return res.status(422).json({error:"please add all the fields"})
         }
         User.findOne({email:email})
         .then((savedUser)=>{
             if(savedUser){
               return res.status(422).json({error:"user already exists with that email"})
             }
             bcrypt.hash(password,12)
             .then(hashedpassword=>{
                   const user = new User({
                       email,
                       password:hashedpassword,
                       name,
                      pic
                  })
          
                 const result = await user.save()
                 if(result)
                 {
    res.json({message:"saved successfully"})
                 }
                 
            })
           
        })
        .catch(err=>{
          console.log(err)
        })
    }
    catch(err)
    {
        console.log(err.message)
    }
    
}
