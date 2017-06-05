// Most of this is being recoded, but currently looks like this

var browse = document.getElementById("browse"), popUp1 = document.getElementById('pop-up1'), popUp2 = document.getElementById('pop-up2'), btn = document.getElementById("myBtn"), span1 = document.getElementsByClassName("close")[0], span2 = document.getElementsByClassName("close")[1];
for (var i in localStorage) {
    if (i.substr(0, "LC+-chatName-".length) === "LC+-chatName-") {
        var val = i.substr("LC+-chatName-".length, i.length);
        var newBox = document.createElement("div");
        newBox.className = "big-button";
        newBox.textContent = val;
        newBox.onclick = function() {

        };
        browse.appendChild(newBox);
    }
}
/*var newChat = document.createElement("div");
newChat.className = "big-button";
newChat.innerHTML = "<strong style='font-size: 12vw; margin: -20%;'>+</strong><br style='margin-top: -17%;'>New Chat";*/
newChat.onclick = function() {
    popUp2.style.display = "block";
};
browse.appendChild(newChat);
btn.onclick = function() {
    popUp1.style.display = "block";
};

span1.onclick = function() {
    popUp1.style.display = "none";
};
span2.onclick = function() {
    popUp2.style.display = "none";
};
window.onclick = function(event) {
    if (event.target === popUp1 || event.target === popUp2) {
        popUp1.style.display = "none";
        popUp2.style.display = "none";
    }
};

var addChat = function() {
    //localStorage.setItem("LC+")
    popUp2.style.display = "none";
    window.location.reload();
};
