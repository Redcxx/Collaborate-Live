/**********************************************/
/*                 ADD ADMIN                  */
/**********************************************/
// const adminForm = document.querySelector('.admin-actions');
// adminForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const adminEmail = document.querySelector('#admin-email').value;
//   const addAdminRoleToUser = functions.httpsCallable('addAdminRole');
//   addAdminRoleToUser({ email: adminEmail }).then(result => {
//     console.log(result);
//   });
// });


/**********************************************/
/*              STATUS CHANGES                */
/**********************************************/

// Listen for auth status changes. If user is logged off, log null, as user is not logged (doesnt exists.)
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    })
  } else {
    // As we don't pass in anything, then the setupUI constant in index.js file will toggle the elements corresponding to user being logged out.
    setupUI();
  }
});


/**********************************************/
/*                   SIGNUP                   */
/**********************************************/

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {

  // This is to prevent the page from just refreshing after you have pressed the sign up button. e is the event that the button is pressed.
  e.preventDefault();

  // Get user information from the signup form.
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-text'].value
    })
  }).then(() => {
    // Closing the modal after the user has been created.
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});


/**********************************************/
/*               LOGIN METHOD                 */
/**********************************************/
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user info.
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {

    // Close the login modal and reset the form.
    const modal = document.querySelector('#modal-login');
    loginForm.reset();
    window.location.replace("canvas.html");
    console.log("no error");
  }).catch(err => {
    console.log(err);
    console.log("error");
    // loginForm.querySelector('.error').innerHTML = err.message;
  });
});
