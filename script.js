document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput= document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput= document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide')

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); //TODO: agregar metodo que valide el formulario
        validateForm();
    })
    emailInput.addEventListener('blur', function (){
        validateEmail() //TODO: agregar metodo que valide el email
    })
    emailInput.addEventListener('change', function () {
        clearError(emailError) //TODO: agregar metodo que limpie el error
    })
    passwordInput.addEventListener('change', function () {
        clearError(passwordError) //TODO: agregar metodo que limpie el error
    })
    confirmPasswordInput.addEventListener('change', function () {
        clearError(confirmPasswordError) //TODO: agregar metodo que limpie el error
    })

    showHideButton.addEventListener('click', function () {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {//guardar mail en el localStorage y generar unjson en consola
            saveToLocalStorage()
            alert('Has ingresado con éxito')
        }
    }

    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim() // el trim lo que hace es eliminar espacios vacíos al comienzo y final del input

        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un email válido') //TODO: mostrar error
            return false
        }

        return true
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim()

        if (passwordValue.length < 6) {
            showError(passwordError, 'Ingresa una contraseña de al menos 6 caracteres')//TODO: mostrar error
            return false;
        }

        return true
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coinciden')//TODO: mostrar error
            return false;
        }

        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement,) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue)
        const body = bodyBuilderJSON() //TODO; hacer el json
        console.log(body)
    }

    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        }
    }


})