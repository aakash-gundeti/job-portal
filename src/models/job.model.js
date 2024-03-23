import { randomUUID } from "crypto";

export default class JobModel {
  jobs = [
    {
      id: 1,
      company_name: "Apple",
      role: "SDE",
      location: "Bangalore or Remote",
      skills: ["React", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
      salary: "14-20 lpa",
      last_date: new Date("2024-03-30"),
    },
    {
      id: 2,
      company_name: "Infosys",
      role: "React JS developer",
      location: "Mysore",
      skills: ["HTML", "CSS", "React", "NodeJs", "JS", "MongoDB"],
      salary: "10-15 lpa",
      last_date: new Date("2024-04-25"),
    },
    {
      id: 3,
      company_name: "Microsoft",
      role: "SDE II",
      location: "Hyderabad or Remote",
      skills: ["React", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
      salary: "20-30 lpa",
      last_date: new Date("2024-04-20"),
    },
    {
      id: 4,
      company_name: "Google",
      role: "SDE II",
      location: "Hyderabad or Remote",
      skills: ["React", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
      salary: "25-35 lpa",
      last_date: new Date("2024-03-31"),
    },
    {
      id: 5,
      company_name: "Accenture",
      role: "Application Developer",
      location: "Bangalore or Remote",
      skills: ["React", "NodeJs", "JS", "SQL", "MongoDB", "Express", "AWS"],
      salary: "10-14 lpa",
      last_date: new Date("2024-04-30"),
    },
  ];

  applicants = [];

  getAllJobs = () => {
    return this.jobs;
  };

  getJobDetail = (id) => {
    return this.jobs.find((j) => j.id == id);
  };

  postJob = (jobDetails) => {
    let { company_name, role, salary, location, skills, last_date } =
      jobDetails;
    this.jobs.push({
      company_name,
      role,
      salary,
      location,
      last_date: new Date(last_date),
      skills: jobDetails.skills.split(","),
      id: randomUUID(),
    });
  };

  postApplicants = (applicantDetails) => {
    this.applicants.push(applicantDetails);
  };

  getApplicants = () => {
    return this.applicants;
  };

  updateJob = (job) => {
    let { id, company_name, role, location, salary, skills, last_date } = job;
    const jobFound = this.jobs.find((j) => j.id == id);
    const index = this.jobs.findIndex((j) => j.id == id);

    this.jobs[index].company_name = company_name;
    this.jobs[index].role = role;
    this.jobs[index].location = location;
    this.jobs[index].salary = salary;
    this.jobs[index].skills = skills.split(",");
    this.jobs[index].last_date = new Date(last_date);

    return jobFound ? true : false;
  };

  deleteJob = (id) => {
    let index = this.jobs.findIndex((j) => j.id == id);
    if (!index) {
      return false;
    }
    this.jobs.splice(index, 1);
  };
}
