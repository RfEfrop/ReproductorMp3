var canciones=[];
var url="audio/";
var i=0;

function aleatorio(){
	i=Math.floor(Math.random()*canciones.length);
	let reproductor = document.getElementById("cancion");
    reproductor.setAttribute("src",url+canciones[i]);
	reproductor.addEventListener("ended", () => {aleatorio();});
	resetLabel();
	updateLabel();
	guardarPlaylist();
	
}
function siguiente(){
	resetLabel();
	let reproductor = document.getElementById("cancion");
	if(i<canciones.length-1){
    reproductor.setAttribute("src",url+canciones[i+1]);
	i++;
	updateLabel();
	}else{
    reproductor.setAttribute("src",url+canciones[0]);
	i=0;
	updateLabel();
	}
	
}
function anterior(){
	resetLabel();
	let reproductor = document.getElementById("cancion");
	if(i>0 && i<canciones.length+1){
	reproductor.setAttribute("src",url+canciones[i-1]);
	i--;
	updateLabel();
	}else{
		j=canciones.length-1;
		reproductor.setAttribute("src",url+canciones[j]);
		i=canciones.length-1;
		updateLabel();
	}
}
function getUrl(){
	let largo=document.getElementById('inputFile').files.length;
	
	for(i=0;i<largo;i++){
		canciones[i]=document.getElementById("inputFile").files[i].name;
	}
	lista();
}
//listar las canciones en pantalla
/*function lista(){
	for(i=0;i<canciones.length;i++){
	var newLi=document.createElement("a");
	newLi.setAttribute("onclick","seleccion("+"'"+url+canciones[i]+"'"+")");
	var contentLi=document.createTextNode(canciones[i]);
	newLi.appendChild(contentLi);
	
	var currentUl=document.getElementById("listing")
	document.body.insertBefore(newLi,currentUl);
	}
	
	aleatorio();
}*/
//nueva forma de listar para permitir que el usuario recargue con el boton regargarlista
function lista() {
    let ul = document.createElement("ul");
    ul.id = "playlist";

    for (let j = 0; j < canciones.length; j++) {
        let li = document.createElement("li");
        li.textContent = canciones[j];
        li.classList.add("cancionItem");
        li.onclick = () => seleccion(canciones[j]);
        ul.appendChild(li);
    }

    let listing = document.getElementById("listing");
    listing.innerHTML = ""; // Limpiar lista anterior
    listing.appendChild(ul);

    aleatorio();
}

function resetLabel(){
	var newLabel = document.getElementById("titleSong");
	newLabel.innerHTML = " ";
}
function updateLabel(){
	var newLabel = document.getElementById("titleSong");
	var contentLabel = document.createTextNode("");
	contentLabel = document.createTextNode("Playing now: "+canciones[i]);
	newLabel.appendChild(contentLabel);
}

function seleccion(aa){
	resetLabel();
	let reproductor = document.getElementById("cancion");
	reproductor.setAttribute("src",url+aa);
	updateLabel1(aa);
	}

function updateLabel1(aa){
	var newLabel = document.getElementById("titleSong");
	var contentLabel = document.createTextNode("");
	let titulo=aa.replace("audio/musica/", " ");
	contentLabel = document.createTextNode("Playing now: "+titulo);
	newLabel.appendChild(contentLabel);
}
// Guarda en localStorage
function guardarPlaylist() {
    localStorage.setItem('playlist', JSON.stringify(canciones));
	//let data = JSON.stringify(localStorage.getItem('playlist'));
	//alert(data);
}

// Carga desde localStorage
function cargarPlaylist() {
    let data = localStorage.getItem('playlist');
	if(data){
		let canciones1 = JSON.parse(data);
		canciones=canciones1;
		aleatorio();
		getUrl();//alert(canciones1);
	}else{
		alert("no hay Lista guarda")
	}
	
}

// Borra la playlist guardada
function limpiarPlaylistGuardada() {
    localStorage.removeItem("playlist");
	alert("lista borrada");
}

