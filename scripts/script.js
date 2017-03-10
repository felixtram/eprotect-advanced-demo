function changeCss(){
	$("<style> h1{ color: black; } </style>").replaceAll("style");
}

window.changeCss = changeCss;