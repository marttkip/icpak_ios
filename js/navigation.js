$$(document).on('pageInit', '.page[data-page="login"]', function (e) 
{
	$( "#index-logo" ).addClass( "display_none" );
})	
$$(document).on('pageInit', '.page[data-page="icpak-resources"]', function (e) 
{
	
	mainView.showNavbar();
	$( "#resources-button" ).addClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );
	$( "#black-login" ).addClass( "cached" );
	
	myApp.closePanel();

	get_publication_items();
	get_resources_items();
})

$$(document).on('pageInit', '.page[data-page="icpak-events"]', function (e) 
{
	// alert("sdbajshdajhs");
	
	mainView.showNavbar();
	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).addClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );

	myApp.closePanel();

	get_event_items();
})

$$(document).on('pageInit', '.page[data-page="icpak-live"]', function (e) 
{
	window.localStorage.setItem("view_page",3);
	mainView.showNavbar();
	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	$( "#live-button" ).addClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );
	myApp.closePanel();
	myApp.showIndicator();
	//window.localStorage.setItem("logged_in", 'no');
	var logged_in = window.localStorage.getItem("logged_in");
	//alert(logged_in);
	if(logged_in == 'yes')
	{
	
		get_streaming_event();
	}
	else
	{
		myApp.hideIndicator();
		myApp.modalLogin('Please Login to view ICPAK TV', 'Login', login_member);
	}
	myApp.hideIndicator();
})

$$(document).on('pageInit', '.page[data-page="member-profile"]', function (e) 
{
	window.localStorage.setItem("view_page",2);
	
	mainView.showNavbar();
	//window.localStorage.setItem("logged_in", 'no');
	var logged_in = window.localStorage.getItem("logged_in");
	//alert(logged_in);
	if(logged_in == 'yes')
	{
		$( "#black-login" ).addClass( "cached" );
		$( "#resources-button" ).removeClass( "active" );
		$( "#events-button" ).removeClass( "active" );
		$( "#live-button" ).removeClass( "active" );
		$( "#chat-button" ).removeClass( "active" );
		$( "#profile-button" ).addClass( "active");

		myApp.closePanel();
		
		get_profile_details();
	}
	else
	{
		myApp.hideIndicator();
		myApp.modalLogin('Please log in to join the forum', 'Login', login_member);
	}
})

$$(document).on('pageInit', '.page[data-page="events-booking-page"]', function (e) 
{
	
})
var playerObjects = {};
function onYouTubePlayerReady(playerId) 
{
	alert(playerId);
	playerObjects[playerId] = document.getElementById(playerId);
}
$$(document).on('pageInit', '.page[data-page="recording-single"]', function (e) 
{
	window.localStorage.setItem("watching", 1);
	var recording_id = window.localStorage.getItem("recording_id");
	var recording_link = window.localStorage.getItem("recording_link");
	// alert(recording_link);
	var player;
	onYouTubeIframeAPIReady();
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
			playerVars: {
				'autoplay': 1,
				'controls': 0,
				'autohide': 1,
				'wmode': 'opaque',
				'showinfo': 0,
				//'loop': 1,
				//'mute': 1,
				//'start': 15,
				//'end': 110,
				//'playlist': 'NQKC24th90U'
			},
			height: '300',
			width: '100%',
			videoId: recording_link,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
})

// autoplay video
function onPlayerReady(event) {
	event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {
	if(event.data === 0) {
		myApp.showIndicator();
		var member_no = window.localStorage.getItem("member_no"); 
		var recording_id = window.localStorage.getItem("recording_id");        
		$.ajax({
			url: base_url+'login/update_link_details',
			type:'POST',
	        data:{member_no: member_no, recording_id : recording_id},
	        dataType: 'text',
			statusCode: {
				302: function() {
					myApp.hideIndicator();
				}
			},
			success: function(data) 
			{
				// Put anything here which you want done after the db update is done
				// alert(data.message);
				myApp.hideIndicator();
				
				
				
				mainView.router.loadPage('recordings.html');


			},
			complete: function() {
				myApp.hideIndicator();
				 

			},  
			error : function(xhr, textStatus, errorThrown ) {
			   myApp.hideIndicator();
			}
		});
	}
}

$$('#chat-content').on('click', function () {

  myApp.popup('.popup-about');
});

$$(document).on('pageInit', '.page[data-page="payment-page"]', function (e) 
{
	// alert("sdbajshdajhs");
	
	mainView.showNavbar();
	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).addClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );

	var invoiceAmount =  window.localStorage.getItem('invoiceAmount');
	var documentNo =  window.localStorage.getItem('documentNo');


	$( "#invoice_amount" ).html(invoiceAmount );
	$( "#invoice_number" ).html( documentNo );
	$( "#invoice_amount_two" ).html( invoiceAmount );


	$( "#invoice_amount_input" ).val(invoiceAmount );
	$( "#invoice_number_input" ).val( documentNo );

	$( "#invoice_amount_input_two" ).val(invoiceAmount );
	$( "#invoice_number_input_two" ).val( documentNo );

	myApp.closePanel();

})

$$(document).on('pageInit', '.page[data-page="non_member_booking"]', function (e) 
{
	// alert("sdbajshdajhs");
	
	mainView.showNavbar();
	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).addClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );

	var booking_refid = window.localStorage.getItem('booking_refid');
	var accomodation_refid = window.localStorage.getItem('accomodation_refid');
	var post_id = window.localStorage.getItem('post_id');
	var hotel = window.localStorage.getItem('hotel');
	var fee = window.localStorage.getItem('fee');

	$("#bookingRefId").val(booking_refid);
	$("#accomodationRefId").val(accomodation_refid);
	$("#post_id").val(post_id);
	$("#hotel").val(hotel);
	$("#fee").val(fee);


	myApp.closePanel();

})


// the items
function get_page_tab(tab_id)
{
	// alert(tab_id);
	if(tab_id == 1)
	{
		$( "#tab1_old" ).addClass( "active" );
		$( "#tab2_old" ).removeClass( "active" );
	}
	else if(tab_id == 2)
	{
		$( "#tab1_old" ).removeClass( "active" );
		$( "#tab2_old" ).addClass( "active" );
	}
	else if(tab_id == 3)
	{

	}
}


