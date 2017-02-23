try{
	//var connection = $.db.getConnection();
	var connection = $.hdb.getConnection();
	//var preStatement = connection.prepareStatement('SELECT "CITY_COORDINATES".ST_AsGeoJSON() as "LOCATION" FROM "0CT51OO89LZIPY9I_HANAGEOSPATIALTUT_HDI_CONTAINER"."HANAGeoSpatialTut.geodb::geocds.geodata"');
	var query = 'SELECT "CITY_COORDINATES".ST_AsGeoJson() AS "LOCATION" ' +
	'FROM "0CT51OO89LZIPY9I_HANAGEOSPATIALTUT_HDI_CONTAINER"."HANAGeoSpatialTut.geodb::geocds.geodata"';
	//var results = preStatement.executeQuery();
	var results = connection.executeQuery(query);
	var response = {type: "FeatureCollection"};
	
	response.features = [];
	var body = {};
	//var row = results[0];                 
	   
	//var items;
	for(var row = 0; row < results.length; row++) {            
		//items += results[row].LOCATION; 
		//body = {Spots : results[i].toString()};Array([val])
		response.features.push({type: "Feature", geometry: JSON.parse(results[row].LOCATION.toString())});
		//body = {geometry: results.getString(1)};
	}
	
	
	
	//var obj = JSON.parse(items);  
//	response.properties = {};
	connection.close();
	//preStatement.close();
	//results.close();
	
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(response));	
	$.response.setStatus = $.net.http.OK;
	
}catch (e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    $.response.setBody(e.message);
}