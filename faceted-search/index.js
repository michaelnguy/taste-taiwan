// needs refactoring
// hide or show mrt stations

$(".brownstations").hide();
$("#Brown").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".brownstations").show(400);
    } else {
        $(".brownstations").hide(400);
    }
});

$(".redstations").hide();
$("#Red").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".redstations").show(400);
    } else if($(this).is(':not(:checked)')){
        $(".redstations").hide(400);
    }
});

$(".greenstations").hide();
$("#Green").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".greenstations").show(400);
    } else {
        $(".greenstations").hide(400);
    }
});
$(".orangestations").hide();
$("#Orange").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".orangestations").show(400);
    } else {
        $(".orangestations").hide(400);
    }
});
$(".bluestations").hide();
$("#Blue").click(function() {
    if($(this).is(":checked")) {
        $(".scrollBox").show();
        $(".bluestations").show(400);
    } else {
        $(".bluestations").hide(400);
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

//show which criterea has been checked

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
	$("." + idOfCheckbox).fadeOut("normal", function() {
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
    $checkboxes = $("#checkbox-container :checkbox");

$checkboxes.on("change", function(){
  $checkboxes.each(function(){
    checkboxValues[this.id] = this.checked;
  });

  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

// On page load
$.each(checkboxValues, function(key, value) {
  $("#" + key).prop('checked', value);
});
