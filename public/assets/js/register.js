//* JS for Signing Up account
$(document).ready(function () {
    //
    const registerBTN = $('.signup');
    const regFN = $('input#first-name');
    const regLN = $('input#last-name');
    const regEmail = $('input#emailreg');
    const password = $('input#passwordreg');
    registerBTN.on('click', function (event) {
        console.log(`
        Value Check:0
        regFN: ${regFN}
        regLN: ${regLN}
        regEmail: ${regEmail}
        password: ${password}
        `);

    });
      // Username "on-the-fly" validation
      regFN.bind('input propertychange', function() {
    if (regFN.val().trim().length < 2) {
      $("#firstnamereg").removeClass("has-success");

      $("#firstnamereg").addClass("has-error");
      $("#first-name-feedback").text("username must be at least 2 characters long");
    } else {
      $("#firstnamereg").removeClass("has-error");

      $("#firstnamereg").addClass("has-success");
      $("#first-name-feedback").text("First name valid!");
    }
  });
      // Username "on-the-fly" validation
      regLN.bind('input propertychange', function() {
        if (regLN.val().trim().length < 2) {
          $("#lastnamereg").removeClass("has-success");
    
          $("#lastnamereg").addClass("has-error");
          $("#last-name-feedback").text("username must be at least 2 characters long");
        } else {
          $("#lastnamereg").removeClass("has-error");
    
          $("#lastnamereg").addClass("has-success");
          $("#last-name-feedback").text("Last name valid!");
        }
      });
  // Email "on-the-fly" validation
  emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  regEmail.bind('input propertychange', function() {
    if (!emailRegEx.test($(this).val()))
    {
      $("#email-form").removeClass("has-success");

      $("#email-form").addClass("has-error");
      $("#email-feedback").text("Invalid Email");
      $("#email-additional-feedback").text("Ex: someone@example.com");
    
    } else {
      $("#email-form").removeClass("has-error");

      $("#email-form").addClass("has-success");
      $("#email-feedback").text("Valid Email!");
      $("#email-additional-feedback").text("");
    }
  });


  var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  password.bind('input propertychange', function() {
    if (!passwordRegEx.test($(this).val())) {
      $("#password-form").removeClass("has-success");

      $("#password-form").addClass("has-error");
      $("#password-feedback").text("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.");
    } else {
      $("#password-form").removeClass("has-error");

      $("#password-form").addClass("has-success");
      $("#password-feedback").text("Password set correctly!");    
    }
  });


    // Replace all alerts with modals
    function signUpUser(first_name, last_name, email, password) {
        $.post('/admin/register', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            is_admin: 1
        })
            .then(function (data) {
                if (data.duplicateUser) {
					// Replace with Modal
                    alert('Sorry, that username has been taken');
                } else {
					location.replace('/admin/login')
					console.log("regesiterJS");
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }
registerBTN.on('click', function (event) {
	event.preventDefault();
	console.log("clicked")
	// Replace all alerts with modals
	var newUserReg = {
		first_name: regFN.val().trim(),
		last_name: regLN.val().trim(),
		email: regEmail.val().trim(),
		password: password.val().trim(),
	};
	console.log(newUserReg);
	if ( !newUserReg.first_name || !newUserReg.last_name || !newUserReg.email || !newUserReg.password) {
		return alert("Please don't leave fields blank");
	}
	// If we have an email and password, run the signUpUser function
	signUpUser(newUserReg.first_name, newUserReg.last_name, newUserReg.email, newUserReg.password);

});
});