const {verify}=require("jsonwebtoken")
const validation = (req,res,next)=>{
    const accessToken=req.header("accessToken");
    console.log(accessToken);
    if(!accessToken) return res.json({error:"User not logged in!"});
    else{
        try{
        const valid=verify(accessToken,"secretkey");
        if(valid) { req.user=valid; return next();  }
        else return res.json({error:"Wrong token!"});
        } 
        catch(err){
           return res.json({error:"Something went wrong. Try again later."});
        }
    }
};
module.exports={validation}; 