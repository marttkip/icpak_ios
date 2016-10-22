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

var Event_Service = function() {

    var url;
    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }
    this.getEvents = function() {
		var request = url + "events/get_icpak_events" ;
        return $.ajax({url: request});
    }
    this.getEventsDetail = function(id) {
		var request = url + "events/get_news_detail" ;
        return $.ajax({url: url + "events/get_event_detail/" + id});
    }
    
}

function get_event_items()
{	
	// alert("sdhada");
	// internet data

	var service = new Event_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});

	//get client's credentials
	myApp.showIndicator();
	service.getEvents().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#event_list" ).html( data.result );
			window.localStorage.setItem("event_list",data.result);
		}
		
		else
		{
			var event_list = window.localStorage.getItem("event_list");
			$( "#event_list" ).html( event_list );
		}
		
	});	
	myApp.hideIndicator();
}

function get_events_description(id)
{
	var service = new Event_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	setTimeout(function () {
		service.getEventsDetail(id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				$( "#events_detail" ).html( data.result );
			}
			
			else
			{

			}
		myApp.hideIndicator();
		});	
	}, 2000);
}