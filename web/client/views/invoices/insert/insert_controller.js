this.InvoicesInsertController = RouteController.extend({
	template: "InvoicesInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("customer_list"),
			Meteor.subscribe("invoices_empty"),
			Meteor.subscribe("invoice_list")
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
			customer_list: Customers.find({}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]}),
			invoices_empty: Invoices.findOne({_id:null}, {}),
			invoice_list: Invoices.find({}, {sort:[["invoiceNumber","desc"]]})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});