export default function decorate(block) {
  const cards = Array.from(block.children).map((card) => {
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
 return card;
  });

  // Check if it's a mobile view (you can adjust the breakpoint)
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  if (isMobile()) {
    // Create a carousel container
    const carouselContainer = document.createElement('div');
 carouselContainer.classList.add('3-card-teaser-carousel');

    // Append cards to the carousel container
    cards.forEach((card) => carouselContainer.appendChild(card));

    // Create navigation dots
    const navDots = document.createElement('div');
 navDots.classList.add('3-card-teaser-nav-dots');
    cards.forEach((_, index) => {
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

    // Create navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.classList.add('3-card-teaser-arrow', '3-card-teaser-prev-arrow');
    prevArrow.innerHTML = '<'; // Left arrow character
    const nextArrow = document.createElement('button');
    nextArrow.classList.add('3-card-teaser-arrow', '3-card-teaser-next-arrow');
    nextArrow.innerHTML = '>'; // Right arrow character

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
  }
}