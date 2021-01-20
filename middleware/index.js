//all middleware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
const User = require("../models/user");

middlewareObj.checkCampgroundOwnership = function (req, res, next){
	if(req.isAuthenticated()){		
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			console.log(err);
			req.flash('error', 'Sorry, that campground does not exist!');
		   res.redirect("/campgrounds");
		   } else{ 
			   // does user own campground or is admin?
			   if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
			   		next();
		   		} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
		   }
		});				
	} else {
			req.flash("error", "You need to be logged in to do that");
			res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){		
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
		   console.log(err);
		   req.flash('error', "Sorry, that comment does not exist!");
		   res.redirect("/campgrounds");
		   } else { 
			   // does user own comment or is admin?
			   if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
			   		next();
		   		} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
		   }
		});				
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.isNotVerified = async function(req, res, next){
	try {
		const user = await User.findOne({ username: req.body.username});
		if (user.isVerified) {
			return next();
		}
		req.flash('error', 'Your account has not been verifed. Please check your email to verify your account')
		return res.redirect("/login");
	} catch(error) {
		console.log(error);
		req.flash('error', 'Something went wrong. Please contact us for assistance.');
		res.redirect('/login');
	}
}



middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
};

middlewareObj.isAdmin = function (req, res, next){
	if(req.user.isAdmin) {
		return next();		   		
	}	
	req.flash("error", "You don't have permission to do that");
	res.redirect("/campgrounds");
	
};




module.exports = middlewareObj 