const bcrypt=require('bcryptjs');
const client =require('../config/db');
const {generateToken}=require('../utils/utitlity');

const signup=async(req,res)=>{
    const {email, password, phone_number, role}=req.body;
    try{
        const result=await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if(result.rows.length>0){
            return res.status(400).json({message:'user already exist'});
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const userResult=await client.query(`
                INSERT INTO users (email, password, phone_number, role)
            VALUES ($1, $2, $3, $4) RETURNING *`,
             [email, hashedPassword, phone_number, role]
            );
        const user=userResult.rows[0];
        const token=generateToken(user);
        return res.status(201).json({message:'user created successfully',token});

    }catch(err){
        return res.status(500).json({message:'error creating user',error:err.message});
    }
}

const login=async(req,res)=>{
   
        const {email,password}=req.body;

    try{
        const result=await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user=result.rows[0];
        if(!user || !(await bcrypt.compare(password,user.password))){
                return res.status(401).json({message:'invalid credential'});
        }
        const token=generateToken(user);
        return res.status(200).json({message:'login successfull'},token);
    }catch(err){
        return res.status(500).json({message:'error loginin in',error:err.message});
    }
}
module.exports={signup,login};