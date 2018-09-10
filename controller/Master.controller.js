sap.ui.define([
	"abap/lab/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, Controller, Filter, FilterOperator, MessageToast) {
	"use strict";

	return BaseController.extend("abap.lab.controller.Master", {

		onInit: function() {
			this.oView = this.getView();
			this.oprojectsTable = this.oView.byId("projectsTable");
			this.oRouter = this.getOwnerComponent().getRouter();

			var oProjectsModel = this.getOwnerComponent().getModel("projects");

			oProjectsModel.setProperty("/title",
				// this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("masterPanelTitleCount", [Object.keys(oProjectsModel.getData()
				// 	.projectDetail).length]));
				this.getResourceBundle().getText("masterPanelTitleCount", [Object.keys(oProjectsModel.getData()
					.projectDetail).length]));
		},

		onSearch: function(oEvent) {
			var sQuery = oEvent.getSource().getValue();

			this.byId("projectLayout_abaplab").getContent().forEach(function(oRow) {
				oRow.getBinding("content").filter(new Filter("name", FilterOperator.Contains, sQuery));
			});
			
			this.byId("projectLayout_abapopen").getContent().forEach(function(oRow) {
				oRow.getBinding("content").filter(new Filter("name", FilterOperator.Contains, sQuery));
			});

		},

		onCopyToClipboard: function(oEvent) {
			var sString = oEvent.getSource().data('gitData'),
				oResourceBundle = this.getResourceBundle(),
				sSuccessText, sExceptionText;

			sSuccessText = oResourceBundle.getText("copyToClipboardSuccess", [sString]);
			sExceptionText = oResourceBundle.getText("copyToClipboardFail", [sString]);
			this._copyToClipboard(sString, sSuccessText, sExceptionText);

		},

		_copyToClipboard: function(copyText, successText, exceptionText) {
			var $temp = $("<input>");

			try {
				$("body").append($temp);
				$temp.val(copyText).select();
				document.execCommand("copy");
				$temp.remove();

				MessageToast.show(successText);
			} catch (oException) {
				MessageToast.show(exceptionText);
			}
		},

		onProjectPress: function(oEvent) {

			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);

			var projectId = oEvent.getSource().getBindingContext("projects").getObject().id;

			this.oRouter.navTo("detail", {
				layout: oNextUIState.layout,
				project: projectId
			});
		}
	});
}, true);