"use strict";

var express = require("express");
var xssec = require("sap-xssec");
var passport = require("passport");
var xsHDBConn = require("sap-hdbext");
var xsenv = require("sap-xsenv");
var asyncw = require("async");

module.exports = function(options) {
	var app = express();

	passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
		uaa: {
			tag: "xsuaa"
		}
	}).uaa));
	app.use(passport.initialize());

	app.use(
		passport.authenticate("JWT", {
			session: false
		}),
		xsHDBConn.middleware(options));

	//Async Waterfall
	app.route("/getPoints")
		.get(function(req, res) {
			var client = req.db;
			asyncw.waterfall([
				function prepare(callback) {
					//var query = "SELECT \"CITY_CORDINATES\".ST_AsGeoJSON() AS \"LOCATION\" FROM \"HANAGEOSPATIALTUT_HDI_CONTAINER_1\".\"HANAGeoSpatialTut.geodb::geocds.geodata\" ";
					var query = "SELECT CITY_NAME FROM \"HANAGEOSPATIALTUT_HDI_CONTAINER_1\".\"HANAGeoSpatialTut.geodb::geocds.geodata\" ";
					//var query = "SELECT CITY_CORDINATES FROM \"HANAGEOSPATIALTUT_HDI_CONTAINER_1\".\"HANAGeoSpatialTut.geodb::geocds.geodata\" ";
					client.prepare(query,
						function(err, statement) {
							callback(null, err, statement);
						});
				},

				function execute(err, statement, callback) {
					statement.exec([], function(execErr, results) {
						callback(null, execErr, results);
					});
				},
				function response(err, results, callback) {
					if (err) {
						res.type("text/plain").status(500).send("ERROR: " + err);
					} else {
						
						var feature = {type: "FeatureCollection"};
						feature.features = [];
						
						for(var row = 0; row < results.legth; row++) {
							feature.push({type: "Feature", geometry: JSON.parse(results[row].LOCATION.toString())});
						}
						
						var result = JSON.stringify(results);
					/*	var result = JSON.stringify({
							Objects: results
						});*/
						res.type("application/json").status(200).send(result);
					}
					callback();
				}
			]);
		});

	app.route("/")
		.get(function(req, res) {
			res.send("Hello World");
		});

	return app;
};