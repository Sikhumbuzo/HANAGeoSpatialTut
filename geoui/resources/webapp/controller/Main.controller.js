sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.geo.ui.controller.Main", {
			onInit: function(){
			
			var oGeoMap = this.getView().byId("vbi");
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
						"url": "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=Mv1sZKBYuOL0uLAPcrRy&app_code=lglFX4tb_IwBnHuvVsNT6w"
					}, {
						"id": "s2",
						"url": "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=Mv1sZKBYuOL0uLAPcrRy&app_code=lglFX4tb_IwBnHuvVsNT6w"
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
		}
	});
});