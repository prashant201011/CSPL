const adminModel = require("../model/registration");
const bcrypt = require("bcrypt");
const validRoles = ["buyer", "seller", "buyerCompany", "employee"];

exports.postData = async (req, res, next) => {
  try {
    const name = req.body.name;
    const mobileNo = req.body.mobileNo;
    const pinCode = req.body.pinCode;
    const email = req.body.email;
    const pan = req.body.pan;
    const tan = req.body.tan;
    const address = req.body.address;
    const role = req.body.role;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error:
          "Invalid role. Allowed roles are buyer, seller, buyerCompany, and employee.",
      });
    }

    const existingEmail = await adminModel.find({ email: email });

    if (existingEmail) {
      return res.status(400).json("this email is already registered");
    }

    const modelSave = await new adminModel({
      name,
      mobileNo,
      pinCode,
      email,
      pan,
      tan,
      address,
      role,
      password: hashedPassword,
    });
    await modelSave.save();
    res
      .status(200)
      .json(
        `the user have been created with ${email} having the role of ${role}`
      );
  } catch (err) {
    res.status(400).json("user was not stored due to some error");
  }
};

exports.getData = (req, res, next) => {
  adminModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.changePassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const newpassword = req.body.newpassword;
    const curPassword = req.body.curPassword;

    const ExistUser = await adminModel.findOne({ email: email });

    if (!ExistUser) {
      return res
        .status(404)
        .json("email ID not found , kindly enter the correct email ID");
    }
    const validPassword = await bcrypt.compare(curPassword, ExistUser.password);
    if (!validPassword) {
      return res.status(404).json("please enter the valid current password");
    }
    const hashedNewPassword = await bcrypt.hash(newpassword, 10);

    ExistUser.password = hashedNewPassword;
    await ExistUser.save();

    res.json(`password has been updated`);
  } catch (err) {
    res.status(400).json("encountered with some error");
  }
};
