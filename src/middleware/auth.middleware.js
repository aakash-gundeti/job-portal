export const auth = (req, res, next) => {
  // Write your code here
  if (req.session.userName) {
    next();
  } else {
    res.render("404", { message: "Login first to access secure page" });
  }
};
