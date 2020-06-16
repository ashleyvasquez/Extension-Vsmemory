// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

var vscode;

function Status(success){
    if(success){
        remota.disabled=false;
        memoria_remota();

    }else{
        memoria_local();
        remota.disabled=true;

    }
}
/**
 * funcion que indica al usuario que esta guardando en la memoria remota
 */
function memoria_remota() {
    const local = document.getElementById('local');
    const remota = document.getElementById('remota');
    local.checked = false;
    remota.checked = true;
    vscode.postMessage({
        command: 'alert',
            text: "Ingrese los datos para conectarse con el servidor"
    });
};

/**
 * funcion que indica al usuario que esta guardando en la memoria local
 */
function memoria_local(){
    const local = document.getElementById('local');
    const remota = document.getElementById('remota');
    local.checked = true;
    remota.checked = false;
    vscode.postMessage({
        command: 'alert',
            text: "Utilizando la memoria local"
    });

};

/**
 * Se lama a esta funcion cuando el usuario le da click al boton para conerctarse al server
 */

function conectar(){
    var ip=document.getElementById("ip");
    var puerto=document.getElementById("puerto");
    var contraseña=document.getElementById("contraseña");
    var usuario=document.getElementById("usuario");
    vscode.postMessage({
        command:'alert',
        text:"Comprobando conexion"
    });
}

(function () {


    vscode = acquireVsCodeApi();
    const oldState = vscode.getState();
    const counter = document.getElementById('lines-of-code-counter');
    console.log(oldState);
    const local = document.getElementById('local');
    const remota = document.getElementById('remota');
    const settings=document.getElementById("setsettings");
    const type=document.getElementById("type");  
    const val=document.getElementById("val"); 
    const ubi=document.getElementById("ubi"); 
    const ref=document.getElementById("ref"); 
    local.onclick=memoria_local;
    remota.onclick=memoria_remota;
    settings.onclick=conectar;
    type.textContent = "1. "  ;
    val.textContent = " ";
    ubi.textContent = " ";
    ref.textContent = " ";

    

    setInterval(() => {

        }, 100);
    
    setInterval(() => {
        counter.textContent = currentCount++;}, 100);


        window.addEventListener('message', event => {
            const message = event.data; 
            switch (message.command) {
                case 'refactor':
                    currentCount = Math.ceil(currentCount * 0.5);
                    break;
                case 'data':
                    updateStuff(message.data);
                    break;
                case "status":
                    Status(message.data);
                    break;
            }
        });
        // Handle messages sent from the extension to the webview
        

}());