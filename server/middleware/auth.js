import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if(token===null) {
      return res.status(401).json({message:"login to do this"})
    }

    const isCustomAuth = token.length < 500;
    // google token is greater than 500
    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData.sub;
    }           

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"Server error"})
  }
};

export default auth;
