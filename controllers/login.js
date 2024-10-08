const loginService = require("../services/login");
const alert = require("alert");

function loginForm(req,res){   
  const username = req.session.username || 'Guest';
  const isAdmin = req.session.isAdmin || false;
  if(req.session.username){
        res.status(403).render('../views/error', { message: "את/ה כבר מחובר/ת" ,isAdmin,username});
  }
  else{
    res.render('../views/login',{username,isAdmin});
  }
}
async function login(req, res) {
    const { username, password } = req.body
  
    const result = await loginService.login(username, password)
    if (result != null) {
      if (!username) {
        res.status(403).render('../views/error', { message: "את/ה כבר מחובר/ת" ,isAdmin,username});
    }
      req.session.username = username
      req.session.isAdmin = await loginService.isAdmin(username)
      console.log(username + " logged-in")
      res.redirect('/products')
    }
    else
      res.redirect('/login')
  }

function registerForm(req,res){   
  const username = req.session.username || 'Guest';
  const isAdmin = req.session.isAdmin || false;
  if(req.session.username ){
    res.status(403).render('../views/error', { message: "את/ה כבר רשום/ה" ,isAdmin,username});
  }
  else{
    res.render('../views/register',{username,isAdmin});
  }
}
async function register(req, res) {
  const { username, password, phonenumber, address, isAdmin } = req.body
  const result = await loginService.register(username, password, phonenumber, address, isAdmin)
  if (result != null) {
    res.redirect('/login')
  }
  else{
    res.redirect('/register')
  }
}
function logout(req, res) {
  req.session.destroy();   
  res.redirect('/');
};

module.exports = {
    loginForm,
    login,
    registerForm,
    register,
    logout
}