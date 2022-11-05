const {register,gToken} = require("../Services/user.service");

const genToken=async(req,res)=>{
  console.log("inside gentoken")
  try {
    const result=await gToken();
  console.log(result);
  res.json(result);
}catch (error) {
  res.status(409).json({
    message: "Failed to create Token",});
}
}

const postUser = async (req, res) => {
  try {
    const result = await register(req.body);
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};

module.exports = { postUser,genToken };
