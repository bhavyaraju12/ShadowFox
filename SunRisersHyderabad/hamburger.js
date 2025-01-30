
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');

    hamMenu.addEventListener('click', function () {
      hamMenu.classList.toggle('active');
      offScreenMenu.classList.toggle('active');


    })

    const track = document.getElementById("image-track");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      track.dataset.percentage = nextPercentage;

      track.animate({
        transform: `translate(${nextPercentage}%, -1%)`
      }, { duration: 1200, fill: "forwards" });

      for (const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    }

   

    window.onmousedown = e => handleOnDown(e);

    window.ontouchstart = e => handleOnDown(e.touches[0]);

    window.onmouseup = e => handleOnUp(e);

    window.ontouchend = e => handleOnUp(e.touches[0]);

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);

    const images = document.querySelectorAll("#image-track .image");

   
    images.forEach(function (image) {
   
      image.addEventListener("mouseover", function () {
       
        var textOverlay = image.nextElementSibling;
       
        textOverlay.style.opacity = '1';
      });

      image.addEventListener("mouseover", function () {
       
        image.style.transform = 'scale(1.18)';
      });

    
      image.addEventListener("mouseout", function () {
      
        image.style.transform = 'scale(1)';
      });
     
      image.addEventListener("mouseout", function () {
       
        var textOverlay = image.nextElementSibling;
     
        textOverlay.style.opacity = '0';
      });

    });




  