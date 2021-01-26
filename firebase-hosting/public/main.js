const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = (user) => {
    if (user) {
      loggedInLinks.forEach((link) => (link.style.display = "inline"));
      loggedOutLinks.forEach((link) => (link.style.display = "none"));
    } 
    else {
      loggedInLinks.forEach((link) => (link.style.display = "none"));
      loggedOutLinks.forEach((link) => (link.style.display = "inline"));
    }
  };

 // Auth
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Login");
      loginCheck(user);
    }
    else {
      console.log("Logout");
      loginCheck(user);
    }
}) 

// SignUp
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signUpForm["signup-email"].value;
    const password = signUpForm["signup-password"].value;

    // Authenticate the User
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // clear the form
            signUpForm.reset();
            // close the modal
            $('#signupModal').modal('hide')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
  });
    
// SignIn
const signInForm = document.querySelector("#signin-form");
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signInForm["signin-email"].value;
    const password = signInForm["signin-password"].value;

    // Authenticate the User
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // clear the form
            signInForm.reset();
            // close the modal
            $('#signinModal').modal('hide')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
        });
  });

// Google Login
const googleButton = document.querySelector("#googleLogin");
googleButton.addEventListener('click', e => {
    e.preventDefault();
    
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            // clear the form
            signInForm.reset();
            // close the modal
            $("#signinModal").modal("hide");
        })
        .catch(err => {
            console.log(err);
        });
})

// Facebook Login
const facebookButton = document.querySelector("#facebookLogin");
facebookButton.addEventListener('click', e => {
    e.preventDefault();

    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            // clear the form
            signInForm.reset();
            // close the modal
            $('#signinModal').modal('hide')
        })
        .catch((err) => {
            console.log(err);
        });
})

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    e.preventDefault();
    firebase.auth().signOut()
        .then(() => {
            console.log("Cerrar Sesión");
        });
})

