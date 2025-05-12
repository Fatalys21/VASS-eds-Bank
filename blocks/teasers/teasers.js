import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Find the tables within the block. The first is the block definition, the second is the content.
  const tables = block.querySelectorAll('table');
  const contentTable = tables[1]; // Get the second table (the content table)

  if (!contentTable) {
    // If no content table is found, there's nothing to render
    return;
  }

  const ul = document.createElement('ul');
  ul.classList.add('teasers-list'); // Add a class to the ul

  // Get rows, skipping the header row (slice(1))
  const rows = Array.from(contentTable.querySelectorAll('tr')).slice(1);

  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll('td'));
    if (cells.length >= 4) {
      const iconCell = cells[0];
      const titleCell = cells[1];
      const descriptionCell = cells[2];
      const linkCell = cells[3];

      const li = document.createElement('li');
      li.classList.add('teasers-card'); // Add class to the li

      // --- Process Icon ---
      const iconDiv = document.createElement('div');
      iconDiv.classList.add('teasers-card-image');
      // Assuming the icon cell contains an image or a picture element
      const icon = iconCell.querySelector('picture') || iconCell.querySelector('img');
      if (icon) {
        iconDiv.appendChild(icon.cloneNode(true)); // Clone the image/picture
      }
      li.appendChild(iconDiv);

      // --- Process Title and Description ---
      const bodyDiv = document.createElement('div');
      bodyDiv.classList.add('teasers-card-body');

      const title = document.createElement('h3');
      title.classList.add('teasers-title');
      title.innerHTML = titleCell.innerHTML; // Use innerHTML to preserve formatting/links within title if any
      bodyDiv.appendChild(title);

      const description = document.createElement('p');
      description.classList.add('teasers-description');
      description.innerHTML = descriptionCell.innerHTML; // Use innerHTML for description
      bodyDiv.appendChild(description);

      li.appendChild(bodyDiv);

      // --- Process Link ---
      const link = linkCell.querySelector('a');
      if (link && link.href) {
        const linkWrapper = document.createElement('a');
        linkWrapper.classList.add('teasers-link'); // Add link class
        linkWrapper.href = link.href;
        // Move all content from li into the anchor tag
        while (li.firstElementChild) {
          linkWrapper.appendChild(li.firstElementChild);
        }
        ul.appendChild(linkWrapper); // Append the anchor tag containing the card content
      } else {
        ul.appendChild(li); // Append the li if no link
      }
    }
  });

  // Clear the original block content (which includes the tables)
  block.innerHTML = '';

  // --- Mobile Carousel Logic ---
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches; // Define mobile breakpoint

  if (isMobile()) {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('teasers-carousel'); // Container for the carousel items

    const teasers = Array.from(ul.children); // Get the li/a elements inside the ul
    ul.remove(); // Remove the ul temporarily

    teasers.forEach(teaser => carouselContainer.appendChild(teaser));
    block.appendChild(carouselContainer); // Add the carousel container

    // Create Navigation Dots
    const navDots = document.createElement('div');
    navDots.classList.add('teasers-nav-dots');
    teasers.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('teasers-dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        showTeaser(index);
      });
      navDots.appendChild(dot);
    });
    block.appendChild(navDots);

    // Create Navigation Arrows
    const prevArrow = document.createElement('button');
    prevArrow.classList.add('teasers-arrow', 'teasers-prev-arrow');
    prevArrow.innerHTML = '&lt;'; // Left arrow
    const nextArrow = document.createElement('button');
    nextArrow.classList.add('teasers-arrow', 'teasers-next-arrow');
    nextArrow.innerHTML = '&gt;'; // Right arrow

    block.appendChild(prevArrow);
    block.appendChild(nextArrow);

    let currentTeaserIndex = 0;

    const showTeaser = (index) => {
        teasers.forEach((teaser, i) => {
            // For carousel, we typically move the container, not hide individual items
            // Let's adjust to show/hide for simplicity if direct manipulation is easier
            teaser.style.display = i === index ? 'block' : 'none';
        });
        navDots.querySelectorAll('.teasers-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTeaserIndex = index;
         // Disable/enable arrows
        prevArrow.disabled = currentTeaserIndex === 0;
        nextArrow.disabled = currentTeaserIndex === teasers.length - 1;
    };

    // Initial state
    showTeaser(0);


    prevArrow.addEventListener('click', () => {
      const newIndex = Math.max(0, currentTeaserIndex - 1);
      showTeaser(newIndex);
    });

    nextArrow.addEventListener('click', () => {
      const newIndex = Math.min(teasers.length - 1, currentTeaserIndex + 1);
      showTeaser(newIndex);
    });

  } else {
     // Desktop view: append the ul directly (grid layout handled by CSS)
     block.appendChild(ul);
  }

  // Optimize images after they are added to the DOM
  ul.querySelectorAll('picture > img').forEach((img) => {
    if (!img.closest('picture')) { // Ensure it's not already in a picture tag
       img.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]));
    }
  });
}
