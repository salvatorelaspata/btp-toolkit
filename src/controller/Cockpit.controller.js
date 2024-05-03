sap.ui.define([
	'ui5/quickstart/controller/BaseController', 'sap/ui/model/json/JSONModel'
], function ( Controller, JSONModel ) {
	"use strict";

	var CController = Controller.extend("ui5.quickstart.controller.Cockpit", {
		onInit : function() {
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("ui5/quickstart/model/model.json"), null, false);
			this.getView().setModel(this.oModel);
		},
		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
		},
		onMenuButtonPress : function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		}
	});

	return CController;

});
