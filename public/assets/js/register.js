//* JS for Signing Up account
$(document).ready(function () {
    //
    const registerBTN = $('.signup');
    const regFN = $('input#firstnamereg');
    const regLN = $('input#lastnamereg');
    const regEmail = $('input#emailreg');
    const password = $('input#passwordreg');
    registerBTN.on('click', function (event) {
        console.log(`
        Value Check:
        regFN: ${regFN}
        regLN: ${regLN}
        regEmail: ${regEmail}
        password: ${password}
        `);
    });
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
	// if (!userData.username || !userData.email || !userData.password) {
	// 	return alert("Please don't leave fields blank");
	// }
	// If we have an email and password, run the signUpUser function
	signUpUser(newUserReg.first_name, newUserReg.last_name, newUserReg.email, newUserReg.password);
});
});