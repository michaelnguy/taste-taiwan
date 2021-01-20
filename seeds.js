var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
// var faker = require('faker');
 


// var data = [
//     {
//         name: "Cloud's Rest",
// 		price: "$$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",		
//     },
//     {
//         name: "Din Tai Fung",
// 		price: "$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/04/24/10/23/pier-5086290__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
//     {
//         name: "Kao Chi",
// 		price: "",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/28/08/50/eastern-grey-kangaroo-5348449__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Dumplings",
// 		price: "",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/26/13/50/ladybug-5342823__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Mexican Food",
// 		price: "",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Cloud's Rest",
// 		price: "$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Taqueria",
// 		price: "$$$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/21/09/48/hill-5324149__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Revolver",
// 		price: "$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "7-11",
// 		price: "$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "F",
// 		price: "$$$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Cloud's Rest",
// 		price: "$$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     },
// 	{
//         name: "Cloud's Rest",
// 		price: "$",
// 		indexImage: "https://cdn.pixabay.com/photo/2020/06/02/07/51/luka-5249892__340.jpg",
// 		description: "Duis aute irure dolor in reprehenderit in voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
// 		Location: "2334 E. Tonto Pl., Chandler, AZ 85249",
// 		lat: "",
// 		lng: "",
//     }
// ]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a campground");
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        });
    }); 
}

// router.get('/generate-fake-data', function(req, res, next) {
//     for (var i = 0; i < 90; i++) {
//         var product = new Product()

//         product.category = faker.commerce.department()
//         product.name = faker.commerce.productName()
//         product.price = faker.commerce.price()
//         product.cover = faker.image.image()

//         product.save(function(err) {
//             if (err) throw err
//         })
//     }
//     res.redirect('/add-product')
// })	
	
// var data2 = []	
// function seedDB2(){
// 	for (var i = 0; i <39; i++){
// 		var campground = new Campground()
		
// 		campground.name = faker.company.companyName()
// 		campground.price = "$$$",
// 		campground.mrtLine = "orange"
		
// 		data2.push(campground);
// 	}
// 	data2.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
// 					};
// 				});
// 		});
// }	












	
module.exports = seedDB;





