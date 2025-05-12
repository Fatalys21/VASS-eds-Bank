import { decorateIcons } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  // Find the tables within the block
  const tables = block.querySelectorAll('table');

  // Ensure there are at least two tables (block definition and content)
  if (tables.length < 2) {
    console.warn('New Teasers block requires at least two tables in the Google Doc.');
    return;
  }

  // The second table contains the teaser content
  const contentTable = tables[1];
  const cards = [];

  // Iterate through table rows, skipping the header (first row)
  Array.from(contentTable.querySelectorAll('tr')).slice(1).forEach((row) => {
    const cols = Array.from(row.querySelectorAll('td'));
    if (cols.length >= 4) { // Ensure there are at least 4 columns
      const iconCell = cols[0];
      const titleCell = cols[1];
      const descriptionCell = cols[2];
      const linkCell = cols[3];

      const card = document.createElement('div');
      card.classList.add('new-teasers-card');

      // Icon
      const icon = iconCell.querySelector('img');
      if (icon) {
        const iconWrapper = document.createElement('div');
        iconWrapper.classList.add('new-teasers-icon');
        iconWrapper.appendChild(icon);
        card.appendChild(iconWrapper);
      }

      // Title
      const title = document.createElement('h3');
      title.classList.add('new-teasers-title');
      title.innerHTML = titleCell.innerHTML;
      card.appendChild(title);

      // Description
      const description = document.createElement('p');
      description.classList.add('new-teasers-description');
      description.innerHTML = descriptionCell.innerHTML;
      card.appendChild(description);

      // Link
      const linkElement = linkCell.querySelector('a');
      if (linkElement) {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = linkElement.href;
        linkWrapper.classList.add('new-teasers-link');
        // Wrap the entire card content in the link
        Array.from(card.children).forEach(child => linkWrapper.appendChild(child));
        cards.push(linkWrapper); // Add the link wrapper (containing the card) to the cards array
      } else {
        cards.push(card); // Add the card if no link is provided
      }
    }
  });

  // Clear the original content of the block (the tables)
  block.innerHTML = '';

  // Check if it's a mobile view for carousel
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches; // Adjust breakpoint as needed

  if (isMobile() && cards.length > 0) {
    // Create carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('new-teasers-carousel');

    // Append cards to the carousel container
    cards.forEach((card) => {
        card.style.display = 'none'; // Hide all cards initially
        carouselContainer.appendChild(card);
    });

    // Create navigation dots
    const navDots = document.createElement('div');
    navDots.classList.add('new-teasers-nav-dots');
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('new-teasers-dot');
      if (index === 0) {
        dot.classList.add('active'); // Indicate the initially active dot
        cards[index].style.display = 'block'; // Show the first card
      }
      dot.addEventListener('click', () => {
        showCard(index);
      });
      navDots.appendChild(dot);
    });

    // Create navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.classList.add('new-teasers-arrow', 'new-teasers-prev-arrow');
    prevArrow.innerHTML = '<'; // Left arrow character
    const nextArrow = document.createElement('button');
    nextArrow.classList.add('new-teasers-arrow', 'new-teasers-next-arrow');
    nextArrow.innerHTML = '>'; // Right arrow character

    block.appendChild(carouselContainer);
    if (cards.length > 1) { // Only add arrows and dots if there's more than one card
      block.appendChild(prevArrow);
      block.appendChild(nextArrow);
      block.appendChild(navDots);
    }

    let currentCardIndex = 0;

    const showCard = (index) => {
      cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });
      navDots.querySelectorAll('.new-teasers-dot').forEach((dot, i) => {
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
      // Desktop view: Append cards directly
      const desktopContainer = document.createElement('div');
      desktopContainer.classList.add('new-teasers-desktop');
      cards.forEach(card => desktopContainer.appendChild(card));
      block.appendChild(desktopContainer);
  }

  // Decorate icons if any were added dynamically
  decorateIcons(block);
}