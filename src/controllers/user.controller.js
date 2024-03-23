import JobModel from "../models/job.model.js";
import UserModel from "../models/user.model.js";

const userModel = new UserModel();
const jobModel = new JobModel();

export default class UserController {
  getRegister = (req, res, next) => {
    return res.render("recruiter/register");
  };

  getLogin = (req, res, next) => {
    return res.render("recruiter/login", { errorMessage: null });
  };

  addUser = (req, res, next) => {
    let { name, email, password } = req.body;
    userModel.postUser({ name, email, password });

    return res.render("recruiter/login", { errorMessage: null });
  };

  loginUser = (req, res, next) => {
    let { email, password } = req.body;
    let result = userModel.authenticateUser({ email, password });

    console.log("login", result);
    if (result) {
      req.session.userName = result.name;
      return res.render("jobs/job-listing", {
        message: null,
        jobs: jobModel.getAllJobs(),
        userName: req.session.userName,
      });
    }

    res.render("recruiter/login", {
      errorMessage: "Something went rong please check the credentials!",
    });
  };

  logoutUser = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        delete req.session;
        res.redirect("/login");
      }
    });
    res.clearCookie("userName");
  };
}
