import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import google from "google-auth-library";
import UserModal from "../models/user.js";

const { OAuth2Client } = google;
const client = new OAuth2Client(
  "201806743185-uip4k985s3a60cb00gd1jvlb9ocr8j9c.apps.googleusercontent.com"
);
const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    var decode = await client.verifyIdToken({
      idToken: token,
      audience:
        "201806743185-uip4k985s3a60cb00gd1jvlb9ocr8j9c.apps.googleusercontent.com",
    });

    if (decode.getPayload()  && decode.getPayload().email_verified) {
      const email = decode.getPayload().email;
      const name = decode.getPayload().name;

      var user = await UserModal.findOne({ email });

      if (!user) {
        user = await UserModal.create({ email, name });
      }
      const jwttoken = jwt.sign(
        { email: user.email, id: user._id },
        secret,
        { expiresIn: "1h" }
      );
      return res.json({ result: user, token: jwttoken });
    }
    // email not verifed
    return res.status(401).json({ message: "Email not verified you cannot login with google" })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
