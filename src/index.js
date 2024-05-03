sap.ui.require([], function () {
	"use strict";
	sap.ui.core.Component.create({
		name: 'ui5.quickstart',
		manifestFirst: true,
		async: true
	}).then(function (oComponent) {
		new sap.ui.core.ComponentContainer({
			component: oComponent
		}).placeAt("ui5-content");
	}).catch(function (oError) {
		console.error("Error during component creation:", oError);
	});
});