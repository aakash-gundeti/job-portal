import { body, validationResult } from "express-validator";

export const validateForm = async (req, res, next) => {
  const rules = [
    body("full_name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("contact").isNumeric().withMessage("Contact has to be a number"),
    body("contact")
      .isLength({ min: 0, max: 10 })
      .withMessage("Contact number has to be atleast 10 digits"),
    body("resume").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Resume is required");
      }
      return true;
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  next();
};
