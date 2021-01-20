
// needs refactoring
// hide or show mrt stations

$(".Brownstations").hide();
$("#Brown").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".Brownstations").show(400);
    } else {
        $(".Brownstations").hide(400);
    }
});

$(".Redstations").hide();
$("#Red").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".Redstations").show(400);
    } else if($(this).is(':not(:checked)')){
        $(".Redstations").hide(400);
    }
});

$(".Greenstations").hide();
$("#Green").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".Greenstations").show(400);
    } else {
        $(".Greenstations").hide(400);
    }
});
$(".Orangestations").hide();
$("#Orange").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".Orangestations").show(400);
    } else {
        $(".Orangestations").hide(400);
    }
});
$(".Bluestations").hide();
$("#Blue").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".Bluestations").show(400);
    } else {
        $(".Bluestations").hide(400);
    }
});

// add class to faceted search so that when it is clicked and shown in mobile mode, there is a gray background
$(".facetedsearchbutton").click(function(){
	$(".facetedsearchnav").toggleClass("bg-light");
	})

// toggle "select an MRT Line to Show Stations"
$(".scrollBox").hide();
$(".mrtinfo").show();
$(document).ready(function(){
    var $checkboxes = $('.choice-mrtline input[type="checkbox"]');

    $checkboxes.change(function(){
        var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
        if(countCheckedCheckboxes === 0){
          $(".mrtinfo").show()
          $(".scrollBox").hide(400);
        }
    });
});

$('.choice-mrtline input[type="checkbox"]').each(function() {
  $(this).click(function(){
    if($(this).is(":checked")) {
        $(".mrtinfo").hide();
    };
  });
});

//clear all button
  $(".uncheckall").click(function(){
    $('input[type="checkbox"]').prop("checked", false);
    $('.stations').hide(400);
    $('.mrtinfo').show();
    $(".scrollBox").hide(400);
	$(".shownclass").hide(400);  
  });

//show which criterea has been checked at the top

$( "input:checkbox" ).click(function(){
	let classOfCheckbox = $(this).attr("value");
	let elementOfAdded = 
		"<div class='shownclass " + classOfCheckbox + "'><div>"  + classOfCheckbox + "<span class='ml-1'><button type='button' id='" + classOfCheckbox + "' class='btn btn-light close'><i class='fas fa-times-circle fa-sm'></i></button></span></div></div>";
	
		if($(this).is(":checked")){
		$(".checked").append( elementOfAdded );
	} else if ($(this).is(':not(:checked)')){
		$("." + classOfCheckbox).fadeOut("normal", function() {
			// $(this).remove();	
	});
	};
	});

// uncheck and remove once a person clicks the classOfCheckbox
$(document).on("click",".close",function() {
	let idOfCheckbox = ($(this).attr("id"));
	$(":checkbox[value=" + idOfCheckbox + "]").prop("checked",false);
	$("." + idOfCheckbox).hide(400);
	$("." + idOfCheckbox + "stations").fadeOut("normal", function() {
	$(".scrollbox" + "." + idOfCheckbox).hide();	
	var $checkboxes = $('.choice-mrtline input[type="checkbox"]');
    var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
        if(countCheckedCheckboxes === 0){
          $(".mrtinfo").show()
          $(".scrollBox").hide(400);
    };
});
});


//persist checkbox
var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {},
    $checkboxes = $(":checkbox");

$checkboxes.on("change", function(){
  $checkboxes.each(function(){
    checkboxValues[this.id] = this.checked;
  });

  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

// On page load--checkboxes and populate which items have been checked
// $.each(checkboxValues, function(key, value) {
//   $("#" + key).prop('checked', value);
// 	if(value === true){
// 		let elementOfAddedAtStart = 
// 		"<div class='shownclass " + key + "'><div>"  + key + "<span class='ml-1'><button type='button' id='" + key + "' class='btn btn-light close'><i class='fas fa-times-circle fa-sm'></i></button></span></div></div>";
// 		$(".checked").append( elementOfAddedAtStart );
// 	}
// });

//On page load--
//Check each checkbox and populate which items have been checked. 
//Count if any mrtLine colors have been checked ".choice-mrtLine", if any are checked ie. > 0, then show those mrtStations. Also show .scrollbox


$(document).ready(function () {
  $.each(checkboxValues, function(key, value) {
  $("#" + key).prop('checked', value);
	if(value === true){
		let elementOfAddedAtStart = 
		"<div class='shownclass " + key + "'><div>"  + key + "<span class='ml-1'><button type='button' id='" + key + "' class='btn btn-light close'><i class='fas fa-times-circle fa-sm'></i></button></span></div></div>";
		$(".checked").append( elementOfAddedAtStart );	
		$("." + key + "stations").show(400);
	}
});	
});

console.log(checkboxValues);


$(document).ready(function(){
	var $$checkboxes = $('.choice-mrtline input[type="checkbox"]');
        var countCheckedCheckboxes = $$checkboxes.filter(':checked').length;
        if(countCheckedCheckboxes > 0){
          $(".mrtinfo").hide()
          $(".scrollBox").show();
        }
    });



	
	
	
	
	
	
	
	
	
