sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function(JSONModel, Controller) {
	"use strict";

	return Controller.extend("abap.lab.controller.App", {
		onInit: function() {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		},

		onBeforeRouteMatched: function(oEvent) {
			var oModel = this.oOwnerComponent.getModel(),
				sLayout = oEvent.getParameters().arguments.layout,
				oNextUIState;

			// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
			if (!sLayout) {
				// sLayout = sap.f.LayoutType.OneColumn;
				oNextUIState = this.oOwnerComponent.getHelper().getNextUIState(0);
				sLayout = oNextUIState.layout;
			}

			oModel.setProperty("/layout", sLayout);
		},

		onRouteMatched: function(oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");

			this._updateUIElements();

			// Save the current route name
			this.currentRouteName = sRouteName;
			this.currentProject = oArguments.project;
		},

		onStateChanged: function(oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			this._updateUIElements();

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, {
					layout: sLayout,
					project: this.currentProject
				}, true);
			}
		},

		// Update the close/fullscreen buttons visibility
		_updateUIElements: function() {
			var oModel = this.oOwnerComponent.getModel();
			var oUIState = this.oOwnerComponent.getHelper().getCurrentUIState();
			oModel.setData(oUIState);
		},

		onExit: function() {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		}
	});
}, true);