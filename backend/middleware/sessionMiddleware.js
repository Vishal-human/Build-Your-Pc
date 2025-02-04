// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = { isAuthenticated };

// //middleware to check if the admin is authenticated if the admin is login than he can access the dashboard
// function isAdminAuthenticated(req, res, next) {
//   if (req.session && req.session.admin) {
//     return next();
//   } else {
//     res.redirect('/admin/login');
//   }
// }
// 
// module.exports = { isAuthenticated, isAdminAuthenticated };



