sap.ui.define([
	"abap/lab/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function(BaseController, Filter, FilterOperator, JSONModel) {
	"use strict";

	return BaseController.extend("abap.lab.controller.Detail", {

		onInit: function() {

			// var oViewModel;

			// oViewModel = new JSONModel({
			// 	"avatar_url": "https://avatars1.githubusercontent.com/u/29891579?v=4",
			// 	"creator": "beyondnk",
			// 	"information": "It's Initial",
			// 	"video": "https://www.youtube.com/embed/TdJcFhhy930"
			// });
			// this.getView().setModel(oViewModel, "project");

			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.videoHtml = new sap.ui.core.HTML("videoHtml");

			// this.oRouter.getRoute("master").attachPatternMatched(this._onProjectMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProjectMatched, this);
		},

		_onProjectMatched: function(oEvent) {

			this._project = oEvent.getParameter("arguments").project;

			if (this._project !== undefined) {

				var oDetail = this.getView().getModel("projects").getData().projectDetail[this._project];

				this.videoHtml.setContent(
					"<div class='embed-container'>" +
					"<iframe width='972' height='547' src='" + oDetail.video + "' frameborder='0' allowfullscreen>" +
					"</iframe>" +
					"</div>"
				);

				var oVideoPanel = this.getView().byId("videoPanel");
				oVideoPanel.removeAllContent();
				oVideoPanel.addContent(this.videoHtml);

				var oJsonModel = new JSONModel(oDetail);
				oJsonModel.setSizeLimit(1000);
				this.getView().setModel(oJsonModel, "project");
				
			}

		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		handleFullScreen: function() {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", {
				layout: sNextLayout,
				project: this._project
			});
		},

		handleExitFullScreen: function() {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", {
				layout: sNextLayout,
				project: this._project
			});
		},

		handleClose: function() {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("master", {
				layout: sNextLayout
			});
		},

		onExit: function() {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProjectMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProjectMatched, this);
		}

	});
}, true);