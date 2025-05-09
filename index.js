

let previousMouseXPos = 0

let mouseDownPos = {
    x: 0,
    y: 0
}

let lastScrollY = 0;

window.addEventListener('DOMContentLoaded', () => {
  

    let navBarExpandBtn = document.getElementById('navBarExpandBtn');
    let navBar =   document.getElementById('navBar');
    let navBarLinkContainer = document.getElementById('navBarLinkContainer');
    navBarLinkContainer.classList.add('hidden');

    function makeNavBarTransparent() {


        console.log(`if(${window.scrollY} > ${lastScrollY})`)

        if(window.scrollY > lastScrollY){

            console.log("scrolling down")

            navBar.classList.add('bg-transparent');
            navBar.classList.remove('bg-ir-600');
            navBar.classList.add('backdrop-blur-sm');
        } else {

            console.log("scrolling up")

            navBar.classList.remove('bg-transparent');
            navBar.classList.add('bg-ir-600');
        }
        lastScrollY = window.scrollY;

        console.log("lastScrollY: " + lastScrollY)
        

    }

    let docsCarousel = document.getElementById("doctors_cards")

    docsCarousel.scrollLeft = 1;

    function scrollCarousel(e) {
        
        if(window.innerWidth > 768){
            e.preventDefault();
        }
        this.scrollLeft += e.deltaY * 0.8;

        if(this.scrollLeft <= 0){
            this.scrollLeft = 1;
        }

    }

    function mouseClickScroll(e){

        
        // docsCarousel.scrollLeft += (docsCarousel.scrollLeft + (mouseDownPos.x - e.clientX)) * 0.40;

        if(previousMouseXPos < e.clientX){
            docsCarousel.scrollLeft -= Math.sqrt((docsCarousel.scrollLeft + (mouseDownPos.x - e.clientX))) * .65;
        }
        if(previousMouseXPos > e.clientX){
            docsCarousel.scrollLeft += Math.sqrt((docsCarousel.scrollLeft + (mouseDownPos.x - e.clientX))) * .65;
        }

        console.dir(e.clientX - previousMouseXPos)
        console.dir("e.clientX: " + e.clientX)
        console.dir("mouseDownPos.x: " + mouseDownPos.x)

        if(this.scrollLeft <= 0){
            this.scrollLeft = 1;
        }

        previousMouseXPos = e.clientX;

    }

    docsCarousel.addEventListener("wheel", scrollCarousel)
    
    docsCarousel.addEventListener("mousedown", function(e) {

        mouseDownPos.x = e.clientX;
        mouseDownPos.y = e.clientY;

        function mouseUp(){

            mouseDownPos.x = 0;
            mouseDownPos.y = 0;
            docsCarousel.removeEventListener("mousemove", mouseClickScroll)
            docsCarousel.removeEventListener("mouseup", mouseUp)
        }
        
        docsCarousel.addEventListener("mousemove", mouseClickScroll)

        docsCarousel.addEventListener("mouseup", mouseUp)   

    })


    window.addEventListener('resize', function() {

        if(!navBarLinkContainer.classList.contains('hidden')){

            navBarLinkContainer.classList.add('hidden');
            navBarLinkContainer.dataset.appear = "false";
            
        } 

    }   
);

    window.addEventListener('scroll', () => {

        
        makeNavBarTransparent()

    })


    function toggleNavBar() {

        if(navBarLinkContainer.classList.contains('hidden')){

            navBarLinkContainer.classList.remove('hidden');
            navBarLinkContainer.dataset.appear = "true";


        } else {

            navBarLinkContainer.classList.add('hidden');
            navBarLinkContainer.dataset.appear = "false";

        }

    }

    let navBarLinks = document.querySelectorAll('.navBarLink');
    navBarLinks.forEach(link => {
        link.addEventListener('click', function() {

            toggleNavBar()

        })
    }
    )

    navBarExpandBtn.addEventListener('click', function() {

        toggleNavBar()



    });


})