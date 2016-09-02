# jquery.mdatepicker.js
==============
The MIT License (MIT)

Example
--------------------
$("#datepicker1").mdaterangepicker();

$("#datepicker2").mdaterangepicker({
				from : "2016-05-01",
				to :  "2019-12-31",
				selectionFrom : (new Date().toISOString().substring(0,10)),
				selectionTo : (new Date().toISOString().substring(0,10)),
				colorMode : true,
				selectionMode : true,
				allowPast : false,

				change : function() {
					console.log(this.getDateRangeString());
				},
			});
