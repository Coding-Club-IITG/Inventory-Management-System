const jwt = require('jsonwebtoken');

function getTokenFromHeader() {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        token=  req.headers.authorization.split(' ')[1];
    }

    return null;
}

const authenticateToken = (req, res, next)=>{
    try {
        let token = null;
        if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
            token=  req.headers.authorization.split(' ')[1];
        };
        console.log("Middleware called");
        console.log(req.headers);
        if (token == null) return res.status(401).json({ result: "User not found" });
        else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(401).send(err);
                req.user = user;
                next();
            });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
}
module.exports = authenticateToken;