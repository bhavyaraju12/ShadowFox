function initProjectCarousel() {
    const projectContainer = document.getElementById('pro');
    if (!projectContainer) return;
  
    if (window.innerWidth <= 768) {
      const projects = Array.from(projectContainer.children);
      
      
      const carouselContainer = document.createElement('div');
      carouselContainer.className = 'carousel-container';
      
      const carouselTrack = document.createElement('div');
      carouselTrack.className = 'carousel-track';
      
     
      projects.forEach(project => {
        carouselTrack.appendChild(project);
      });
      
      carouselContainer.appendChild(carouselTrack);
      
    
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'carousel-buttons';
      
      const prevButton = document.createElement('button');
      prevButton.className = 'carousel-button';
      prevButton.textContent = 'Previous';
      
      const nextButton = document.createElement('button');
      nextButton.className = 'carousel-button';
      nextButton.textContent = 'Next';
      
      buttonsContainer.appendChild(prevButton);
      buttonsContainer.appendChild(nextButton);
      
     
      projectContainer.innerHTML = '';
      projectContainer.appendChild(carouselContainer);
      projectContainer.appendChild(buttonsContainer);
      
      let currentIndex = 0;
      
     
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
      });
      
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
      });
      
      function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
      }
    }
  }
  
  
  window.addEventListener('load', initProjectCarousel);
  window.addEventListener('resize', initProjectCarousel);
