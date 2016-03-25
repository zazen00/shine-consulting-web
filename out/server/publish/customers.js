Meteor.publish("customer_list", function() {
	return Customers.find({ownerId:this.userId}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { if(item.totalAmount) sum += item.totalAmount; }); doc.totalAmount = sum; return doc; },sort:["name"]});
});

Meteor.publish("customers_empty", function() {
	return Customers.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("customer_details", function(customerId) {
	return Customers.find({_id:customerId,ownerId:this.userId}, {transform:function(doc) { var sum = 0; Invoices.find({ customerId: doc._id }).map(function(item) { sum += item.totalAmount; }); doc.totalAmount = sum; return doc; }});
});

