import JobModel from "../models/job.model.js";

const jobModel = new JobModel();

export default class JobController {
  getJobs = (req, res, next) => {
    res.render("jobs/job-listing", {
      message: null,
      jobs: jobModel.getAllJobs(),
      userName: req.session.userName,
    });
  };

  getJobDetails = (req, res, next) => {
    res.render("jobs/job-details", {
      job: jobModel.getJobDetail(req.params.id),
      userName: req.session.userName,
    });
  };

  postApplicantDetails = (req, res, next) => {
    jobModel.postApplicants({ ...req.body, resume: req.file.path });
    res.status(200).render("jobs/job-listing", {
      message: null,
      jobs: jobModel.getAllJobs(),
      userName: req.session.userName,
    });
  };

  getJobForm = (req, res, next) => {
    res.render("jobs/createNew", {
      errors: null,
      userName: req.session.userName,
    });
  };

  createNew = (req, res, next) => {
    jobModel.postJob(req.body);
    res.status(200).render("jobs/job-listing", {
      message: null,
      jobs: jobModel.getAllJobs(),
      userName: req.session.userName,
    });
  };

  updateJob = (req, res, next) => {
    let isUpdated = jobModel.updateJob(req.body);

    if (!isUpdated) {
      return res.status(400).render("404", {
        userName: req.session.userName,
        message: "Job Not found",
      });
    }
    res.status(200).render(`success-page`, {
      message: "Job updated Successfully",
      userName: req.session.userName,
    });
  };

  deleteJob = (req, res, next) => {
    let result = jobModel.deleteJob(req.params.id);
    if (!result) {
      return res.status(400).render("404", {
        userName: req.session.userName,
        message: "Job Not found",
      });
    }
    res.status(200).render("jobs/job-listing", {
      jobs: jobModel.getAllJobs(),
      userName: req.session.userName,
    });
  };

  searchJob = (req, res, next) => {
    const { name } = req.body;
    const jobs = jobModel.getAllJobs();

    const searchedResults = jobs.filter(
      (j) => j.company_name.toLowerCase() === name.toLowerCase(),
    );

    if (!searchedResults.length) {
      return res.render("jobs/job-listing", {
        jobs: false,
        errorMessage: "Oops! No jobs matching your search were found",
      });
    }

    res.render("jobs/job-listing", {
      jobs: searchedResults,
      errorMessage: null,
    });
  };

  getApplicants = (req, res, next) => {
    // to get applicants
  };
}
