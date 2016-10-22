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

var StreamingService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }
    this.get_recordings = function() {
		var request = url + "streaming/get_recording_event" ;
        return $.ajax({url: request});
    }
    this.get_single_recordings =  function(id) {
		var request = url + "streaming/get_recording_detail/"+id ;
        return $.ajax({url: request});
    }

}

function get_streaming_event()
{
	var service = new StreamingService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	service.get_recordings().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#streaming_now" ).html( data.live_stream );

			window.localStorage.setItem("streaming_now",data.result);

			$( "#recordings" ).html( data.result );
			window.localStorage.setItem("recordings",data.result);

		}
		
		else
		{
			var streaming_now = window.localStorage.getItem('streaming_now');

            $( "#streaming_now" ).html( streaming_now );

            var recordings = window.localStorage.getItem('recordings');

            $( "#recordings" ).html( recordings );
		}
	});
	myApp.hideIndicator();   
}

function get_single_recording(recording_id,recording_link)
{
	window.localStorage.setItem("recording_id",recording_id);
	window.localStorage.setItem("recording_link",recording_link);

	var service = new StreamingService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	service.get_single_recordings(recording_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#single_recording" ).html( data.result );
			window.localStorage.setItem("single_recording",data.result);
		}
		
		else
		{
			var single_recording = window.localStorage.getItem('single_recording');

            $( "#single_recording" ).html( single_recording );
		}
	});
	myApp.hideIndicator();   
}