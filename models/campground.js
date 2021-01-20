var mongoose = require("mongoose");





//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	chineseName: String,
	price: String,
	indexImage: String, 
	type: String,
	category: String,
	stars: String,
	images: [
		{
			image: String,
			attributes: String
		}],
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	mrtLine: String,
	mrtStation: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"			
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);