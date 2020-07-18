let clientScheduleDate = '';
let clientScheduleday = '';
let clientScheduleTime = '';
let clientScheduleTimeAttrStart = '';
let clientScheduleTimeAttrEnd = '';
let eventsData = [];

//*Months Array to convert MM to Month Name
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const times = [
	'09:00:00',
	'09:30:00',
	'10:00:00',
	'10:30:00',
	'11:00:00',
	'11:30:00',
	'12:00:00',
	'12:30:00',
	'13:00:00',
	'13:30:00',
	'14:00:00',
	'14:30:00',
	'15:00:00',
	'15:30:00',
	'16:00:00',
	'16:30:00',
];

const endTimes = [
	'10:00:00',
	'10:30:00',
	'11:00:00',
	'11:30:00',
	'12:00:00',
	'12:30:00',
	'13:00:00',
	'13:30:00',
	'14:00:00',
	'14:30:00',
	'15:00:00',
	'15:30:00',
	'16:00:00',
	'16:30:00',
	'17:00:00',
	'17:30:00',
];

//* function to convert YYYY-MM-DD to MM/DD/YYYY
function formatDateView(date) {
	const dateObj = new Date(date + 'T00:00:00');
	return new Intl.DateTimeFormat('en-US').format(dateObj);
}

//* Ajax call to assign events variable with data to be pulled into the calendar
getEvents();

function getEvents() {
	$.get('/admin/schedule', function (data) {
		eventsData = data;
		console.log(eventsData);
		return eventsData;
	});
}

console.log(eventsData);

//* Calendar for Admin Scheduler Page
document.addEventListener('DOMContentLoaded', function () {
	$.get('/admin/schedule', function (data) {
		console.log(data);
	}).then(function () {
		$.get('/admin/schedule/events', function (data2) {
			console.log(data2);
		}).then(function (edata2) {
			var calendarEl = document.getElementById('calendarAdmin');
			var calendarAdmin = new FullCalendar.Calendar(calendarEl, {
				customButtons: {
					sendApptInvite: {
						text: 'Send New Appointment Invite!',

						click: function () {
							//alert('Form Pulls Up To Send Invite Email!');
							window.location.href = '#modal-sections';
						},
					},
				},
				headerToolbar: {
					left: 'sendApptInvite',
					center: 'title',
					right: 'prev,next today dayGridMonth,timeGridWeek,timeGridDay,listMonth',
				},
				eventClick: function (info) {
					alert('Event: ' + info.event.title);

					// change the border color just for fun
					info.el.style.borderColor = 'red';
				},

				navLinks: true, // can click day/week names to navigate views
				businessHours: true, // display business hours
				editable: true,
				selectable: true,
				events: edata2,
			});

			calendarAdmin.render();
		});
	});
});

//* Calendar for Client Scheduler Page

document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendarClient');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: '',
			center: 'title',
			right: 'prev,next today',
		},

		selectable: true,
		selectMirror: true,
		unselectAuto: true,
		dateClick: function (info) {
			clientScheduleDate = formatDateView(info.dateStr);

			// change the day's background color just for fun
			// info.dayEl.style.backgroundColor = 'deeppink';
			//calendar.unselect();

			let dayDate = new Date(clientScheduleDate);
			let clientScheduleDay = days[dayDate.getDay()];
			console.log(dayDate.getDay());

			//* Renders Date and day into Times Column
			$('#dayofWeek').text(clientScheduleDay);
			$('#datedisplay').text(clientScheduleDate);
			$('#dayofWeek2').text(clientScheduleDay);
			$('#datedisplay2').text(clientScheduleDate);

			//* Jquery Code to select time and add it to list

			$('.availTimeBox').click(function selectTime() {
				clientScheduleTimeAttrStart = $(this).attr('data-timeindex');
				//ToDo clientScheduleTimeAttrEnd = $(this).attr('data-timeindex');
				//ToDoconsole.log(clientScheduleTimeAttrEnd);
				// Sets variable to index value to reset time formatting to merge into object later
				//! Change when selecting hour works:
				let mTimeStart = times[clientScheduleTimeAttrStart];
				let mTimeEnd = endTimes[clientScheduleTimeAttrStart];
				//*Code to get correct date + T + time formatting:
				let newEventStartTime = info.dateStr + 'T' + mTimeStart;
				let newEventEndTime = info.dateStr + 'T' + mTimeEnd;
				clientScheduleTime = $(this).text();
				$('#timedisplay').text(clientScheduleTime);

				//*Jquery code to create new object for event

				$('#newEventFormID').on('submit', function (event) {
					event.preventDefault();
					const newEvent = {
						title: 'New Event With ' + $('#newEventFN').val().trim() + ' ' + $('#newEventLN').val().trim() + ' on ' + clientScheduleDay + ', ' + clientScheduleDate,
						start: newEventStartTime,
						end: newEventEndTime,
						constraint: 'businesshours',
						testdate: clientScheduleDay,
						testtime: clientScheduleTime,
						testdateind: info.dateStr,
						first_name: $('#newEventFN').val().trim(),
						last_name: $('#newEventLN').val().trim(),
						email: $('#newEventEmail').val().trim(),
						if1: $('#newEventIF1').val().trim(),
						if2: $('#newEventIF2').val().trim(),
						ift: $('#newEventITF').val().trim(),
						is_booked: 'disabled',
					};
					console.log(newEvent);

					//! Need to update code below to get to post
					$.ajax('/client/newevent', {
						type: 'POST',
						data: newEvent,
					}).then(function () {
						console.log('New Event Added!');

						location.replace('/client/neweventconfirm', newEvent);
					});
				});
			});
		},

		// allow "more" link when too many events
	});
	calendar.render();
});
