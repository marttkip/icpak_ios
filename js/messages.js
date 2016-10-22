/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}


var MessagesService = function() {

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
    this.getallMessages = function() {
		var member_id = window.localStorage.getItem("member_id");
		var request = url + "messages/inbox/" + member_id ;
        return $.ajax({url: request});
    }
    this.getallContacts = function() {
		var member_id = window.localStorage.getItem("member_id");
		var request = url + "messages/contacts/" + member_id ;
        return $.ajax({url: request});
    }
    this.getChats = function(receiver_id) {
		var member_id = window.localStorage.getItem("member_id");
		var request = url + "messages/view_message/" + receiver_id+'/'+member_id ;
        return $.ajax({url: request});
    }

    this.send_message = function(message, receiver) {
		var member_id = window.localStorage.getItem("member_id");
		var request = url + "messages/message_profile";
        return $.ajax({url: request, data:{ client_message_details: message, receiver_id: receiver, client_id: member_id }, type: "POST"});
    }
}

$(document).on('pageInit', '.page[data-page="icpak-chat"]', function (e) 
{
	window.localStorage.setItem("view_page",1);
	
	mainView.showNavbar();

	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#chat-button" ).addClass( "active" );
	$( "#profile-button" ).removeClass( "active");

	var member_id = window.localStorage.getItem("member_id");
	$("#chat_member_id").val(member_id);
	var member_name =  window.localStorage.getItem("member_first_name");
	$( "#chat_member_name" ).val( member_name );

	myApp.closePanel();

	myApp.showIndicator();
	//window.localStorage.setItem("logged_in", 'no');
	var logged_in = window.localStorage.getItem("logged_in");
	//alert(logged_in);
	if(logged_in == 'yes')
	{
		var member_id = window.localStorage.getItem("member_id");
		$("#chat_member_id").val(member_id);
		
		var web_service = new Login_service();
		web_service.initialize().done(function () {
			console.log("Service initialized");
		});
			
		var forum_list = window.localStorage.getItem("forum_list");
		//forum_list = null;
		
		if((forum_list == "") || (forum_list == null) || (forum_list == "null"))
		{
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
				
					myApp.alert(data.result, 'Error');
				}
			});
		}
		
		else
		{
			$( "#all_forums" ).html( forum_list );
		}
		
		refresh_ads_selection = setInterval(function(){ refresh_forum_timer() }, 20000);
		refresh_ads_display = setInterval(function(){ refresh_forum_display() }, 30000);
		
		// get_messages();
		// get_contacts();
	}
	
	else
	{
		myApp.hideIndicator();
		myApp.modalLogin('Please log in to join the MySay', 'Login', login_member);
	}
	myApp.hideIndicator();
})

$(document).on('pageInit', '.page[data-page="login"]', function (e) 
{
	var view_page =  window.localStorage.getItem("view_page");
	$( "#view_page" ).val( view_page );
	
	myApp.hideIndicator();
})

function get_messages()
{
	var service = new MessagesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	setTimeout(function () {
		service.getallMessages().done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				$( "#inbox" ).html( data.result );
				window.localStorage.setItem("inbox",data.result);
			}
        });
    }, 2000);
}

function get_contacts()
{
	var service = new MessagesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	service.getallContacts().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#contacts" ).html( data.result );
			window.localStorage.setItem("contacts",data.result);
		}
	  myApp.hideIndicator();
	});
}

function chat_single(member_id)
{
	myApp.showIndicator();
	var service = new MessagesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	service.getChats(member_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#receiver_id" ).val(member_id);
			$( "#chat-history" ).html(data.result);
			window.localStorage.setItem("chat_history"+member_id, data.result);
		}
	  myApp.hideIndicator();
	});
}

//Send message
$(document).on("submit","form#send-message",function(e)
{
	e.preventDefault();
	myApp.showIndicator();
	var message = $("textarea[name=client_message_details]").val();
	var receiver = $("input[name=receiver_id]").val();
	
	var service = new MessagesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	var send = service.send_message(message, receiver);
		
	send.done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data == "false")
		{
			$( "#chat-history" ).append('<li class="clear-both">Unable to send message. Please try again</li>');
		}
		else
		{
			var prev_message_count = parseInt(window.localStorage.getItem("prev_message_count"+receiver));
			var curr_message_count = prev_message_count + 1;
			window.localStorage.setItem("prev_message_count"+receiver, curr_message_count);
			
			//get prev msg
			var prev_msg = window.localStorage.getItem("message_history"+receiver);
			var new_msg = prev_msg+data.message;
			window.localStorage.setItem("message_history"+receiver, new_msg);
			
			$( "#chat-history" ).append(data.message);
			$("textarea[name=client_message_details]").val('');
		}
		
	 	myApp.hideIndicator();
	});
	send.fail(function () {
        myApp.alert('Please check your internet connection then try again.');
	 	myApp.hideIndicator();
	});
		
	return false;
});
