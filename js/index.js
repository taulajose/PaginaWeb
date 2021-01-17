/*VALIDACION DE FORMULARIO*/ 

let enviar = document.getElementById('enviar');
let formulario = document.getElementById('formulario');
let inputs = document.querySelectorAll('#formulario input')
let textar = document.getElementById("textarea")
let mensajeFormulario = document.querySelector('#mensajeFormulario')

const expresiones = {
    nombre:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/,
    cuerpo:/^[a-zA-ZÀ-ÿ\s]{4,40}$/
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    cuerpo: false
}

function error_Correcto(expresion,input,campo){
    
    if(expresion.test(input.value)){
        input.classList.add('formularioCorrecto')
        campos[campo]=true;
        }
    else{
        input.classList.remove('formularioCorrecto')
        input.classList.add('formularioError');
        campos[campo]=false;
        }
}


function validarFormulario(e){
    e.preventDefault();
    
    switch(e.target.id){
            
        case "nombre":
            error_Correcto(expresiones.nombre,e.target,"nombre")
            break;
            
        case "mail":
            error_Correcto(expresiones.correo,e.target,'correo')
            break;
        
        case "telefono":
            error_Correcto(expresiones.telefono,e.target,'telefono')
            break;
        }  
}


 textarea.addEventListener('keyup',()=>{
    error_Correcto(expresiones.cuerpo,textarea,'cuerpo')
});   
   
                
inputs.forEach((input)=>{
    input.addEventListener('keyup',validarFormulario)
    input.addEventListener('blur',validarFormulario)
});


formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    if(campos.nombre && campos.correo && campos.telefono && campos.cuerpo){
        
        formulario.reset();
        document.querySelector('.error').style.display="block";
        mensajeFormulario.style.color="green"; 
        mensajeFormulario.innerHTML='MENSAJE ENVIADO';
        setTimeout(()=>{
            document.querySelector('.error').style.display="none";   
        },3000);
        for(let i=0; i<inputs.length; i++){
            inputs[i].classList.remove('formularioCorrecto');
            inputs[i].classList.remove('formularioError');
            }
        textar.classList.remove('formularioCorrecto');
        textar.classList.remove('formularioError');
        campos.nombre= false,
        campos.correo= false,
        campos.telefono= false,
        campos.cuerpo= false
        }
    
    else{
        document.querySelector('.error').style.display="block";
        mensajeFormulario.style.color="red";
        mensajeFormulario.innerHTML='COMPLETE LOS CAMPOS EN ROJO';
        inputs.forEach((input)=>{
                if(input.value == ""){
                    input.classList.add('formularioError')
                }

                if(textar.value==""){
                   textar.classList.add('formularioError') 
                }
            });
        };
    
});

document.addEventListener('scroll',(e)=>{
   if(!formulario.contains(e.target)){
       for(let i=0; i<inputs.length; i++){
            inputs[i].classList.remove('formularioCorrecto');
            inputs[i].classList.remove('formularioError');
            }
       document.querySelector('.error').style.display="none"; 
       textar.classList.remove('formularioCorrecto');
       textar.classList.remove('formularioError');
   }
})

/*REPRODUCTOR DE VIDEO*/

let video = document.getElementById("video");
let boton_rep = document.getElementById("reproducir");
let boton_det = document.getElementById("detener");
let boton_avanzar = document.getElementById("avanzar");
let boton_retroceder = document.getElementById("retroceder");
let rangoProgreso = document.getElementById("rangoProgreso");
let tituloVideo = document.getElementsByClassName('tituloVideo');
let barraProgreso = document.getElementById('barraProgreso');
let offsetizquierda = document.querySelector('.contenedor_video').offsetLeft;
let maximo = barraProgreso.clientWidth;


$(barraProgreso).on("click",mover)
$(mute).on("click",silencio)


function reproducir(){
    if (video.paused){
        video.play();
        boton_rep.innerHTML="<span class='icon-pause2'></span>";
        bucle=setInterval(estado, 1000);
        $(tituloVideo).hide();
        }
    else{
         video.pause();
         boton_rep.innerHTML="<span class='icon-play3'></span>";
         $(tituloVideo).show();
        }
}

function detener(){
    video.pause();
    video.currentTime=0;
    boton_rep.innerHTML="<span class='icon-play3'></span>";
    rangoProgreso.style.width="0";
    $(tituloVideo).show();
    
}

function saltar(fotogramas){
    video.currentTime += fotogramas;
    var tiempo= parseInt(video.currentTime*maximo/video.duration)
    rangoProgreso.style.width=tiempo + "px";    
}

function inicio(){
    video.currentTime = 0;
    rangoProgreso.value=0;
    video.play;
}

function silencio(){
    if (video.volume !== 0){
        video.volume=0;
    }
    
    else if (video.volume == 0){
        video.volume=1;
    }
}

function estado(){
    if(!video.ended){
        var total=parseInt(video.currentTime*maximo/video.duration);
        rangoProgreso.style.width=total+'px';
        }
        else{
        rangoProgreso.style.width='0px';
        boton_rep.innerHTML="<span class='icon-play3'></span>";
        window.clearInterval(bucle);
        }
}


function mover(e){
    if(!video.paused && !video.ended){
        var ratonX=e.pageX-offsetizquierda;
        console.log(ratonX)
        var nuevoTiempo=ratonX*video.duration/maximo;
        video.currentTime=nuevoTiempo;
        rangoProgreso.style.width=ratonX+'px';
        }
}



/*Seccion Discos */

let canciones = document.querySelector('.canciones');

let disco = document.getElementsByClassName('disc')

for(let i=0; i< disco.length; i++){
    disco[i].addEventListener('mousemove',e=>{
        
        if(e.target.id=="img1"){
             canciones.innerHTML=`
             <h3>SOLO DE PIANO</h3></br>  
             <p>Grabado en estudios ION <br/>
             Año: 2007  <br/>
             Cantante Invitado:Carlos Rossi  <br/>
             Sello discografico: EPSA     <br/><br/><br/>
             </p>
             <h3>Canciones</h3></br>
             <li>Vida mía</li>
             <li>la última</li>
             <li>Nuestro Balance</li>
             <li>Cordón</li>
             <li>los Mareados</li>
             <li>Desencuentro</li>
             <li>Cosas olvidadas</li>
             <li>El adiós</li>
             `
             }
        if(e.target.id=="img2"){
             canciones.innerHTML=`
             <h3>TANGO EN VIVO</h3></br>  
             <p>Grabado en estudios ION <br/>
             Año: 2007  <br/>
             Cantante Invitado:Carlos Rossi  <br/>
             Sello discografico: EPSA     <br/><br/><br/>
             </p>
             <h3>Canciones</h3></br>
             <li>Corazón al sur</li>
             <li>Vientos del 80</li>
             <li>Solo</li>
             <li>Corralera</li>
             <li>El último café</li>
             <li>Siga el corso</li>
             <li>Yunta brava</li>
             <li>Tu olvido</li>
            `
             }
         if(e.target.id=="img3"){
             canciones.innerHTML=`
             <h3>BUENOS AIRES</h3></br>  
             <p>Grabado en estudios ION <br/>
             Año: 2007  <br/>
             Cantante Invitado:Carlos Rossi  <br/>
             Sello discografico: EPSA     <br/><br/><br/>
             </p>
             <h3>Canciones</h3></br>
             <li>El caminante</li>
             <li>la última grela</li>
             <li>Adiós Nonino</li>
             <li>Invierno porteño</li>
             <li>Desde el alma</li>
             <li>El recodo</li>
             <li>Pregonera</li>
             <li>La mariposa</li>
             `
             }
        });
}

//SVG

function agregarNotas(){
    let teclaSvg= document.getElementById("rectangulo");
    let svg= document.getElementById("svgPiano");
    let tecla=0;
    let teclaNegra=10;
    let contador=0;
    let contadorTeclaNegra=0;
    let contadorGrupoTeclas=0;
    
    while(contador<80){ 
        svg.innerHTML+=`<rect id="rectangulo" x="${tecla}" y="0" width="20" height="30" stroke="black" stroke-width="2px" fill="white">
                        <animate attributeType="XML" attributeName="opacity" from="0" to="1"
                        dur="1s" begin="0s" /> 
                        </rect>`;
        
        if (contadorGrupoTeclas==0){
            if(contadorTeclaNegra<=1){
                svg.innerHTML+=`<rect x="${teclaNegra}" y="0" width="10" height="13" stroke="black" stroke-width="2px" fill="black">
                                <animate attributeType="XML" attributeName="opacity" from="0" to="1"
                                dur="1s" begin="0s" />
                                </recct>`;
                contadorTeclaNegra +=1;
                }else{
                    svg.innerHTML+=`<rect x="${teclaNegra}" y="0" width="10" height="40" fill="rgba(255,255,255,0)">
                                    </recct>`;
                    contadorGrupoTeclas=1;
                    contadorTeclaNegra=0;
                }
            teclaNegra+=20;  
            tecla+=20;
            contador +=1;
            }else{
                if(contadorTeclaNegra<=2){
                svg.innerHTML+=`<rect x="${teclaNegra}" y="0" width="10" height="13" stroke="black" stroke-width="2px" fill="black">
                                <animate attributeType="XML" attributeName="opacity" from="0" to="1"
                                dur="1s" begin="0s" />  
                                </rect>`;
                contadorTeclaNegra +=1;
                }else{
                    svg.innerHTML+=`<rect x="${teclaNegra}" y="10" width="0" height="00" fill="rgba(255,255,255,0)">
                                    </recct>`;
                    contadorTeclaNegra=0;
                    contadorGrupoTeclas=0
                }
            teclaNegra+=20;  
            tecla+=20;
            contador +=1;
                
            }
       
        }
}

agregarNotas();





