// var mainView = myApp.addView('.view-main', {
//     // Enable dynamic Navbar
//     dynamicNavbar: false
// });
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
	
    this.login_member = function(form_data) {
		var request = url + "login/login_member";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
	
    this.login_member2 = function(username, password) {
		var request = url + "login/login_member";
		return $.ajax({url: request, data: {member_no: username, password: password}, type: 'POST'});
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
		var request = url + "events/book_non_member_to_event";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
	this.get_forum_items = function()
	{
		var request = url + "forum/get_blog_items" ;
		return $.ajax({url: request});
	}

    this.getBlogDetail = function(id, member_id) {
		var request = url + "forum/get_forum_comments" ;
        return $.ajax({url: url + "forum/get_forum_comments/" + id + "/" + member_id});
    }
	
    this.add_discussion = function(form_data) {
		var request = url + "forum/add_discussion";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
	
    this.add_comment = function(comment, post_id, member_id,member_first_name) {
		var request = url + "forum/add_comment" ;
        return $.ajax({url: request, data: {comment :comment, post_id: post_id, member_id: member_id,member_first_name: member_first_name}, type: 'POST'});
    }
	
    this.check_new_registration = function(to) {
  		var request = url + "login/register_application/"+to;
        return $.ajax({url: request});
    }
}

$$(document).on('navbarInit', function (e) {
  var navbar = e.detail.navbar;
  var page = e.detail.page;
});
/* Function to check for network connectivity */
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() 
{
    // cordova.plugins.backgroundMode.setDefaults({ title:'ICPAK LIVE', text:'ICPAK LIVE', silent: true});
    
    // //check if background action is enabled
    // var enabled = cordova.plugins.backgroundMode.isEnabled();
    // if(enabled === false)
    // {
    //     // Enable background mode
    //     cordova.plugins.backgroundMode.enable();
    // }

    // // Called when background mode has been activated
    // cordova.plugins.backgroundMode.onactivate = function () {
        
    //     //clear other timeouts
    //     //clearTimeout(all_message_timeout);
    //     //clearTimeout(single_message_timeout);
        
    // };
    
    // cordova.plugins.backgroundMode.onfailure = function(errorCode) {
    //     cordova.plugins.backgroundMode.configure({
    //                     text:errorCode
    //                 });        
    // };

    document.addEventListener("backbutton", onBackKeyDown, false);
	
	//push notifications
	var push = PushNotification.init({ "android": {"senderID": "540631623027"},
         "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );
	
    push.on('registration', function(data) {
        // data.registrationId
		//console.log(data.registrationId);
		//$("#gcm_id").html(data.registrationId);
		
		var service = new Login_service();
        service.initialize().done(function () {
            //console.log("Service initialized");
        });
        
        service.check_new_registration(data.registrationId).done(function (employees) {
            var data = jQuery.parseJSON(employees);
            
            console.log(data);
        });
    });

    push.on('notification', function(data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
		console.log(data.message);
		//myApp.alert(data.title+" Message: " +data.message, 'Choto');
    });

    push.on('error', function(e) {
        // e.message
		console.log(e.message);
		//myApp.alert(e.message, 'Error');
    });
}

function onBackKeyDown() {
    // Handle the back button
    mainView.router.back();
    mainView.router.refreshPage();
}

function onMenuKeyDown() {
    // Handle the back button
    alert('menu button');
}

$(document).ready(function()
{
	// window.localStorage.clear();
	// myApp.showIndicator();
	
	// setTimeout(function () 
	// {
	// 	var logged_in = window.localStorage.getItem("logged_in");
	// 	// var logged_in = 'yes';
	// 	//if user has logged in
	// 	if(logged_in == "yes")
	// 	{
			
	// 		// mainView.router.loadPage('events.html');
			
	// 		// mainView.showToolbar();
	// 	}
		
	// 	//user hasn't logged in. Open login page
	// 	else
	// 	{
	// 		// mainView.router.loadPage('login.html');
	
	// 		// mainView.router.loadPage('events.html');
	// 	}
	// 	myApp.hideIndicator();
		
		
	//  }, 1000);
    get_member_offers();
    get_event_items();
});
$(document).on("submit","form#edit_member",function(e)
{
    e.preventDefault();
    $("#edit_contact_response").html('').fadeIn( "slow");
    $("#loader-wrapper" ).removeClass( "display_none" );
    
    //get form values
    var form_data = new FormData(this);

    //check if there is a network connection
    var connection = true;//is_connected();
     myApp.showIndicator();
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
                //   var mainView = myApp.addView('.view-main');
                // mainView.router.loadPage('profile.html');
            }
            else
            {
                myApp.alert(''+data.result+'','Ooops');
                $("#edit_contact_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
            }
            
        });
    }
    
    else
    {
        
    }

    myApp.hideIndicator();
    return false;
});

//Login member
$(document).on("click","a.tool-button",function(e)
{
    // alert("sdagdhjag");
    e.preventDefault();
   
	var page_url = $(this).attr('href');
	mainView.router.loadPage(page_url);
});

//Login member
$(document).on("submit","form#login_member",function(e)
{
    e.preventDefault();
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
        service.login_member(form_data).done(function (employees) {
                var data = jQuery.parseJSON(employees);
                
                if(data.message == "success")
                {
                    window.localStorage.setItem("member_no", data['result']['member_id']);
                    // window.localStorage.setItem("member_no", data['result']['member_no']);
                    window.localStorage.setItem("member_id", data['result']['member_id']);
                    window.localStorage.setItem("logged_in", 'yes');
                    window.localStorage.setItem("member_email", data['result']['member_email']);
                    window.localStorage.setItem("member_first_name", data['result']['member_first_name']);
                    window.localStorage.setItem("memberRefId", data['result']['memberRefId']);
                    window.localStorage.setItem("applicationRefId", data['result']['applicationRefId']);
                    window.localStorage.setItem("member_code", data['result']['member_code']);
					
                    var member_first_name = window.localStorage.getItem('member_first_name');

                    myApp.alert('Welcome back '+member_first_name+' Press OK to proceed');
                    // location.reload()
                    /*mainView.showNavbar();
                    mainView.router.loadPage('profile.html');
                    mainView.showNavbar();*/
					
					myApp.showIndicator();
					
					// mainView.router.back();
                    var view_page = window.localStorage.getItem("view_page");
                    if(view_page == 1)
                    {
                      mainView.router.loadPage('chat.html');  
                    }
                    else if(view_page == 2)
                    {
                        mainView.router.loadPage('profile.html');  
                    }
					else
                    {
                        mainView.router.loadPage('recordings.html');  
                    }

                }
                else
                {
                     window.localStorage.setItem("logged_in", 'no');
                     myApp.alert(''+data.result+' Press OK to proceed');
                }
            });
    }
    
    else
    {
        myApp.alert('No internet connection - please check your internet connection then try again');
        
    }
    return false;
});

function login_member(username, password)
{
	if(username != '')
	{
		if(password != '')
		{
			//check if there is a network connection
			var connection = true;//is_connected();
			
			if(connection === true)
			{
				var service = new Login_service();
				service.initialize().done(function () {
					console.log("Service initialized");
				});
				service.login_member2(username, password).done(function (employees) {
						var data = jQuery.parseJSON(employees);
						
						if(data.message == "success")
						{
							window.localStorage.setItem("member_no", data['result']['member_id']);
							// window.localStorage.setItem("member_no", data['result']['member_no']);
							window.localStorage.setItem("member_id", data['result']['member_id']);
							window.localStorage.setItem("logged_in", 'yes');
							window.localStorage.setItem("member_email", data['result']['member_email']);
							window.localStorage.setItem("member_first_name", data['result']['member_first_name']);
							window.localStorage.setItem("memberRefId", data['result']['memberRefId']);
							window.localStorage.setItem("applicationRefId", data['result']['applicationRefId']);
							window.localStorage.setItem("member_code", data['result']['member_code']);
							
							var member_first_name = window.localStorage.getItem('member_first_name');
		
							myApp.alert('Welcome back '+member_first_name+' Press OK to proceed');
							// location.reload()
							/*mainView.showNavbar();
							mainView.router.loadPage('profile.html');
							mainView.showNavbar();*/
							
							myApp.showIndicator();
							
							// mainView.router.back();
							var view_page = window.localStorage.getItem("view_page");
                            if(view_page == 1)
                            {
                              mainView.router.loadPage('chat.html');  
                            }
                            else if(view_page == 2)
                            {
                                mainView.router.loadPage('profile.html');  
                            }
                            else
                            {
                                mainView.router.loadPage('recordings.html');  
                            }
		
						}
						else
						{
							 window.localStorage.setItem("logged_in", 'no');
							 myApp.alert(''+data.result+' Press OK to proceed');
						}
					});
			}
			
			else
			{
				myApp.alert('No internet connection - please check your internet connection then try again');
				myApp.modalLogin('Please log in to join the forum', 'Login', login_member);
			}
		}
		
		else
		{
			myApp.alert('Please enter your password to login', 'Error');	
			myApp.modalLogin('Please log in to join the forum', 'Login', login_member);
		}
	}
	
		
	else
	{
		myApp.alert('Please enter your username to login', 'Error');
		myApp.modalLogin('Please log in to join the forum', 'Login', login_member);	
	}
}

function reload_forums()
{
    var view_page = window.localStorage.getItem("view_page");
    mainView.router.loadPage('chat.html');  
}
function get_profile_details()
{
    
    var service = new Login_service();
    service.initialize().done(function () {
        console.log("Service initialized");
    });
    
    var applicationRefId1 = window.localStorage.getItem('applicationRefId');
    var memberRefId1 = window.localStorage.getItem('memberRefId');
    var member_no = window.localStorage.getItem('member_no');

    // var profile_details = window.localStorage.getItem('profile_details');

    // please show if there is somethis to show
    myApp.showIndicator();

    service.getProfileDetails(applicationRefId1,memberRefId1,member_no).done(function (employees) {
        var data = jQuery.parseJSON(employees);
        
        if(data.message == "success")
        {
            $( "#my_profile" ).html( data.result );
            $( "#cpd_hours" ).html( data.cpd_hours );
            $( "#cpd_questions" ).html( data.cpd_questions );

            window.localStorage.setItem("my_profile",data.result);
            window.localStorage.setItem("cpd_hours",data.cpd_hours);
            window.localStorage.setItem("cpd_questions",data.cpd_questions);
        }
        else
        {
            var my_profile = window.localStorage.getItem('my_profile');
            var cpd_hours = window.localStorage.getItem('cpd_hours');
            var cpd_questions = window.localStorage.getItem('cpd_questions');

            $( "#my_profile" ).html( my_profile );
            $( "#cpd_hours" ).html( cpd_hours );
            $( "#cpd_questions" ).html( cpd_questions );
        }
     
    });
    myApp.hideIndicator();   
    
}

$(document).on("submit","form#add_discussion",function(e)
{
    e.preventDefault();
    //get form values
    var form_data = new FormData(this);

    //check if there is a network connection
    var connection = true;//is_connected();
     myApp.showIndicator();
    if(connection === true)
    {
        var service = new Login_service();
        service.initialize().done(function () {
            console.log("Service initialized");
        });
        
        //get form values
        service.add_discussion(form_data).done(function (employees) {
            var data = jQuery.parseJSON(employees);
            
            if(data.message == "success")
            {
				myApp.hideIndicator();
				$("#discussion_title").val('');
				$("#discussion_content").val('');

                $('.popup-add-discussion').removeClass('modal-in');
                $('.popup-add-discussion').css('display', 'none');
                $('.popup-overlay').removeClass('modal-overlay-visible');

				refresh_forum_timer();
				refresh_forum_display();
                var web_service = new Login_service();
                web_service.initialize().done(function () {
                    console.log("Service initialized");
                });

                web_service.get_forum_items().done(function (employees)
                {
                    var data = jQuery.parseJSON(employees);
                    
                    if(data.message == "success")
                    {
                        $( "#all_forums" ).html( data.result );
                        window.localStorage.setItem("forum_list", data.result);
                        window.localStorage.setItem("total_forum", data.total_received);
                    }
                    
                    else
                    {
                        myApp.hideIndicator();
                        myApp.alert(data.result, 'Error');
                    }
                });
            }
            else
            {
                myApp.alert(''+data.result+'','Ooops');
            }
            
        });
    }
    
    else
    {
        
    }

    myApp.hideIndicator();
    return false;
});

function refresh_forum_timer()
{
	var service = new Login_service();
	service.initialize().done(function () {});
	
	service.get_forum_items().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			var total_forum = window.localStorage.getItem("total_forum");
			var new_forum = data.total_received;
			window.localStorage.setItem("new_forum", new_forum);
			
			if(total_forum != data.total_received)
			{
				window.localStorage.setItem("forum_list", data.result);
			}
		}
	});
}

function refresh_forum_display()
{
	var total_forum = window.localStorage.getItem("total_forum");
	var new_forum = window.localStorage.getItem("new_forum");
	var forum_list = window.localStorage.getItem("forum_list");
	
	if(forum_list == " ")
	{
		new_forum = total_forum;
		window.localStorage.setItem("total_forum", new_forum);
	}
	
	//case of new adds
	if(new_forum != total_forum)
	{
		window.localStorage.setItem("total_forum", new_forum);
		$( "#all_forums" ).html( forum_list );
	}
}

function get_blog_description(id)
{
	myApp.showIndicator();
	
	//get event details
	var blog_details = window.localStorage.getItem("blog_details"+id);
	var blog_details = null;
	
	if((blog_details == "") || (blog_details == null) || (blog_details == "null"))
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		var member_id = window.localStorage.getItem("member_id");
		
		service.getBlogDetail(id, member_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			//alert('here');
			if(data.message == "success")
			{//alert(data.result);
				window.localStorage.setItem("blog_details"+id, data.result);
				window.localStorage.setItem("blog_title"+id, data.discussion_title);
				window.localStorage.setItem("blog_content"+id, data.discussion_content);
				window.localStorage.setItem("forum_post_id", id);
				$( "#blog_details" ).html( data.result );
				$( "h3#forum-title" ).html( data.discussion_title );
				myApp.hideIndicator();
			}
			
			else
			{
				myApp.alert('Oops. Unable to get content', 'ICPAK');
				myApp.hideIndicator();
			}
		});
	}
	
	else
	{
		setTimeout(function () {
			// change the page to home 
			var blog_title = window.localStorage.getItem("blog_title"+id);
			window.localStorage.setItem("post_id", id);
			$( "#blog_details" ).html( blog_details );
			$( "#forum-title" ).html( blog_title );
			myApp.hideIndicator();
		 }, 3000);
	}
	
	var refresh_blog_selection2 = setInterval(function(){ refresh_blog_timer(id) }, 2000);
	var refresh_blog_display2 = setInterval(function(){ refresh_blog_display(id) }, 4000);
}

function refresh_blog_timer(id)
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	var member_id = window.localStorage.getItem("member_id");
	
	service.getBlogDetail(id, member_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			var total_blog = window.localStorage.getItem("total_blog"+id);
			var new_blog = data.total_received;
			window.localStorage.setItem("new_blog"+id, new_blog);
			
			if(total_blog != data.total_received)
			{
				window.localStorage.setItem("blog_list"+id, data.result);
			}
		}
	});
}

function refresh_blog_display(id)
{
	var total_blog = window.localStorage.getItem("total_blog"+id);
	var new_blog = window.localStorage.getItem("new_blog"+id);
	
	//case of new adds
	if(new_blog != total_blog)
	{
		window.localStorage.setItem("total_blog"+id, new_blog);
		var blog_list = window.localStorage.getItem("blog_list"+id);
		$( "#blog_details" ).html( blog_list );
	}
}

$(document).on("click","a.add-comment",function()
{
	myApp.showIndicator();
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		var member_id = window.localStorage.getItem("member_id");
		var comment = $("#post_comment").val();
		var post_id = window.localStorage.getItem("forum_post_id");
        var member_first_name = window.localStorage.getItem("member_first_name");
		service.add_comment(comment, post_id, member_id,member_first_name).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				myApp.hideIndicator();
				$("#post_comment").val('');
				get_blog_description(post_id);
			}
			else
			{
				myApp.hideIndicator();
				myApp.alert(data.result, 'Error');
			}
        });
	}
	
	else
	{
		myApp.alert('No internet connection - please check your internet connection then try again', 'ICPAK');
		myApp.hideIndicator();
	}
	return false;
});
$(document).on("click","a.post-notification",function(e)
{
	var post_id = window.localStorage.getItem("forum_post_id");
	var blog_title = window.localStorage.getItem("blog_title"+post_id);
	var blog_content = window.localStorage.getItem("blog_content"+post_id);
	myApp.addNotification({
		title: blog_title,
		message: blog_content
	});	
});
function get_all_forums()
{
     var web_service = new Login_service();
    web_service.initialize().done(function () {
        console.log("Service initialized");
    });

    web_service.get_forum_items().done(function (employees)
    {
        var data = jQuery.parseJSON(employees);
        
        if(data.message == "success")
        {
            $( "#all_forums" ).html( data.result );
            window.localStorage.setItem("forum_list", data.result);
            window.localStorage.setItem("total_forum", data.total_received);
        }
        
        else
        {
            myApp.hideIndicator();
            myApp.alert(data.result, 'Error');
        }
    });
}