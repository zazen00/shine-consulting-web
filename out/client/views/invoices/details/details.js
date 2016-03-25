var pageSession = new ReactiveDict();

Template.InvoicesDetails.rendered = function() {
	
};

Template.InvoicesDetails.events({
	
});

Template.InvoicesDetails.helpers({
	
});

Template.InvoicesDetailsDetailsForm.rendered = function() {
	

	pageSession.set("invoicesDetailsDetailsFormInfoMessage", "");
	pageSession.set("invoicesDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.InvoicesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("invoicesDetailsDetailsFormInfoMessage", "");
		pageSession.set("invoicesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var invoicesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(invoicesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("invoicesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("invoicesDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("invoices", {});
	}

	
});

Template.InvoicesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("invoicesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("invoicesDetailsDetailsFormErrorMessage");
	}
	
});
