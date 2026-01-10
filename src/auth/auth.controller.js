const authService = require("./auth.service");

exports.signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    console.log("result", result.token, result.user);
    return res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
