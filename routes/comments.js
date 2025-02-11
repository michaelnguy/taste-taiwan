var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");




// Comments Routes
 router.get("/new", middleware.isLoggedIn, function(req, res){
	 //find campground by id and send out to /new
	 Campground.findById(req.params.id, function(err, campground){
		 if(err){
			 console.log(err);
		 } else {
			 res.render("comments/new", {campground: campground});
		 }
	 })
 });

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/places");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
			   req.flash("error", "Something went wrong");
               console.log(err);
           } else {
			   //add username and id to comment
			   comment.author.id = req.user._id;
			   comment.author.username = req.user.username;
			   //save comment
			   comment.save();			   
               campground.comments.push(comment);
               campground.save();
			   req.flash("success", "Successfully added comment");
               res.redirect('/places/'+campground._id);
           }
        });
       }
   });  
});

//EDIT A Comment
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			console.log(err);
			req.flash("error", "That comment does not exist");
			res.redirect("back");
		} else {			
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	})
});

//Comment update route
router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "Successfully edited comment");
			res.redirect("/places/" + req.params.id);
		}
	});
});

//destory comments route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted")
			res.redirect("/places/" + req.params.id);
		}
	});
});








module.exports = router;