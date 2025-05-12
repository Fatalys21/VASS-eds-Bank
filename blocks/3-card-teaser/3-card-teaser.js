export default function decorate(block) {
  const cards = Array.from(block.children);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    // Create a carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('3-card-teaser-carousel');

    // Create navigation dots
    const navDots = document.createElement('div');
    navDots.classList.add('3-card-teaser-nav-dots');

    // Create navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.classList.add('3-card-teaser-arrow', '3-card-teaser-prev-arrow');
    prevArrow.innerHTML = '&lt;'; // Left arrow character
    const nextArrow = document.createElement('button');
    nextArrow.classList.add('3-card-teaser-arrow', '3-card-teaser-next-arrow');
    nextArrow.innerHTML = '&gt'; // Right arrow character

    cards.forEach((card, index) => {
      card.classList.add('3-card-teaser-card');
      card.style.display = index === 0 ? 'block' : 'none'; // Show only the first card initially

      const iconWrapper = card.children[0];
      if (iconWrapper) {
        iconWrapper.classList.add('3-card-teaser-icon');
      }

      const title = card.children[1];
      if (title) {
        title.classList.add('3-card-teaser-title');
      }

      const description = card.children[2];
      if (description) {
        description.classList.add('3-card-teaser-description');
      }

      carouselContainer.appendChild(card);

      // Create a dot for each card
      const dot = document.createElement('span');
      dot.classList.add('3-card-teaser-dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        showCard(index);
      });
      navDots.appendChild(dot);
    });

    block.innerHTML = ''; // Clear the original content
    block.appendChild(carouselContainer);
    block.appendChild(prevArrow);
    block.appendChild(nextArrow);
    block.appendChild(navDots);

    let currentCardIndex = 0;

    const showCard = (index) => {
      cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });
      navDots.querySelectorAll('.3-card-teaser-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentCardIndex = index;
    };

    prevArrow.addEventListener('click', () => {
      const newIndex = (currentCardIndex - 1 + cards.length) % cards.length;
      showCard(newIndex);
    });

    nextArrow.addEventListener('click', () => {
      const newIndex = (currentCardIndex + 1) % cards.length;
      showCard(newIndex);
    });

  } else {
    cards.forEach((card) => {
      card.classList.add('3-card-teaser-card');

      const iconWrapper = card.children[0];
      if (iconWrapper) {
        iconWrapper.classList.add('3-card-teaser-icon');
      }

      const title = card.children[1];
      if (title) {
        title.classList.add('3-card-teaser-title');
      }

      const description = card.children[2];
      if (description) {
        description.classList.add('3-card-teaser-description');
      }
    });
  }
    }
  });
}