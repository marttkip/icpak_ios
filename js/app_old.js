//login & registration functions
var Login_service = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.register_member = function(form_data) {
		var request = url + "login/register_user";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.login_member = function(form_data) {
		var request = url + "login/login_member";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.edit_member_contact = function(form_data) {
		var request = url + "login/edit_member_contact";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.get_member_details = function(member_no){
    	var request = url + "login/get_member_information/" + member_no;
        return $.ajax({url: request});
    }
    this.getProfileDetails = function(applicationRefId1,memberRefId1,member_no) {
     
		var request = url + "login/get_client_profile/"+applicationRefId1+"/"+memberRefId1+"/"+member_no;
		return $.ajax({url: request});
		// return $.ajax({url: request, data: {applicationRefId: applicationRefId1, memberRefId: memberRefId1}, type: 'POST', processData: false,contentType: false});
		
   }

    this.get_event_user = function() {
		var request = url + "login/get_logged_in_member" ;
		// alert(url);
        return $.ajax({url: request});
    }
     this.post_cpd_query = function(form_data) {
		var request = url + "login/post_cpd_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.getEventsBookings = function(post_id,booking_refid) {
		var request = url + "events/get_accomodations" ;
        return $.ajax({url: url + "events/get_accomodations/"+post_id+ "/"+booking_refid});
    }
    this.getAccommodationAccount = function(booking_refid,accomodation_refid,post_id,hotel,fee,member_no) {
		var request = url + "events/getaccount" ;
		return $.ajax({url: request, data: {booking_refid: booking_refid,accomodation_refid: accomodation_refid,post_id: post_id, hotel: hotel, fee: fee, member_no: member_no}, type: 'POST', processData: false,contentType: false});
    }
    this.book_member = function(post_id,booking_refid,member_no,hotel,accomodation_refid,fee) {
    
		var request = url + "events/book_member_to_event";
		console.log({booking_refid: booking_refid, accomodation_refid: accomodation_refid, post_id: post_id, hotel: hotel, fee: fee, member_no: member_no});
		return $.ajax({url: request, data: {booking_refid: booking_refid, accomodation_refid: accomodation_refid, post_id: post_id, hotel: hotel, fee: fee, member_no: member_no}, type: 'POST'});
    }
    this.nonmemberbooking = function(form_data) {
    	// alert("sadada");
		var request = url + "events/book_non_member_to_event";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

}


/* Function to check for network connectivity */
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() 
{
    
    cordova.plugins.backgroundMode.setDefaults({ title:'ICPAK LIVE', text:'ICPAK LIVE', silent: true});
    
    //check if background action is enabled
    var enabled = cordova.plugins.backgroundMode.isEnabled();
    if(enabled === false)
    {
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
    }

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        
        //clear other timeouts
        //clearTimeout(all_message_timeout);
        //clearTimeout(single_message_timeout);
        
    };
    
    cordova.plugins.backgroundMode.onfailure = function(errorCode) {
        cordova.plugins.backgroundMode.configure({
                        text:errorCode
                    });        
    };
}

(function message_cheker() {
        
        $.ajax({
            url: base_url+'news/count_unread_news',
            cache:false,
            contentType: false,
            processData: false,
            dataType: 'json',
            statusCode: {
                302: function() {
                    //alert('302');
                }
            },
            success: function(data) 
            {
                var prev_total_news = parseInt(window.localStorage.getItem("total_news"));
                var total_received = parseInt(data.unread_messages);
                
                
                
                if(total_received > prev_total_news)
                {
                    // Modify the currently displayed notification
                    window.localStorage.setItem("total_news", total_received);
                    
                    set_news_data();
                    load_messages();
                    
                    //store received messages
                    var message_data = data.news;
                    
                    //calculate number of messages received
                    var difference = total_received - prev_total_news;
                    var count = 0;
                    $.each(message_data, function(idx, obj) 
                    {
                        count++;
                        if(count == 1)
                        {
                            var txt = 'news';
                        }
                        else
                        {
                            var txt = 'news';
                        }
                        $('#news_badge').html('<span style="font-size:10px; float:right; background-color:red;" class="img-rounded">'+count+'</span>');
                        
                        //display notification
                        cordova.plugins.backgroundMode.configure({title:'New message', text:'You have '+count+' new '+txt, silent: false});
                        var message_result = obj.result;//alert(message_result);
                       
                        //alert(obj.tagName);
                        
                        //check if chat history exists
                        var prev_msg = window.localStorage.getItem("news_history");
                        if(prev_msg == null)
                        {
                            var new_msg = message_result;
                        }
                        
                        else
                        {
                            var new_msg = prev_msg+message_result;
                        }
                        window.localStorage.setItem("news_history", new_msg);
                        
                        //if msg pop up is open
                        
                    });
                }
                
                else
                {
                    
                    //cordova.plugins.backgroundMode.configure({title:'New message', text:'new message', silent: true});
                    window.localStorage.setItem("total_news", total_received);
                }
            },
            complete: function() 
            {
                // setTimeout(message_cheker, 2000);
                
            }
        });
    })();


//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){

	var member_no = window.localStorage.getItem('member_no');

	if(member_no != null)	
	{
		$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
		$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
		$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
		$( ".user-nav ul li#my_account" ).css( "display", 'inline-block' );

		$( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a>' );
		$( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );

	}
	else
	{
		$("span[id=user_pass]").val("user");
		$( ".main-nav ul li#pro_social" ).css( "display", 'none' );
		$( ".main-nav ul li#profile" ).css( "display", 'none' );
		$( ".main-nav ul li#cpd_live" ).css( "display", 'none' );
		$( ".user-nav ul li#my_account" ).css( "display", 'none' );

	}
	
	
	// automatic_login();
});

function get_profile_details()
{
	
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	var applicationRefId1 = window.localStorage.getItem('applicationRefId');
    var memberRefId1 = window.localStorage.getItem('memberRefId');
    var member_no = window.localStorage.getItem('member_no');

    var profile_details = window.localStorage.getItem('profile_details');

    // please show if there is somethis to show

    if(profile_details == null)
    {
    	$( "#loader-wrapper" ).removeClass( "display_none" );
    }
    else
    {
	   $( "#my_profile" ).html( profile_details );

    }

	service.getProfileDetails(applicationRefId1,memberRefId1,member_no).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#my_profile" ).html( data.result );
			window.localStorage.setItem("profile_details",data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}

//automatic login
function automatic_login()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );

	
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get member's credentials
	var member_no = window.localStorage.getItem("member_no");
	var password = window.localStorage.getItem("member_password");
	
	service.login_member(member_no, password).done(function (employees) {
		var data = jQuery.parseJSON(employees);//alert(email+' '+password);
		
		if(data.message == "success")
		{
			//display login items
			$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
			$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
			$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
			// $( "#first_page" ).css( "display_none", 'inline-block' );
			// $( "#logged_in_page" ).css( "display", 'inline-block' );
			$( "#user_logged_in" ).html( '<h4>Welcome back Martin</h4>' );
			$( "#login_icon" ).html( '<a href="events.html" class="close-popup"><img src="images/icons/white/toogle.png" alt="" title="" onClick="get_event_items()"/><span>Events</span></a>' );
			$( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );
		}
		else
		{
			$("#response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
		}
		
		$( "#loader-wrapper" ).addClass( "display_none" );
	});
}

//Register member
$(document).on("submit","form#register_member",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#register_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.register_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("member_email", $("input[name=email]").val());
				window.localStorage.setItem("member_password", $("input[name=password]").val());
				window.localStorage.setItem("member_phone", $("input[name=phone]").val());
				window.localStorage.setItem("member_first_name", $("input[name=first_name]").val());
				window.localStorage.setItem("member_last_name", $("input[name=last_name]").val());
				window.localStorage.setItem("member_company", $("input[name=company]").val());
				window.localStorage.setItem("member_no", $("input[name=member_no]").val());
			}
			alert(data.result);
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#register_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

function HideModalPopup() 
{
 $("#ModalBehaviour").hide(); 
}

//Login member
$(document).on("submit","form#login_member",function(e)
{
	e.preventDefault();
	$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//get form values
	var form_data = new FormData(this);

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		// var member_no = $("input[name=member_no]").val();
		// var password = $("input[name=password]").val();
		// alert(form_data);
		service.login_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{


				window.localStorage.setItem("member_no", data['result']['member_id']);
				window.localStorage.setItem("member_login_status", data['result']['member_login_status']);
				window.localStorage.setItem("member_email", data['result']['member_email']);
				window.localStorage.setItem("member_first_name", data['result']['member_first_name']);
				window.localStorage.setItem("member_no", data['result']['member_id']);
				window.localStorage.setItem("memberRefId", data['result']['memberRefId']);
				window.localStorage.setItem("applicationRefId", data['result']['applicationRefId']);
				window.localStorage.setItem("member_code", data['result']['member_code']);

				var member_first_name = window.localStorage.getItem('member_first_name');


				$( "#user_logged_in" ).html( '<h4>Welcome back '+member_first_name+'</h4>' );
			    myApp.alert('Welcome back '+member_first_name+' Press OK to proceed');
				
				$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
				$( ".user-nav ul li#my_account" ).css( "display", 'inline-block' );
	

				// $( "#first_page" ).css( "display_none", 'inline-block' );
				// $( "#logged_in_page" ).css( "display", 'inline-block' );
				
				$( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a>' );
				$( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );

				$('.popup-login').removeClass('modal-in');
				$('.popup-login').css('display', 'none');
				$('.popup-overlay').removeClass('modal-overlay-visible');
				
				
			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

//get a logged in user's details
function get_event_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {


		var data = jQuery.parseJSON(employees);
		var first_name = data.member_first_name;
		var email = data.member_email;
		var member_id = data.member_id;
		var member_no = data.member_code;

		window.localStorage.setItem("member_id", member_id);
		window.localStorage.setItem("member_first_name", first_name);
		window.localStorage.setItem("member_email", email);
		window.localStorage.setItem("member_no", member_no);

		$( "#questionForm_email" ).val( email );
		$( "#questionForm_user" ).val( first_name );
		$( "#questionForm_id" ).val( member_id );
		$( "#app_user" ).html( first_name );
	});
}

//get a logged in user's details
function get_social_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var email = data.member_email;
		var member_id = data.member_id;
		
		$( "#social_member_email1" ).val( email );
		$( "#social_member_id1" ).val( member_id );
		
		$( "#social_member_email2" ).val( email );
		$( "#social_member_id2" ).val( member_id );
		
	});
}



//cpd forum query member
$(document).on("submit","form#cpd_query_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#cpdquery_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_cpd_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				$("#cpdquery_response").html('<div class="alert alert-success center-align">'+"Your question has been submited."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#cpdquery_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#cpdquery_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	// get_profile_details();
	return false;
});

function set_news_data()
{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		service.getallLatesNews().done(function (employees) {
		
		var data = jQuery.parseJSON(employees);
		
		window.localStorage.setItem("news_history", data.result);
		window.localStorage.setItem("total_news", data.total);
	});
}
function load_messages()
{
	var messages = window.localStorage.getItem("news_history");
	$("#icpak_news").html(messages);
}

function pass_data(phone,email,address1,applicationRefId)
{
	var myApp = new Framework7();
 
	var $$ = Dom7;

	myApp.popup('.popup-edit-contact');

	document.getElementById("email_address").value = email;
	document.getElementById("telephone1").value = phone;
	document.getElementById("address1").value = address1;
	document.getElementById("applicationRefId").value = applicationRefId;
}


//Login member
$(document).on("submit","form#edit_member",function(e)
{
	e.preventDefault();
	$("#edit_contact_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//get form values
	var form_data = new FormData(this);

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		service.edit_member_contact(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				myApp.alert('You have successfully made a change to your profile','Successful');
				get_profile_details();
				
				document.getElementById("email_address").value = '';
				document.getElementById("telephone1").value = '';
				document.getElementById("address1").value = '';

				$('.popup-edit-contact').removeClass('modal-in');
				$('.popup-edit-contact').css('display', 'none');
				$('.popup-overlay').removeClass('modal-overlay-visible');
			}
			else
			{
				$("#edit_contact_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

function get_accomodation_details(post_id,booking_refid)
{
	// $( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	
	service.getEventsBookings(post_id,booking_refid).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			
			// mainView.router.loadPage('booking.html');
			$( "#event_bookings" ).html(data.result );
			// $( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
	
}

function get_these_items(booking_refid,accomodation_refid,post_id,hotel,fee)
{
	var myApp = new Framework7();
 
	var $$ = Dom7;
	window.localStorage.setItem('booking_refid',booking_refid);
	window.localStorage.setItem('accomodation_refid',accomodation_refid);
	window.localStorage.setItem('post_id',post_id);
	window.localStorage.setItem('hotel',hotel);
	window.localStorage.setItem('fee',fee);
	myApp.modal({
    title:  'Booking Console',
    text: 'Choose the type of person you want to book the event!',
    buttons: [
      {
        text: 'Member',
        onClick: function() {
           var member_no = window.localStorage.getItem('member_no');
	        if(member_no == null)
	        {
	         	myApp.popup('.popup-login-admin');
	        }
	        else
	        {
	           var member_first_name = window.localStorage.getItem('member_first_name');

			   myApp.alert('Hello '+member_first_name+' Press OK to proceed');

			   book_member_to_event();

	        }
        }
      },
      {
        text: 'Non-Member',
        onClick: function() {
         mainView.router.loadPage('non_member_booking.html');
         $("#bookingRefId").val(booking_refid);
         $("#accomodationRefId").val(accomodation_refid);
         $("#post_id").val(post_id);
         $("#hotel").val(hotel);
         $("#fee").val(fee);
        }
      },
      {
        text: 'Cancel',
        onClick: function() {
        
        }
      },
    ]
  });
		
	
}
function book_member_to_event()
{
	 var member_no = window.localStorage.getItem('member_no');

	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	var member_no = window.localStorage.getItem('member_no');
	var booking_refid = window.localStorage.getItem('booking_refid');
	var accomodation_refid = window.localStorage.getItem('accomodation_refid');
	var post_id = window.localStorage.getItem('post_id');
	var hotel = window.localStorage.getItem('hotel');
	var fee = window.localStorage.getItem('fee');

	service.book_member(post_id,booking_refid,member_no,hotel,accomodation_refid,fee).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			
			mainView.router.loadPage('events.html');
			get_event_items();
			// do this here now 
			var member_email = window.localStorage.getItem('member_email');

			myApp.alert('You have successfully booked the event. An email has been sent to '+ member_email +' with an invoice');	
		}
		
		else
		{
			myApp.alert('Sorry something went wrong Please try again to book for the event');	
		}
	});
}

//Login member
$(document).on("submit","form#login_member_admin",function(e)
{
	e.preventDefault();
	$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//get form values
	var form_data = new FormData(this);

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		// var member_no = $("input[name=member_no]").val();
		// var password = $("input[name=password]").val();
		// alert(form_data);
		service.login_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{


				window.localStorage.setItem("member_no", data['result']['member_id']);
				window.localStorage.setItem("member_login_status", data['result']['member_login_status']);
				window.localStorage.setItem("member_email", data['result']['member_email']);
				window.localStorage.setItem("member_first_name", data['result']['member_first_name']);
				window.localStorage.setItem("member_no", data['result']['member_id']);
				window.localStorage.setItem("memberRefId", data['result']['memberRefId']);
				window.localStorage.setItem("applicationRefId", data['result']['applicationRefId']);
				window.localStorage.setItem("member_code", data['result']['member_code']);

				var member_first_name = window.localStorage.getItem('member_first_name');

				 myApp.alert('Welcome back '+member_first_name+' Press OK to continue');
				
				$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
				$( ".user-nav ul li#my_account" ).css( "display", 'inline-block' );
				
				
				$( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a>' );
				$( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );

				$('.popup-login-admin').removeClass('modal-in');
				$('.popup-login-admin').css('display', 'none');
				$('.popup-overlay').removeClass('modal-overlay-visible');

				// proceed to the next functionality
				book_member_to_event();
				
				
			}
			else
			{
				myApp.alert('Sorry something went wrong Please try again to login');
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//cpd forum query member
$(document).on("submit","form#nonmemberbooking",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		$( "#loader-wrapper" ).removeClass( "display_none" );
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.nonmemberbooking(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{

				//set local variables for future auto login
				mainView.router.loadPage('events.html');
			    get_event_items();
				myApp.alert('An email has been sent to your email with a profoma invoice.');
					
			}
			else
			{
				myApp.alert('Sorry,something went wrong please try again to book for the event');	
				
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		myApp.alert('No internet connection - please check your internet connection then try again');
	}
	// get_profile_details();
	return false;
});