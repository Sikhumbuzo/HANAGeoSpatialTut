try{
	var connection = $.db.getConnection();
	var preStatement = connection.prepareStatement('SELECT "CITY_COORDINATES".ST_AsGeoJson() as "LOCATION" FROM "0CT51OO89LZIPY9I_HANAGEOSPATIALTUT_HDI_CONTAINER"."HANAGeoSpatialTut.geodb::geocds.geodata"');
	//var query = 'SELECT "CITY_COORDINATES".ST_AsGeoJson() AS "LOCATION" ' +
	//'FROM "0CT51OO89LZIPY9I_HANAGEOSPATIALTUT_HDI_CONTAINER"."HANAGeoSpatialTut.geodb::geocds.geodata"';
	var results = preStatement.executeQuery();
	
	var response = {type: "GeoJsonLayer"};
	response.features = [];
	
	while(results.next()){
		
		response.features.push({type: "Feature", geometry: JSON.parse(results.getString(1))});
		
	}
	
//	response.properties = {};
	connection.close();
	preStatement.close();
	results.close();
	
	$.response.contentType = "application/json";
	//$.response.headers.set("Access-Control-Allow-Origin","*");
	$.response.setBody(JSON.stringify(response));	
	$.response.setStatus = $.net.http.OK;
	
}catch (e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    $.response.setBody(e.message);
}