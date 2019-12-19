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

$(document).ready(function() {
    getLeftBtnData("json/left_btn.json", (data) => {
        let container = document.getElementsByClassName('accordion_container')[0];
        for(let i = 0; i < data.length; i++) {
            let accordion_head = document.createElement('div');

            let row = document.createElement('div');
            row.style = "display:flex; align-items: center";

            let text = document.createElement('span');



            let img = document.createElement('img');
            let img_minus = document.createElement('img');


            text.innerHTML = data[i].headName;
            img.src = data[i].icon;
            img_minus.src = "img/plus.png";

            img_minus.onclick = function() {
                let id = data[i].id.toString();
                if(img_minus.src.indexOf("plus.png") !== -1){
                    img_minus.src = "img/minus.png";
                    document.getElementById(id).style.display = "block";
                }else{
                    img_minus.src = "img/plus.png";
                    document.getElementById(id).style.display = "none";
                }
            };

            row.appendChild(img_minus);
            row.appendChild(img);
            row.appendChild(text);
            accordion_head.appendChild(row);

            accordion_head.style.paddingLeft = data[i].padding_left;
            let localData = data[i];
            while(localData.subMenu){
                let accordion_head_inner = document.createElement('div');
                accordion_head_inner.id = localData.id;
                for(let j = 0; j < localData.subMenu.length; j++) {
                    let row_inner = document.createElement('div');
                    row_inner.style = "display:flex; align-items: center";

                    let text_inner = document.createElement('span');
                    let img_inner = document.createElement('img');
                    let img_minus_inner = document.createElement('img');

                    text_inner.innerHTML = localData.subMenu[j].headName;
                    img_inner.src = localData.subMenu[j].icon;
                    img_minus_inner.src = "img/plus.png";

                    let id = localData.subMenu[j].id.toString();
                    img_minus_inner.onclick = function() {
                        if(img_minus_inner.src.indexOf("plus.png") !== -1){
                            img_minus_inner.src = "img/minus.png";
                            //document.getElementById(id).style.display = "block";
                        }else{
                            img_minus_inner.src = "img/plus.png";
                            //document.getElementById(id).style.display = "none";
                        }
                    };

                    row_inner.appendChild(img_minus_inner);
                    row_inner.appendChild(img_inner);
                    row_inner.appendChild(text_inner);

                    accordion_head_inner.appendChild(row_inner);

                    accordion_head_inner.style.paddingLeft = localData.subMenu[j].padding_left;
                    accordion_head.appendChild(accordion_head_inner);
                    accordion_head_inner.style.display = "none";
                }
                localData = localData.subMenu;
            }
            container.appendChild(accordion_head);
        }
    });




// <div class="accordion_head">
//         <span class="plusminus"></span>
//         <img src="img/plus.png" alt="">
//         </div>

    //toggle the component with class accordion_body
    // $(".accordion_head").click(function() {
    //     if ($('.accordion_body').is(':visible')) {
    //         $(".accordion_body").slideUp(300);
    //         $(".plusminus").text('+');
    //     }
    //     if ($(this).next(".accordion_body").is(':visible')) {
    //         $(this).next(".accordion_body").slideUp(300);
    //         $(this).children(".plusminus").text('+');
    //     } else {
    //         $(this).next(".accordion_body").slideDown(300);
    //         $(this).children(".plusminus").text('-');
    //     }
    // });
    //
});





setTimeout(()=>{	
	removeLoading("loading");
}, 600)



//--------------------------
function startLoading(){
	let element = document.createElement("div");
	element.id = "loading";
	element.innerHTML = "<img src='./img/download.gif'></img>";
	element.style=`height:100%;
					width : 100%; 
					background-color:rgba(0,0,0,0.6);
					position: absolute;
					top : auto;
					left : auto;
					
					`;
	document.getElementsByTagName("body")[0].appendChild(element);
}

function removeLoading(elementId){
	let removeElement = document.getElementById(elementId);
	if(removeElement){
		removeElement.parentNode.removeChild(removeElement);
	}
}


function getLeftBtnData(url, cb){
    $.ajax({
        type:'GET',
        url:url,
        dataType:'json',
        success: function(data) {
            cb(data);
        }});
}