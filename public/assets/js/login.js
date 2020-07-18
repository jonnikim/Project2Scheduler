$(document).ready(function() {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
  const emailInput = $("input.email");
   const passwordInput = $("input.passwrd");
    // loginUser does a post to our "admin/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/admin/login", {
        email: email,
        password: password
      }).then(function(data) {
        location.replace('/admin/schedule')
        // If there's an error, log the error
      }).catch(function(err) {
        $("#password-feedback").text("Incorrect Email or Password");
      });
    }

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
     var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email) {
        emailInput.css("border", "solid 1px red");
        $("#username-feedback").text("Please enter a username");
        return;
      }
  
      if (!userData.password) {
        passwordInput.css("border", "solid 1px red");
        $("#password-feedback").text("Please enter a password");
        return;
      }

      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
    
});