const canciones=[];
var url="audio/";
var i=0;

function aleatorio(){
	i=Math.floor(Math.random()*canciones.length);
	let reproductor = document.getElementById("cancion");
    reproductor.setAttribute("src",url+canciones[i]);
	reproductor.addEventListener("ended", () => {aleatorio();});
	resetLabel();
	updateLabel();
	
}
function siguiente(){
	resetLabel();

	let reproductor = document.getElementById("cancion");
	if(i<canciones.length-1){
    reproductor.setAttribute("src",url+canciones[i+1]);
	i++;
	updateLabel();
	}
	
}
function anterior(){
	resetLabel();
	
	let reproductor = document.getElementById("cancion");
	if(i>0){
	reproductor.setAttribute("src",url+canciones[i-1]);
	i--;
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
function lista(){
	for(i=0;i<canciones.length;i++){
	var newLi=document.createElement("a");
	newLi.setAttribute("onclick","seleccion("+"'"+url+canciones[i]+"'"+")");
	var contentLi=document.createTextNode(canciones[i]);
	newLi.appendChild(contentLi);
	
	var currentUl=document.getElementById("listing")
	document.body.insertBefore(newLi,currentUl);
	}
	
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
	reproductor.setAttribute("src",aa);
	updateLabel1(aa);
	}

function updateLabel1(aa){
	var newLabel = document.getElementById("titleSong");
	var contentLabel = document.createTextNode("");
	let titulo=aa.replace("audio/musica/", " ");
	contentLabel = document.createTextNode("Playing now: "+titulo);
	newLabel.appendChild(contentLabel);
}