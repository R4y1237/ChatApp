import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import tokensAndCookies from "../util/generateToken.js";

export const signup = async (req, res) => {
    try{
        const { fullName, username, password, confirm }= req.body;
        
        if(password !== confirm) {
            return res.status(400).json({error:"Passwords are different!"})
        }
        const user = await User.findOne({username});

        // check if username already exists
        if(user) {
            return res.status(400).json({error:"Username taken"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);


        //profile picture: https://avatar-placeholder.iran.liara.run/document
        
        const profilePic = `https://avatar.iran.liara.run/username?username=${fullName}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPass,
            profilePic
        })

        //if newUser is valid   
        if(newUser){
            tokensAndCookies(newUser._id, res);
            await newUser.save();           

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else{
            res.status(400).json({error: "Invalid User Data"});
        }

    } catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    try{
        const {username, password} = req.body
        // check if username exists
        const user = await User.findOne({username});
        //check if password matches
        if(user){
            const correctPassword = await bcrypt.compare(password, user.password);
            if(!correctPassword) {
                return res.status(400).json({error:"Invalid Username or Password"});
            }
        }
        else{
            return res.status(400).json({error:"Invalid Username or Password"});
        }
        
        
        tokensAndCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const logout =  (req, res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({message: "Logged out succesfully"})
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};