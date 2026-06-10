
const card = document.querySelector(".card");

document.addEventListener("mousemove",(e)=>{

    const x =
    (window.innerWidth/2 - e.pageX)/35;

    const y =
    (window.innerHeight/2 - e.pageY)/35;

    card.style.transform =
    'rotateY(${x}deg) rotateX(${-y}deg)';

});


const stars = document.querySelector(".stars");

for(let i=0;i<200;i++){

    const star = document.createElement("div");

    star.style.position = "absolute";

    const size =
    Math.random()*3;

    star.style.width =
    size + "px";

    star.style.height =
    size + "px";

    star.style.background = "white";

    star.style.borderRadius = "50%";

    star.style.left =
    Math.random()*100 + "%";

    star.style.top =
    Math.random()*100 + "%";

    star.style.opacity =
    Math.random();

    stars.appendChild(star);

}
