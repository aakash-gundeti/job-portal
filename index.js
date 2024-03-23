import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";

import HomeController from "./src/controllers/home.controller.js";
import JobController from "./src/controllers/job.controller.js";
import UserController from "./src/controllers/user.controller.js";
import { validateForm } from "./src/middleware/validateForm.middleware.js";
import fileUploadMiddleware from "./src/middleware/fileUpload.middleware.js";
import { jobFormValidator } from "./src/middleware/jobFormValidator.middleware.js";
import { auth } from "./src/middleware/auth.middleware.js";

const app = express();

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(urlencoded({ extended: true }));

const homeController = new HomeController();
const jobController = new JobController();
const userController = new UserController();

app.get("/", homeController.getHome);
app.get("/jobs-listing", jobController.getJobs);
app.get("/job-details/:id", jobController.getJobDetails);
app.get("/create-new-job", auth, jobController.getJobForm);
app.get("/delete-job/:id", auth, jobController.deleteJob);

app.get("/login", userController.getLogin);
app.get("/logout", userController.logoutUser);
app.get("/register", userController.getRegister);

app.post("/search", jobController.searchJob);
app.post(
  "/submit-details",
  fileUploadMiddleware.single("resume"),
  validateForm,
  jobController.postApplicantDetails,
);
app.post("/login", userController.loginUser);
app.post("/register", userController.addUser);
app.post("/create-new-job", jobFormValidator, jobController.createNew);
app.post("/update-job/:id", jobController.updateJob);

export default app;
