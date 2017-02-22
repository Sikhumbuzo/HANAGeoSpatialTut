sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device"
], function(Controller, Device) {
	"use strict";

	return Controller.extend("com.sap.geo.ui.controller.Main", {
			onInit: function(){
			
			/*var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(this.oData);
			this.getView().setModel(oModel);
			
			/*var oDeviceModel = new sap.ui.model.json.JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
			*/
			
			var oGeoMap = this.getView().byId("vbi");
			oGeoMap.addGeoJsonLayer(this.addFeatureCollection());
			var oMapConfig = {
				"MapProvider": [{
					"name": "HEREMAPS",
					"type": "",
					"description": "",
					"tileX": "256",
					"tileY": "256",
					"maxLOD": "20",
					"copyright": "HERE Maps",
					"Source": [{
						"id": "s1",
						"url": "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day.grey/{LOD}/{X}/{Y}/256/png8?app_id=Mv1sZKBYuOL0uLAPcrRy&app_code=lglFX4tb_IwBnHuvVsNT6w"
					}, {
						"id": "s2",
						"url": "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day.grey/{LOD}/{X}/{Y}/256/png8?app_id=Mv1sZKBYuOL0uLAPcrRy&app_code=lglFX4tb_IwBnHuvVsNT6w"
					}]
				}],
				"MapLayerStacks": [{
					"name": "DEFAULT",
					"MapLayer": {
						"name": "layer1",
						"refMapProvider": "HEREMAPS",
						"opacity": "1",
						"colBkgnd": "RGB(255,255,255)"
					}
				}]
			};
			oGeoMap.setMapConfiguration(oMapConfig);
			oGeoMap.setRefMapLayerStack("DEFAULT");
		},
		addFeatureCollection : function (){
			var gJson = new sap.ui.vbm.GeoJsonLayer({
				srcURL: "https://vhhan200.pro.coil:51041/getPoints.xsjs",
				items: {
					path: "/Features",
					template: new sap.ui.vbm.Feature(
													{
														color: "rgba(182,217,87,0.6)",
														tooltip: "Testing"
													}
						)
				}
			});
			return gJson;
		}
		
	});
});