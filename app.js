require('dotenv').config();


var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
	passport    = require("passport"),
	LocalStrategy = require("passport-local"),
	User          = require("./models/user"),
	methodOverride = require("method-override"),
	flash = require("connect-flash")
	

//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index"),
	expressSanitizer = require("express-sanitizer");

	
//seed Database
// seedDB();



mongoose.connect(process.env.DATABASEURLLOCAL, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set('useCreateIndex', true);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/places", campgroundRoutes);
app.use("/places/:id/comments", commentRoutes);


// app.listen(3000, function(){
// 	console.log("Server listening on port 3000");
// });
		
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});		
		
		
		
		
		