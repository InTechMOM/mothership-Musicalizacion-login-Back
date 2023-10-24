// Define la configuración de MSAL
const msalConfig = {
    auth: {
        clientId: 'TU_CLIENT_ID', // Debes obtener el Client ID desde el portal de Azure AD
        authority: 'https://login.microsoftonline.com/TU_TENANT_ID', // Reemplaza con tu Tenant ID
        redirectUri: 'https://localhost:3000', // URL de redirección después de iniciar sesión
    },
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

// Función para abrir una ventana emergente con el botón para iniciar sesión con Microsoft
function openLoginPopup() {
    const popup = window.open('', 'MicrosoftLoginPopup', 'width=600,height=400');
    popup.document.body.innerHTML = '<button id="loginWithMicrosoftButton">Iniciar Sesión con Microsoft</button>';

    // Evento click en el botón dentro de la ventana emergente para iniciar sesión con Microsoft
    popup.document.getElementById('loginWithMicrosoftButton').addEventListener('click', function () {
        const loginRequest = {
            scopes: ['openid', 'profile', 'User.Read'], // Ámbito de permisos requeridos
        };

        myMSALObj.loginPopup(loginRequest)
            .then((loginResponse) => {
                // El usuario ha iniciado sesión correctamente, url para pagar con tarjeta
            })
            .catch((error) => {
                console.error(error);
            });
    });
}

// Evento click en el botón "Iniciar Sesión"
document.getElementById('iniciarSesionButton').addEventListener('click', openLoginPopup);
