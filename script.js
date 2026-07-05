// ===============================
// BLAQUETEE GRAPHICS
// Main JavaScript
// ===============================

// Reveal animation on scroll

const reveals = document.querySelectorAll(".card, .album, .contact, .services");

function revealOnScroll() {

    reveals.forEach(item => {

        const windowHeight = window.innerHeight;
        const revealTop = item.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// Navbar background on scroll

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        navbar.style.background = "rgba(5,10,25,.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";

    }else{

        navbar.style.background = "rgba(0,0,0,.55)";
        navbar.style.boxShadow = "none";

    }

});


// Smooth button effect

const buttons = document.querySelectorAll(".btn1,.btn2,.call-btn");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="scale(1.08)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="scale(1)";

});

});


// Back To Top Button

const topButton = document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.right = "20px";
topButton.style.bottom = "20px";
topButton.style.width = "55px";
topButton.style.height = "55px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#FFD200";
topButton.style.color = "#111";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.zIndex = "9999";
topButton.style.boxShadow = "0 0 20px #FFD200";


window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});


topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


// Typing Effect

const heading = document.querySelector(".hero h3");

if(heading){

const text = heading.innerText;

heading.innerHTML="";

let i=0;

function typing(){

if(i<text.length){

heading.innerHTML += text.charAt(i);

i++;

setTimeout(typing,80);

}

}

typing();

}


// Floating Cards

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x=e.offsetX;
const y=e.offsetY;

card.style.transform=
`rotateX(${(y-120)/20}deg)
 rotateY(${-(x-120)/20}deg)
 scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0) scale(1)";

});

});


// Inline album gallery: toggle gallery inside album card
document.querySelectorAll('.open-album').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.stopPropagation();
        const album = btn.closest('.album');
        if(!album) return;
        const gallery = album.querySelector('.album-gallery');
        const isOpen = album.classList.toggle('expanded');
        if(gallery) gallery.setAttribute('aria-hidden', String(!isOpen));
        if(isOpen) gallery.scrollIntoView({behavior:'smooth', block:'center'});
    });
});

// Lightbox viewer: open clicked gallery image full-screen and navigate
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');

let lbImages = [];
let lbIndex = 0;

function openLightbox(images, index){
    lbImages = images.slice();
    lbIndex = index || 0;
    lbImg.src = lbImages[lbIndex];
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    lbImages = [];
    document.body.style.overflow = '';
}

function showPrev(){
    if(!lbImages.length) return;
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
}

function showNext(){
    if(!lbImages.length) return;
    lbIndex = (lbIndex + 1) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
}

// Image clicks inside any album-gallery
document.querySelectorAll('.album-gallery').forEach(gallery=>{
    const imgs = Array.from(gallery.querySelectorAll('img'));
    imgs.forEach((img, i)=>{
        img.addEventListener('click',(e)=>{
            e.stopPropagation();
            const sources = imgs.map(x=>x.src);
            openLightbox(sources, i);
        });
    });
});

// Allow clicking the album cover (visible image) to open the lightbox
document.querySelectorAll('.album').forEach(album=>{
    const cover = album.querySelector('img');
    const gallery = album.querySelectorAll('.album-gallery img');
    if(cover && gallery && gallery.length){
        cover.style.cursor = 'pointer';
        cover.addEventListener('click',(e)=>{
            e.stopPropagation();
            const sources = Array.from(gallery).map(i=>i.src);
            const startIndex = sources.indexOf(cover.src);
            openLightbox(sources, startIndex >= 0 ? startIndex : 0);
        });
    }
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click',(e)=>{ if(e.target === lightbox) closeLightbox(); });
lbPrev.addEventListener('click',(e)=>{ e.stopPropagation(); showPrev(); });
lbNext.addEventListener('click',(e)=>{ e.stopPropagation(); showNext(); });

document.addEventListener('keydown',(e)=>{
    if(lightbox.getAttribute('aria-hidden') === 'false'){
        if(e.key === 'Escape') closeLightbox();
        if(e.key === 'ArrowLeft') showPrev();
        if(e.key === 'ArrowRight') showNext();
    }
});

// Basic touch swipe support
let touchStartX = 0;
let touchEndX = 0;
lightbox.addEventListener('touchstart',(e)=>{ touchStartX = e.changedTouches[0].screenX; });
lightbox.addEventListener('touchend',(e)=>{ touchEndX = e.changedTouches[0].screenX; const diff = touchStartX - touchEndX; if(Math.abs(diff) > 40){ if(diff > 0) showNext(); else showPrev(); } });