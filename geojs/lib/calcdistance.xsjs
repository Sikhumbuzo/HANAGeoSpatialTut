var connection = $.hdb.getConnection();

var origCity = $.request.parameters.get("origCity");
var desCity = $.request.parameters.get("desCity");
var distance = $.request.parameters.get("distance");

var fnCalculateDistance = connection.loadProcedure("0CT51OO89LZIPY9I_HANAGEOSPATIALTUT_HDI_CONTAINER", "HANAGeoSpatialTut.geodb::caldistance");
var results = fnCalculateDistance(origCity, desCity, distance);

$.response.setStatus = $.net.http.OK;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(results));


/*function calculateDistance(cities) {

var conn = $.hdb.getConnection();

var output = JSON.stringify(cities);

var fnCalculateDistance = conn.loadProcedure("HANAGeoSpatialTut.geodb::caldistance");

var result = fnCalculateDistance({OriginCity: cities.origCity, DestinationCity: cities.desCity, UnitOfMeasure: cities.distance});

conn.commit();

conn.close();

if (result && result.EX_ERROR != null) { return result.EX_ERROR;}

else { return output; }

}

var cities = {

  origCity: $.request.parameters.get("origCity"),

  desCity: $.request.parameters.get("desCity"),
  
  distance: $.request.parameters.get("distance")

};

// validate the inputs here!

var output = calculateDistance(cities);

$.response.contentType = "application/json";

$.response.setBody(output);*/