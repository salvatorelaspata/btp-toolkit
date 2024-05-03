sap.ui.define([
    "ui5/quickstart/controller/BaseController",
	"sap/m/MessageToast",
    "ui5/quickstart/libs/main",
], (Controller, MessageToast, lib) => {
	"use strict";

	return Controller.extend("ui5.quickstart.controller.Info", {
        onInit: function(){
            
        },
		onPress: function(){
            lib.greet().then((text) => {
                MessageToast.show(text);
            });
		}
	});

});