/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  // check if token exists
  // validate token (hashes header + payload + secret)

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        res.stauts(401).json({ message: "not verified"})
        console.log("VERIFY ERROR", error)
      } else { 
        // Valid token
        req.decodedToken = decodedToken
        
        next()
      }
    })



  } else {
    res.status(400).json({ message: "No token"})
  }


};