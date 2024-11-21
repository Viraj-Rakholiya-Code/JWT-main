const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/CheckToken");
exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      throw new Error("Fill all Fileds");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res
      .status(200)
      .json({ status: true, message: "User Create Succesfully.", data: user });
  } catch (error) {
    res.status(401).json({
      status: error.message,
      message: "Somethigs Was Worng",
    });
  }
};

exports.showData = async (req, res) => {
  try {
    const data = await userModel.find({});
    if (!data || data.length === 0) {
      throw new Error();
    }
    res.status(200).json({ status: true, message: "Sucess", data: data });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      message: "Data Not Found",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("Fill Username or Password");
    }

    const user = await userModel.findOne({ username: username });
    if (!user) {
      throw new Error("Invalid Username or Password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user._id,
        username: user.username,
      };

      const token = jwt.sign(payload, "Demo@123", { expiresIn: "1h" });

      res.status(200).json({
        status: true,
        message: "Login Successfully",
        token: token,
      });
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};
exports.dashboard = [
  verifyToken,
  (req, res) => {
    res.json({ Title: "Welcome to Dashboard ", User: req.user });
  },
];

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (!deleteUser) throw new Error();
    res.status(200).json({
      status: true,
      message: "User Deleted Succesfully",
      user: deleteUser,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      message: "User Not Found",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new Error("Fil all filds");
    const hashPassword = await bcrypt.hash(password, 10);
    const editUser = await userModel.findByIdAndUpdate(id, {
      username: username,
      password: hashPassword,
      email: email,
    });
    res.status(201).json({
      status: true,
      message: "Edit User Succesfully",
      data: editUser,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      message: "User Not Found",
    });
  }
};
