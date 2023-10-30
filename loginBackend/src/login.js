// Crear una instancia de MSAL
const myMSALObj = new msal.PublicClientApplication(msalConfig);

// Función para abrir un popup e iniciar sesión
function loginWithMicrosoft() {
    myMSALObj.loginPopup(loginRequest)
        .then((loginResponse) => {
            // Manejar la respuesta de inicio de sesión
            console.log('Inicio de sesión exitoso:', loginResponse);
        })
        .catch(handleError);
}

// Función para obtener un token de acceso y llamar a la API de MS Graph
function getTokenAndCallMSGraph() {
    // Adquirir silenciosamente un token de acceso
    myMSALObj.acquireTokenSilent(tokenRequest)
        .then((tokenResponse) => {
            // Llamar a la API de MS Graph
            callMSGraph(tokenResponse.accessToken);
        })
        .catch((error) => {
            // Si acquireTokenSilent() falla, adquirir un token de acceso usando acquireTokenPopup()
            if (error instanceof msal.InteractionRequiredAuthError) {
                myMSALObj.acquireTokenPopup(tokenRequest)
                    .then((tokenResponse) => {
                        // Llamar a la API de MS Graph
                        callMSGraph(tokenResponse.accessToken);
                    })
                    .catch(handleError);
            } else {
                handleError(error);
            }
        });
}

// Función para llamar a la API de MS Graph y mostrar datos en la página
function callMSGraph(accessToken) {
    // Utilizar Axios para la solicitud HTTP
    axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => {
        // Mostrar los datos del usuario en la página
        console.log('Datos del usuario:', response.data);
    })
    .catch(handleError);
}

// Manejador de evento para el botón de inicio de sesión
document.getElementById('loginWithMicrosoftButton').addEventListener('click', function () {
    // Agregar una clase al botón para cambiar el estilo
    this.classList.add('clicked');

    // Luego, espera un breve momento (500 ms) y luego quita la clase para volver al estilo normal
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 500);

    // Llama a la función de inicio de sesión
    loginWithMicrosoft();
});

// Función de manejo de errores
function handleError(error) {
    console.error('Error:', error);
}
