import jwt from 'jsonwebtoken'

//Create token and Cookie in signup
const tokensAndCookies  = (userId, res) => {
    //uses JWT_SECRET as a key
    //create token, lasts 15 days
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    // making it secure
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //Milliseconds
        httpOnly: true, //prevent cross-side scripting attacks
        sameSite:"strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development",
    })
};

export default tokensAndCookies