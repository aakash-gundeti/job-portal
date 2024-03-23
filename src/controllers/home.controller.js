export default class HomeController {
  getHome = (req, res, next) => {
    res.render("home", { userName: req.session.userName });
  };
}
