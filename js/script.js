startLoading();


	$.ajax({
    type:'GET',
    url:'json/nav.json',
    dataType:'json',
    success: function(data) {


         let nav = document.getElementById("nav");

        for (let i = 0; i < data.nav_b.length; i++) {

                let div = document.createElement('div');
                div.setAttribute('class','a' + i + 1 + ' border-right');


                 let img = document.createElement('img');
                 img.setAttribute("src",`${data.nav_b[i].src}`);
                 img.setAttribute("alt","dat");
                 img.setAttribute("class","dat");
                 div.appendChild(img);

                 let links= document.createElement("a");
                 links.setAttribute("class", "navbar-brand");
                 links.setAttribute("href", "#");
                 links.innerHTML = `${data.nav_b[i].name}`;
                 div.appendChild(links);
                    nav.appendChild(div);


    }

     }
});






setTimeout(()=>{	
	removeLoading("loading");
}, 200)



//--------------------------
function startLoading(){
	let element = document.createElement("div");
	element.id = "loading";
	element.innerHTML = "<img src='./img/download.gif'></img>";
	element.style=`height:100%;
					width : 100%; 
					background-color:rgba(0,0,0,0.6);
					position: absolute;
					top : 0;
					left : 0;
					
					`;
	document.getElementsByTagName("body")[0].appendChild(element);
}

function removeLoading(elementId){
	let removeElement = document.getElementById(elementId);
	if(removeElement){
		removeElement.parentNode.removeChild(removeElement);
	}
}