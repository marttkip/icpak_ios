//login & registration functions
var Bookings_service = function() {

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
    this.complete_transaction = function(form_data) {
    	// alert("sadada");
		var request = url + "login/complete_transaction";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.complete_transaction_card = function(form_data) {
    	// alert("sadada");
		var request = url + "login/complete_card_transaction";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

}

function get_accomodation_details(post_id,booking_refid)
{
	// $( "#loader-wrapper" ).removeClass( "display_none" );

	mainView.router.loadPage('bookings.html');

	var service = new Bookings_service();
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

	var service = new Bookings_service();
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
			var invoiceAmount = data.invoiceAmount;
			var documentNo = data.documentNo;
			var invoiceRef = data.invoiceRef;
			// $( "#invoice_amount" ).html(invoiceAmount );
			// $( "#invoice_number" ).html( documentNo );
			window.localStorage.setItem('invoiceAmount',invoiceAmount);
			window.localStorage.setItem('documentNo',documentNo);


			mainView.router.loadPage('payment.html');

			// var invoiceAmount =  window.localStorage.getItem('invoiceAmount');
			// var documentNo =  window.localStorage.getItem('documentNo');

			// alert(invoiceAmount);
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
$(document).on("submit","form#mpesa_payment",function(e)
{
    e.preventDefault();
    //get form values
    var form_data = new FormData(this);

    //check if there is a network connection
    var connection = true;//is_connected();
    
    if(connection === true)
    {
        var service = new Bookings_service();
        service.initialize().done(function () {
            console.log("Service initialized");
        });
        service.complete_transaction(form_data).done(function (employees) {
                var data = jQuery.parseJSON(employees);
                
                if(data.message == "success")
                {
                	if(data.result == null)
                	{
                		myApp.alert('Sorry payment has not been confirmed','Payment Response');
                	}
                	else
                	{
                		myApp.alert('Payment has been confirmed','Payment Response');
                   		mainView.router.loadPage('events.html');
                	}
                    
                }
                else
                {
                     
                     myApp.alert('Sorry payment has not been confirmed','Payment Response');
                }
            });
    }
    
    else
    {
        myApp.alert('No internet connection - please check your internet connection then try again');
        
    }
    return false;
});

$(document).on("submit","form#card_payment",function(e)
{
    e.preventDefault();
    //get form values
    var form_data = new FormData(this);

    //check if there is a network connection
    var connection = true;//is_connected();
    
    if(connection === true)
    {
        var service = new Bookings_service();
        service.initialize().done(function () {
            console.log("Service initialized");
        });
        service.complete_transaction_card(form_data).done(function (employees) {
                var data = jQuery.parseJSON(employees);
                
                if(data.message == "SUCCESS")
                {
                	if(data.result == null)
                	{
                		myApp.alert('Sorry payment has not been confirmed','Payment Response');
                	}
                	else
                	{
                		myApp.alert('Payment has been confirmed','Payment Response');
                   		mainView.router.loadPage('events.html');
                	}
                    
                }
                else
                {
                     
                     myApp.alert('Sorry payment has not been confirmed','Payment Response');
                }
            });
    }
    
    else
    {
        myApp.alert('No internet connection - please check your internet connection then try again');
        
    }
    return false;
});
$(document).on("submit","form#nonmemberbooking",function(e)
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
		
		service.nonmemberbooking(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{

				
				// $( "#news-of-icpak" ).addClass( "display_block" );
				var invoiceAmount = data.invoiceAmount;
				var documentNo = data.documentNo;
				var invoiceRef = data.invoiceRef;
				// $( "#invoice_amount" ).html(invoiceAmount );
				// $( "#invoice_number" ).html( documentNo );
				window.localStorage.setItem('invoiceAmount',invoiceAmount);
				window.localStorage.setItem('documentNo',documentNo);


				mainView.router.loadPage('payment.html');
				myApp.alert('An email has been sent to your email with a profoma invoice.');
					
			}
			else
			{
				myApp.alert('Sorry,something went wrong please try again to book for the event');	
				
			}
			
        });
	}
	
	else
	{
		myApp.alert('No internet connection - please check your internet connection then try again');
	}
	// get_profile_details();
	return false;
});
