module.exports = function (req, res, next) {
	if (!req.session.isAuthenticated) {
		console.log("not login", res.locals);
	} else {
		console.log("login", req.session);
    
		next();
	}
};

