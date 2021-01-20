var express = require("express");
var router = express.Router();
var passport = require("passport");
var Campground = require("../models/campground");
var User = require("../models/user");
const {isLoggedIn, isNotVerified} = require("../middleware");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var async = require("async");
const sgMail = require('@sendgrid/mail');
var score = require("string_score");
var facetedSearchFunction = require("../public/scripts/facetedsearchlogic.js");
const querystring = require('querystring');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//route route

router.get("/", function(req, res){
	//pagination
    var perPage = 12;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
	//fuzzy search
    var noMatch = null;
    if(req.query.search) {
		var searchTerm = req.query.search.toLowerCase()
		if(searchTerm === "da an" || searchTerm === "da'an" || searchTerm === "daan") {
		   searchTerm = "da’an";
		};
        const regex = new RegExp(escapeRegex(searchTerm), 'gi');
        Campground.find({$or: [{name: regex,}, {chineseName: regex}, {location: regex}, {category:regex}, {mrtLine: regex}, {mrtStation:regex}]}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.count({$or: [{name: regex,}, {chineseName: regex}, {location: regex}, {category:regex}, {mrtLine: regex},{mrtStation:regex}]}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allCampgrounds.length < 1) {
                        noMatch = "No restaurants match that query, please try again.";
                    }
                    res.render("places/index", {
                        campgrounds: allCampgrounds,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search,
						facetedSearch: null,
						anchor: 'anchor',
                    });
                }
            });
        });
    } else {
		Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			var placesToSearchThrough = allCampgrounds;
			var matchingPlaces = [];
				//faceted search
				//req.query.type
				if (req.query.type) {	
					facetedSearchFunction.arrayOrSingleFilterType(req.query.type, placesToSearchThrough, .6, matchingPlaces);
				};
				//mrtLine. if type, filter through results of type filter, delete results of type filter, and push new results into matchingPlaces
				if (req.query.mrtLine) {
					if (req.query.type) {
						//make matching type places what to search through; then delete matching places contents to make a new matching places
						//array without duplicates
						var placesToSearchThrough = matchingPlaces;
						var matchingPlaces = [];
					};
					facetedSearchFunction.arrayOrSingleFilterLine(req.query.mrtLine, placesToSearchThrough, .3, matchingPlaces);
				};
				//mrtStation
				if (req.query.mrtStation) {
					//If query mrtLine or queryType, we filter through the results of the previous acts of filtering by making placesToSearchThrough
					// equal to matchingPlaces. Otherwise, placesToSearchThrough is equal to allCampgrounds.
					//then, we empty matchingPlaces immediately after so that we avoid duplicates
					if (req.query.mrtLine || req.query.type) {
						var placesToSearchThrough = matchingPlaces;
						var matchingPlaces = [];
					}
					facetedSearchFunction.arrayOrSingleFilterStations(req.query.mrtStation, placesToSearchThrough, .5, matchingPlaces);
				};
				//add logic for pagination here
				var count = matchingPlaces.length;				
				var skip = (perPage*pageNumber) - perPage;
				var end = (perPage*pageNumber);
				var shownPlaces = matchingPlaces.slice(skip, end);
				
				if (req.query.mrtStation || req.query.mrtLine || req.query.type) {
					//make an object for making a query string
					let facetedSearchUrl = {
						type: req.query.type,
						mrtLine: req.query.mrtLine,
						mrtStation: req.query.mrtStation
						};
					//remove attributes which are null or empty
					Object.keys(facetedSearchUrl).forEach((key) => (facetedSearchUrl[key] == null) && delete facetedSearchUrl[key]);
					//make the query string
					let facetedSearchQueryString = querystring.stringify(facetedSearchUrl);
					
					
					if(count < 1){
						noMatch = "No restaurants match that query, please try again.";
					}
					res.render('places/index', { 
												campgrounds: shownPlaces, 									
												current: pageNumber,
												pages: Math.ceil(count / perPage),
												noMatch: noMatch,
												search: false,
												facetedSearch: facetedSearchQueryString,
												anchor: 'anchor',
												});
				} else {
					//show all places
					var count = allCampgrounds.length;
					var shownPlaces = allCampgrounds.slice(skip,end);
                    res.render("places/index", {
                        campgrounds: shownPlaces,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: null,
						facetedSearch: null,
                        search: false,
						});
                    };
			};
			
		});
	};
});


		   
		   
		   
						
// show register form
router.get("/register", function(req, res){
	res.render("register", {page:"register"});
})

//handle sign up logic
router.post("/register", async function(req, res){
	var newUser = new User({
		username: req.body.username, 
		email: req.body.email, 
		emailToken: crypto.randomBytes(64).toString('hex'),
		isVerified: false
	
	});
	User.register(newUser, req.body.password, async function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		const msg = {
			from: "contact.tastetaiwan@gmail.com",
			to: user.email,
			subject: "Taste Taiwan - verify your email",
			text: `
				Hello, Thanks for registering on our site.
				Please copy and paste the address below to verify your account.
				http://${req.headers.host}/verify-email?token=${user.emailToken}
			`,
			html: `
				<p>Hello,</p>
				<p> Thanks for registering on our site. </p>
				<p> Please click the link below to verify your account. </p>
				<a href="http://${req.headers.host}/verify-email?token=${user.emailToken}">Verify your account</a>
			`
		}
		try {
			await sgMail.send(msg);
			req.flash("success", "Thanks for registering, please check your email to verify your account");
			res.redirect('/');
		} catch(error) {
			console.log(error);
			req.flash('error', "Something went wrong. Please contact contact.tastetaiwan@gmail.com");
		}
	});
});

//email verification router
router.get('/verify-email', async(req, res, next) => {
	try {
		const user = await User.findOne({emailToken: req.query.token});
		if (!user) {
			req.flash("error", "Token is invalid. Please contact admin for assistance.")
			return res.redirect("/places");
		}
		user.emailToken = null;
		user.isVerified = true;
		await user.save();
		await req.login(user, async (err) => {
			if (err) return next(err);
			req.flash('success', `Welcome to Taste Taiwan, ${user.username}.`);
			const redirectUrl = req.session.redirectTo || '/campgrounds';
			delete req.session.redirectTo;
			res.redirect(redirectUrl);
		});
	} catch (err) {
		console.log(err);
		req.flash('error', "Something went wrong. Please contact contact.tastetaiwan@gmail.com");
	}
});


router.get('/login', function(req, res) {
    res.render('login', {page: 'login'});
});


//login route
router.post("/login", isNotVerified, function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome back, " + req.body.username + "!"
    })(req, res);
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/");
});

//forgot password router
router.get('/forgot', function(req, res) {
  res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'contact.tastetaiwan@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'contact.tastetaiwan@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'contact.tastetaiwan@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'contact.tastetaiwan@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

//Get contact form router
router.get("/contact", (req, res) =>{
	res.render("contact", {page: 'contact'});
});

//Post contact and
//sanitize
router.post("/contact", async (req, res) => {
	let { name, email, message } = req.body;
	name = req.sanitize(name);
	email = req.sanitize(email);
	message = req.sanitize(message);
	
	const msg = {
	  to: 'contact.tastetaiwan@gmail.com',
	  from: "contact.tastetaiwan@gmail.com",
	  subject: 'Taste Taiwan Contact Form',
	  text: `${message} ${email} ${name}`,
	  html: `${message} ${email} ${name}`,
		};
	
  try {
    await sgMail.send(msg);
	req.flash("success", "Message sent");
	res.redirect("/")
  } catch (error) {
    console.error(error); 
    if (error.response) {
      console.error(error.response.body)
    }
	req.flash('error', "Sorry, something went wrong, please contact contact.tastetaiwan@gmail.com")
  }
});

//map route
router.get("/map", function(req, res){	
    // Get all campgrounds from DB
   	 Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("map",{campgrounds:allCampgrounds, page: "map"});
	   }
    });
});

router.get("/tips", function(req, res){
	res.render("about/tips");
});
router.get("/bestof", function(req, res){
	res.render("about/bestof");
});
router.get("/learnabouttaiwanesefood", function(req, res){
	res.render("about/learn");
});




function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;