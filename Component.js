sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/f/FlexibleColumnLayoutSemanticHelper"
], function(UIComponent, JSONModel, FlexibleColumnLayoutSemanticHelper) {
	"use strict";

	return UIComponent.extend("abap.lab.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			var oModel, oProjectsModel;

			UIComponent.prototype.init.apply(this, arguments);

			oModel = new JSONModel();
			this.setModel(oModel);

			// set Projects demo model on this sample
			oProjectsModel = new JSONModel(jQuery.sap.getModulePath("abap.lab", "/model/projects.json"));
			oProjectsModel.setSizeLimit(1000);
			this.setModel(oProjectsModel, "projects");

			this.getRouter().initialize();
		},

		createContent: function() {
			return sap.ui.view({
				viewName: "abap.lab.view.App",
				type: "XML"
			});
		},

		getHelper: function() {
			var oFCL = this.getRootControl().byId("flexibleColumnLayout"),
				oSettings = {
					defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: sap.f.LayoutType.ThreeColumnsMidExpanded
				};

			return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
		}

	});
});