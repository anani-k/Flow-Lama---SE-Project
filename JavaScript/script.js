document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Verhindert das standardmäßige Formularverhalten


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Ausgabe der Formularwerte
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);


});
