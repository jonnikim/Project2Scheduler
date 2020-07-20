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
