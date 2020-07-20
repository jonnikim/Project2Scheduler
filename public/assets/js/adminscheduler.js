
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

$(document).ready(function() {
    // Getting references to our form and inputs
    const sendBtn = $("form.sendEmail");
    const regFN = $('input#firstnamereg');
    const regLN = $('input#lastnamereg');
    const emailInput = $("input.email");
    const bodyInput = $("textarea.email-body");

    // loginUser does a post to our "admin/login" route and if successful, redirects us the the members page
    function sendEmail(firstname, lastname, email, body) {
      $.post("/admin/schedule", {
        firstname: firstname,
        laststname: lastname,
        email: email,
        body: body
      }).then(function(data) {
        location.replace('/admin/schedule')
        // If there's an error, log the error
      }).catch(function(err) {
        if(err) return err ;
      });
    }

    // When the form is submitted, we validate there's an email and password entered
    sendBtn.on("submit", function(event) {
      event.preventDefault();
     var emailData = {
        firstname: regFN.val().trim(),
        lastname: regLN.val().trim(),
        email: emailInput.val().trim(),
        body: bodyInput.val().trim()
      };
  
    //   if (!userData.email) {
    //     emailInput.css("border", "solid 1px red");
    //     $("#username-feedback").text("Please enter a username");
    //     return;
    //   }
  
    //   if (!userData.password) {
    //     passwordInput.css("border", "solid 1px red");
    //     $("#password-feedback").text("Please enter a password");
    //     return;
    //   }

      // If we have an email and password we run the loginUser function and clear the form
      sendEmail(emailData.firstname, emailData.lastname, emailData.email, emailData.body);
      regFN.val();
      regLN.val()
      emailInput.val("");
      bodyInput.val("");
    });
    
});

