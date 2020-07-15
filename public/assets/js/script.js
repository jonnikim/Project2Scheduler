let clientScheduleDate = '';
let clientScheduleday = '';
let clientScheduleTime = '';
let clientScheduleTimeAttrStart = '';
let clientScheduleTimeAttrEnd = '';

//*Months Array to convert MM to Month Name
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const times = [
	'9:00:00',
	'9:30:00',
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

//* function to convert YYYY-MM-DD to MM/DD/YYYY
function formatDateView(date) {
	const dateObj = new Date(date + 'T00:00:00');
	return new Intl.DateTimeFormat('en-US').format(dateObj);
}

//* Calendar for Admin Scheduler Page
document.addEventListener('DOMContentLoaded', function () {
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
		dateClick: function () {
			alert('a day has been clicked!');
		},

		navLinks: true, // can click day/week names to navigate views
		businessHours: true, // display business hours
		editable: true,
		selectable: true,
		events: [
			{
				title: 'Business Lunch',
				start: '2020-06-03T13:00:00',
				constraint: 'businessHours',
			},
			{
				title: 'Meeting',
				start: '2020-06-13T11:00:00',
				constraint: 'availableForMeeting', // defined below
				color: '#257e4a',
			},
			{
				title: 'Conference',
				start: '2020-06-18',
				end: '2020-06-20',
			},
			{
				title: 'Party',
				start: '2020-06-29T20:00:00',
			},

			// areas where "Meeting" must be dropped
			{
				groupId: 'availableForMeeting',
				start: '2020-06-11T10:00:00',
				end: '2020-06-11T16:00:00',
				display: 'background',
			},
			{
				groupId: 'availableForMeeting',
				start: '2020-06-13T10:00:00',
				end: '2020-06-13T16:00:00',
				display: 'background',
			},

			// red areas where no events can be dropped
			{
				start: '2020-06-24',
				end: '2020-06-28',
				overlap: false,
				display: 'background',
				color: '#ff9f89',
			},
			{
				start: '2020-06-06',
				end: '2020-06-08',
				overlap: false,
				display: 'background',
				color: '#ff9f89',
			},
			{
				title: 'Appointment: Client 1',
				start: '2020-07-15T10:00:00',
				end: '2020-07-15T11:00:00',
			},
			{
				title: 'Apt: Client 2',
				start: '2020-07-23T10:00:00',
				end: '2020-07-23T11:00:00',
				constraint: 'businessHours',
			},
			{
				id: 012345,
				title: 'Test Event Formatting',
				start: '2020-07-23T11:00:00',
				end: '2020-07-23T12:00:00',
				constraint: 'businessHours',
				admin_id: '',
				first_name: '',
				last_name: '',
				email: '',
				if1: '',
				if2: '',
				itf: '',
			},
		],
	});
	calendarAdmin.render();
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
				let mTimeEnd = times[clientScheduleTimeAttrEnd];
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
						testdate: clientScheduleDay,
						testdateind: info.dateStr,
						first_name: $('#newEventFN').val().trim(),
						last_name: $('#newEventLN').val().trim(),
						email: $('#newEventEmail').val().trim(),
						if1: $('#newEventIF1').val().trim(),
						if2: $('#newEventIF2').val().trim(),
						ift: $('#newEventITF').val().trim(),
					};
					console.log(newEvent);

					//! Need to update code below to get to post
					$.ajax('/api/events', {
						type: 'POST',
						data: newEvent,
					}).then(function () {
						console.log('New Event Added!');

						location.reload();
					});
				});
			});
		},

		// allow "more" link when too many events
	});
	calendar.render();
});
