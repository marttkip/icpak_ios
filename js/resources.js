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


var EmployeeresourcesService = function() {

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
    this.getallLatesresources = function() {
		var request = url + "resources/get_icpak_resources" ;
        return $.ajax({url: request});
    }
    this.getresourcesDetail = function(id) {
		var request = url + "resources/get_resources_detail" ;
        return $.ajax({url: url + "resources/get_resources_detail/" + id});
    }

    this.getallLatestpublications = function() {
		var request = url + "resources/get_icpak_publications" ;
        return $.ajax({url: request});
    }
    this.getpublicationDetail = function(id) {
		var request = url + "resources/get_publication_detail" ;
        return $.ajax({url: url + "resources/get_publication_detail/" + id});
    }
}

function get_resources_items()
{
	var service = new EmployeeresourcesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	setTimeout(function () {
		service.getallLatesresources().done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				$( "#icpak_resources_two" ).html( data.result );
				window.localStorage.setItem("icpak_resources_two",data.result);
			}
			else
			{

			}
		  myApp.hideIndicator();
        });
    }, 2000);
}
function get_resources_description(id)
{
	var service = new EmployeeresourcesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	setTimeout(function () {
	service.getresourcesDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#resources-of-icpak" ).addClass( "display_block" );
			$( "#resources_detail" ).html( data.result );
		}
		else
		{

		}
		myApp.hideIndicator();
       });
    }, 2000);
}
function get_publication_items()
{
	var service = new EmployeeresourcesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	service.getallLatestpublications().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#icpak_publications" ).html( data.result );
			window.localStorage.setItem("icpak_publications",data.result);
		}
		
		else
		{

		}
	});
	myApp.hideIndicator();
}

function get_publication_detail(id)
{
	var service = new EmployeeresourcesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	myApp.showIndicator();
	service.getpublicationDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#resources-of-icpak" ).addClass( "display_block" );
			$( "#publication_detail" ).html( data.result );

		}
		
		else
		{

		}
	});
	myApp.hideIndicator();
}
$(document).on("click","a.download-resource",function(e)
{
	e.preventDefault();
	
	//get form values
	var resource = $(this).attr('download_file');
		
	window.open(resource, '_system', 'location=yes');
	return false;
});

//pass the variable in the link as follows e.g. resources.html?id=1
//on the resources.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below





