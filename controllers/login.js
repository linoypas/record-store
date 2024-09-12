const loginService = require("../services/login");

function loginForm(req,res){   
  if(req.session.username){
    res.status(400).send("את/ה כבר מחובר/ת")
  }
  else{
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    res.render('../views/login',{username,isAdmin});
  }
}
async function login(req, res) {
    const { username, password } = req.body
  
    const result = await loginService.login(username, password)
    if (result != null) {
      if (!username) {
        return res.status(400).send('Username is required');
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
  if(req.session.username ){
    res.status(400).send("את/ה כבר רשום/ה")
  }
  else{
    const username = req.session.username || 'Guest';
    const isAdmin = req.session.isAdmin || false;
    res.render('../views/register',{username,isAdmin});
  }
}
async function register(req, res) {
  const { username, password, phonenumber, address, isAdmin } = req.body

  if(!username || !password || !phonenumber || !address){
    // alert("חלק מהשדות ריקים")
    console.log("חלק מהשדות ריקים")
    res.redirect('/register')
  }
  else{
    const result = await loginService.register(username, password, phonenumber, address, isAdmin)
    if (result != null) {
      res.redirect('/login')
    }
    else{
      res.redirect('/register')
    }
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