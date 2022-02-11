const bcryptjs = require("bcryptjs");
const Auth = require("../models/auth");

const authAdmin = (req, res) => {
  try {
    const { username, password, rol } = req.body;
    const auth = new Auth({ username, password, rol });

    const salt = bcryptjs.genSaltSync();
    auth.password = bcryptjs.hashSync(password, salt);

    auth.save();

    res.json({
      auth,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ username });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    const validatePass = bcryptjs.compareSync(password, user.password);

    if (!validatePass) {
      return res.status(400).json({
        ok: false,
        msg: "Password Incorrect",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authAdmin,
  login,
};
