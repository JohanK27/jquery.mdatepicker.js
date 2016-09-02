# jquery.mdatepicker.js

The Date Range Picker component in your application will help users set a period from the pop-up menu. The common data range picker provides users with a very small horizantal scroll view so it is painful to set the data range on the small window. With this new data range picker, all the work gets done easily. It not only gives a bigger view but also an intuitive UI. Just add Data Ranger Picker, then a textbox pops up. Move the cursor to the text box to activate, and a calendar to select the start/end date appears. A bigger size calendar with vertical scroll view will come out soon.
==============

##Example

```javascript
$("#datepicker1").mdaterangepicker();

$("#datepicker2").mdaterangepicker({
				//from : "2016-05-01",
				// to :  "2019-12-31",
				selectionFrom : (new Date().toISOString().substring(0,10)),
				selectionTo : (new Date().toISOString().substring(0,10)),
				colorMode : true,
				selectionMode : true,
				allowPast : false,

				change : function() {
					console.log(this.getDateRangeString());
				},
			});
```

##Features
* A period selection : set the start/end date from the bigger pop-up window
* User specified attribute : tap event or Drag event
* Color mode : highlights the period from start date to end date in color. If not selected, no background color.
* Selection mode:  choose either Click or Drag to set the start/end date.
* With the support of responsive UX,  adjust the size automatically according to screen resolutions. 


##Properties
* RangeFrom : The start date of date range(date format : yyyy-mm-dd). The default value is the current date.
* RangeTo : The end date of data range(date format : yyyy-mm-dd). The default value is 2 years after the current date
* SelectionFrom : set the start date
* SelectionTo : set the end date
* ColorMode : fill the selected data range in background color
* SelectionMode : either click or drag can be selected to set the start/end date
* AllowPast :  allow users to select a date earlier than today
