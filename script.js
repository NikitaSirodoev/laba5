var images = [];

var body1 = document.getElementsByTagName("body")[0];
var div1 = document.createElement("div");

var modalImg = document.createElement("img");
var sLeft = document.createElement("img");
var sRight = document.createElement("img");
var exit = document.createElement("img");

var shet = document.createElement("p");
shet.style.position = "absolute";  
shet.style.fontSize = "80%";
shet.style.left = "1%";
shet.style.top = "1%";

var text;
var modalIsOpen = 0;

exit.src = "krest.png";
exit.style.width = "3%";
exit.style.position = "absolute";
exit.style.left = "96%";
exit.style.top = "1%";

sLeft.src = "strl2.jpg";
sLeft.style.width = "5%";
sLeft.style.position = "absolute";
sLeft.style.top = "40%";
sLeft.style.left = "4%";

sRight.src = "strl1.jpg";
sRight.style.width = "5%";
sRight.style.position = "absolute";
sRight.style.top = "40%";
sRight.style.left = "91%";

div1.appendChild(sRight);
div1.appendChild(exit);
div1.appendChild(sLeft);

div1.style.width = "50%";
div1.style.zIndex = "0";
div1.style.border = "0,5px black solid";
div1.style.position = "fixed";
div1.style.background = "white";
div1.style.top = "26%";
div1.style.boxShadow = "0 0 80px";

exit.addEventListener("click", del)
exit.addEventListener("mousemove", move);
exit.addEventListener("mouseout", nonmove);

function del() {
    body1.removeChild(div1);
    exit.style.width = "3%";
}

function move() {
    exit.style.width = "3.5%";
}

function nonmove() {
    exit.style.width = "3%";
}

sLeft.addEventListener("click", clickLeft);
sLeft.addEventListener("mousemove", moveS1);
sLeft.addEventListener("mouseout", nonmoveS1);

sRight.addEventListener("click", clickRight);
sRight.addEventListener("mousemove", moveS2);
sRight.addEventListener("mouseout", nonmoveS2);

function moveS1() {
    sLeft.style.width = "6%";
}

function nonmoveS1() {
    sLeft.style.width = "5%";
}

function moveS2() {
    sRight.style.width = "6%";
}

function nonmoveS2() {
    sRight.style.width = "5%";
}

function clickLeft(shetcik) {
    if (currentKey > 0) {
        currentKey--;
    }
    showImageByKey(currentKey);
}

function clickRight(shetchik) {
    if (currentKey < images.length) {
        currentKey++;
    }
    showImageByKey(currentKey);
}

function showImageByKey(key) {
    var photo = images[key];
    if (modalIsOpen > 0) {
        shet.removeChild(text);
        div1.removeChild(shet);
    } else {
        modalIsOpen = 1;
    }
    shetchik = +key + 1;
    text = document.createTextNode(shetchik + "/" + images.length);
    shet.appendChild(text);
    shet.style.position = "absolute";
    shet.style.left = "1%";
    shet.style.top = "1%";
    div1.appendChild(shet);
    for (var k in photo.sizes) {
        if (photo.sizes[k].type === "r") {
            modalImg.src = photo.sizes[k].url;

        }
    }
}

var shetchik;

function showImage(a) {
    var key = a.getAttribute("data-image-id");
    var photo = images[key];
    currentKey = key; 
    div1.style.zIndex = "999";

    if (modalIsOpen > 0) {
        shet.removeChild(text);
        div1.removeChild(shet);
    } else {
        modalIsOpen = 1;
    }
    
    shetchik = +currentKey + 1;
    text = document.createTextNode(shetchik + "/" + images.length);
    shet.appendChild(text);
    div1.appendChild(shet);

    for (var k in photo.sizes) {
        if (photo.sizes[k].type === "r") {
            modalImg.src = photo.sizes[k].url;
            modalImg.style.marginLeft = "15%";
            modalImg.setAttribute = ('data-image-id', key);
            modalImg.style.marginTop = "2%";
            modalImg.style.marginBottom = "2%";
            modalImg.style.width = "70%"

            div1.appendChild(modalImg);
        }
    }
    body1.appendChild(div1);
}

var container = document.getElementsByClassName("container")[0];

function load() {

    var newDiv = document.createElement("div");
    container.appendChild(newDiv);

    for (var i in images) {
        var photo = images[i];

        for (var k in photo.sizes) {
            if (photo.sizes[k].type === "p") {
                var img = document.createElement("img");
                img.className = "classImg";
                img.setAttribute('data-image-id', i);
                img.src = photo.sizes[k].url;
                img.style.marginBottom = '5px';

                img.addEventListener("click", function () {
                    showImage(this);
                })
                newDiv.appendChild(img);
            }
        }
    }
    newDiv.style.display = "flex";
    newDiv.style.alignItems = "flex-start";
    newDiv.style.justifyContent = "space-around";
    newDiv.style.flexWrap = "wrap";
}

var script = document.createElement('SCRIPT');
script.src = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);
function callbackFunc(result) {
    images = result.response.items;
    load();
    container.style.border = "1px solid black";
    container.style.borderRadius = "5px";
    container.style.paddingTop = "3px";
}