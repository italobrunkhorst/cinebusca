function verMais(button){
    var dots = button.previousElementSibling.querySelector(".dots");
    var moreText = button.previousElementSibling.querySelector(".more");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        button.innerHTML = "Ver mais";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        button.innerHTML = "Ver menos";
        moreText.style.display = "inline";
    }
}