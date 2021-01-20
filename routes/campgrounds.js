var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
var { isLoggedIn, checkCampgroundOwnership, checkCommentOwnership, isAdmin} = middleware;

//INDEX - show all campgrounds


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name; 
  var chineseName = req.body.chineseName;
  var category = req.body.category;
  var type = req.body.type;
  var price = req.body.price;
  var stars = req.body.stars;
  var mrtLine = req.body.mrtLine;
  var mrtStation = req.body.mrtStation;  
  var images = [];
  var reqBodyImages = [
	  { image: req.body.image1url, attributes: req.body.image1attributes}, 
	  { image: req.body.image2url, attributes: req.body.image2attributes},
  	  { image: req.body.image3url, attributes: req.body.image3attributes},
      { image: req.body.image4url, attributes: req.body.image4attributes},
      { image: req.body.image5url, attributes: req.body.image5attributes},
      { image: req.body.image6url, attributes: req.body.image6attributes},
      { image: req.body.image7url, attributes: req.body.image7attributes},
      { image: req.body.image8url, attributes: req.body.image8attributes},
      { image: req.body.image9url, attributes: req.body.image9attributes},
      { image: req.body.image10url, attributes: req.body.image10attributes},
      { image: req.body.image11url, attributes: req.body.image11attributes},
	  { image: req.body.image12url, attributes: req.body.image12attributes},
	  { image: req.body.image13url, attributes: req.body.image13attributes}, 
	  { image: req.body.image14url, attributes: req.body.image14attributes},
  	  { image: req.body.image15url, attributes: req.body.image15attributes},
      { image: req.body.image16url, attributes: req.body.image16attributes},
      { image: req.body.image17url, attributes: req.body.image17attributes},
      { image: req.body.image18url, attributes: req.body.image18attributes},
      { image: req.body.image19url, attributes: req.body.image19attributes},
      { image: req.body.image20url, attributes: req.body.image20attributes}
  ] 
	  for (i=0; i < reqBodyImages.length; i++){
			if(reqBodyImages[i].image.length > 0){
				images.push(reqBodyImages[i]);
			}
		};
  var indexImage = req.body.indexImage;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
		console.log(err);
      req.flash('error', 'Invalid address');	
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {name: name, chineseName: chineseName, category: category, type: type, stars: stars, mrtLine: mrtLine, mrtStation:mrtStation, images: images, price: price, indexImage: indexImage, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //direct to newly created campground show page            
            res.redirect("/places/" + newlyCreated._id);
        }
    });
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, middleware.isAdmin, function(req, res){
   res.render("places/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            console.log(err);
			req.flash('error', "Sorry, that campground does not exist!");
			return res.redirect('/places');
        } else {
            //render show template with that campground
            res.render("places/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, middleware.isAdmin, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("places/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, middleware.isAdmin, function(req, res){
  var images = [];
  var reqBodyImages = [
      { image: req.body.image1url, attributes: req.body.image1attributes}, 
  	  { image: req.body.image2url, attributes: req.body.image2attributes},
  	  { image: req.body.image3url, attributes: req.body.image3attributes},
      { image: req.body.image4url, attributes: req.body.image4attributes},
      { image: req.body.image5url, attributes: req.body.image5attributes},
      { image: req.body.image6url, attributes: req.body.image6attributes},
      { image: req.body.image7url, attributes: req.body.image7attributes},
      { image: req.body.image8url, attributes: req.body.image8attributes},
      { image: req.body.image9url, attributes: req.body.image9attributes},
      { image: req.body.image10url, attributes: req.body.image10attributes},
      { image: req.body.image11url, attributes: req.body.image11attributes},
      { image: req.body.image12url, attributes: req.body.image12attributes},
	  { image: req.body.image13url, attributes: req.body.image13attributes}, 
	  { image: req.body.image14url, attributes: req.body.image14attributes},
  	  { image: req.body.image15url, attributes: req.body.image15attributes},
      { image: req.body.image16url, attributes: req.body.image16attributes},
      { image: req.body.image17url, attributes: req.body.image17attributes},
      { image: req.body.image18url, attributes: req.body.image18attributes},
      { image: req.body.image19url, attributes: req.body.image19attributes},
      { image: req.body.image20url, attributes: req.body.image20attributes}
  ];   
  for (i=0; i < reqBodyImages.length; i++){
  if(reqBodyImages[i].image){
  	images.push(reqBodyImages[i]);
  } else {break};
  };
	console.log(reqBodyImages);
	console.log(images);
 
	geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newData = {name: req.body.name, chineseName: req.body.chineseName, type: req.body.type, category: req.body.category, location: location, lat: lat, lng: lng, mrtLine: req.body.mrtLine, mrtStation: req.body.mrtStation, price: req.body.price, stars: req.body.stars, description: req.body.description, indexImage: req.body.indexImage, images: images};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/places/" + campground._id);
        }
    });
  });
});


// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, middleware.isAdmin, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
		  req.flash("success","Successfully Deleted");
          res.redirect("/");
      }
   });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;