import { body, validationResult } from "express-validator";

export const jobFormValidator = async (req, res, next) => {
  const rules = [
    body("company_name").notEmpty().withMessage("Company name is required"),
    body("role").notEmpty().withMessage("Role is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("skills").notEmpty().withMessage("Skills is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("last_date").notEmpty().withMessage("last_date is required"),
  ];

  await Promise.all(rules.map((r) => r.run(req)));

  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).render("jobs/createNew", {
      errors: validationErrors.array(),
      userName: req.session.userName,
    });
  }

  next();
};
