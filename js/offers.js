var OffersService = function() {

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

    this.get_all_offers = function() {
		var request = url + "login/get_member_offers" ;
        return $.ajax({url: request});
    }


}

function get_member_offers()
{
	// alert('dsghfgshjfgsj');
	var service = new OffersService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	service.get_all_offers().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#icpak_offers" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("icpak_offers", data.result);
		}
		
		else
		{
			var icpak_offers  = window.localStorage.getItem("icpak_offers");
			$( "#icpak_offers" ).html( icpak_offers );
		}
	});
}
