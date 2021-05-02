const Users = require("../models/users");


module.exports = {
	signupPage(req, res) {
		res.render("signup", {

		})
	},
	signinPage(req, res) {
		res.render("signin", {

		})
	},
	async createAccount(req, res) {
		var { email, name, password, password2 } = req.body;
		if(password !== password2){
			return res.render("signup", {
				error: "Пароли не совпадают"
			})
		}
		try {
			var user = await Users.findOne({email});
			if(user) {
				res.render("signup", {
					error: "Пользователь уже существует!"
				})
			}
			else {
				const new_user = await Users.create({
					email,
					name,
					password
				})
				res.cookie("user_id", new_user._id);
				res.cookie("name", new_user.name);
				res.redirect("/");
			}
		}
		catch (e) {
			console.log(e);
		}
	},
	signout(req, res) {
		res.clearCookie("user_id");
		res.clearCookie("name");
		res.redirect("/");
	}

}