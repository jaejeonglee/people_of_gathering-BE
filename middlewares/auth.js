const jwt = require("jsonwebtoken")
const User = require("../schemas/user")

module.exports = (req, res, next) => {
  
    const { authorization } = req.headers
    const [tokenType, tokenValue] = authorization.split(' ')

    if (tokenType !== "Bearer") {
        return res.status(401).send({
            errorMessage: '로그인 후 이용하세요.'
        })
    }

    try {
        const { userName } = jwt.verify(tokenValue, 'peopleofgethering-secret')
        User.find({ userName }).then(user => {
            res.locals.user = user
          
            next()   
        })
    } catch (error) {
        return res.status(401).json({
            errorMessage: '로그인 후 이용하세요.'
            
        })
     
    }
    
}