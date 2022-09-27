var { User } = require("../model/user");
const { hashing, hashCompare, createJWT } = require("../auth");

exports.findAll = async (req, res) => {
  try {
    let details = await User.findAll();
    res.send({
      statusCode: 200,
      users: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    let details = await User.findOne({ where: { user_id: req.params.id } });
    if (details) {
      res.send({
        statusCode: 200,
        user: details
      });
    } else {
      res.send({
        statusCode: 400,
        message: "No user found with the given user Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.findUserById = async (req,res)=>{
  try {
    let details = await User.findByPk(req.params.id);
    if (details) {
      res.send({
        statusCode: 200,
        user: details,
      });
    } else {
      res.send({
        statusCode: 400,
        message: "No user found with the given user Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}

exports.create = async (req, res) => {
  // console.log(req.body)

  try {
    const userid = await User.findOne({ where: { user_id: req.body.user_id } });
    if (userid) {
      res.send({
        statusCode: 400,
        message: "User Id already exists",
      });
      return;
    }
    const email = await User.findOne({ where: { email: req.body.email } });
    if (email) {
      res.send({
        statusCode: 400,
        message: "Email Id already exists",
      });
      return;
    }
    let hashedPassword = await hashing(req.body.password);
    req.body.password = hashedPassword;
    let details = await User.create(req.body);
    res.send({
      statusCode: 200,
      message: "Account Created",
      user: details,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    //console.log(req);
    const details = await User.findOne({
      where: { user_id: req.body.user_id },
    });

    if (!details) {
      res.send({
        statusCode: 400,
        message: "User Not found",
      });
    } else {
      let role = details.role;
      let user_id = details.user_id;
      //Compare the password entered by user and stored in the DB
      let compare = await hashCompare(req.body.password, details.password);
      if (compare == true) {
        //jwt token
        const token = await createJWT({ user_id: req.body.user_id });
        res.send({
          statusCode: 200,
          token,
          role,
          user_id,
          message: "Login Successfull",
        });
      } else {
        res.send({
          statusCode: 401,
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server error",
    });
  }
};

exports.updateUserWithId = async (req, res) => {

  try {
    let details = await User.update(req.body, { where : { id : req.params.id }})
    if(details[0] === 1){
      res.send({
        statusCode:200,
        details,
        message:"Changes Saved"
      })
    }else{
      res.send({
        statusCode:400,
        details,
        message:`Cannot update User with id=${req.params.id}. Maybe User was not found or req.body is empty!`
      })
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteUserWithId = async (req, res) => {
  try {
    let details = await User.destroy({ where: { id: req.params.id } });
    if (details === 1) {
      res.send({
        statusCode: 200,
        details,
        message: "User Deleted",
      });
    } else {
      res.send({
        statusCode: 400,
        details,
        message: `Cannot delete User with id=${req.params.id}. User may not be found!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
