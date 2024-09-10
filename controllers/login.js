const loginService = require("../services/login");

function loginForm(req,res){   
    res.render('../views/login',{});
}
async function login(req, res) {
    const { username, password } = req.body
  
    const result = await loginService.login(username, password)
    if (result != null) {
      req.session.username = username
      res.redirect('/')
    }
    else
      res.redirect('/login')
  }

function registerForm(req,res){   
    res.render('../views/register',{});
}
async function register(req, res) {
  if(!req.body.username || !req.body.password || !req.body.phonenumber || !req.body.address){
      res.status(400).send("חלק מהשדות ריקים, נסה שוב")
  }
  else{
    const { username, password, phonenumber, address, isAdmin } = req.body
    const result = await loginService.register(username, password, phonenumber, address, isAdmin)
    if (result != null) {
      req.session.username = username
      res.redirect('/login')
    }
    else{
      res.redirect('/register')
    }
   }
}


module.exports = {
    loginForm,
    login,
    registerForm,
    register
}