var connection = $.hdb.getConnection();
var results = "";
//Request procedure parameters
var origCity = $.request.parameters.get("origCity");
var desCity = $.request.parameters.get("desCity");
var distance = $.request.parameters.get("distance");

 
try{
	//Load procedure
	var fnCalculateDistance = connection.loadProcedure("0CT51OO89LZIPY9I_HANAGEOSPATIALTUT_HDI_CONTAINER", "HANAGeoSpatialTut.geodb::caldistance");
	
	//Execute procedure and get output
	results = fnCalculateDistance(origCity, desCity, distance);
	
	connection.close();
	
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(results));	
	$.response.setStatus = $.net.http.OK;
	
}catch (e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    $.response.setBody(e.message);
}

