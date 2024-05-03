sap.ui.define(['sap/ui/core/UIComponent', 'sap/ui/model/resource/ResourceModel'],
	function (UIComponent, ResourceModel) {
		"use strict";
		var Component = UIComponent.extend("ui5.quickstart.Component", {
			metadata: {
				manifest: "json"
			},
			init: function () {
				UIComponent.prototype.init.apply(this, arguments);

				// Parse the current url and display the targets of the route that matches the hash
				this.getRouter().initialize();

				// set i18n model
				const i18nModel = new ResourceModel({
					bundleName: "ui5.quickstart.i18n.i18n"
				});

				this.setModel(i18nModel, "i18n");
			}
		});

		return Component;
	});