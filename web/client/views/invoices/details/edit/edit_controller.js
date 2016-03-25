this.InvoicesDetailsEditController = RouteController.extend({
	template: "InvoicesDetails",
	

	yieldTemplates: {
		'InvoicesDetailsEdit': { to: 'InvoicesDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("InvoicesDetails"); this.render("loading", { to: "InvoicesDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("invoice_item", this.params.itemId),
			Meteor.subscribe("invoice_details", this.params.invoiceId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			invoice_item: InvoiceItems.findOne({_id:this.params.itemId}, {}),
			invoice_details: Invoices.findOne({_id:this.params.invoiceId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});