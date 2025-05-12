import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const table = block.querySelector('table');
  const ul = document.createElement('ul');
  ul.classList.add('teasers-cards-list'); // Add a class to the ul

  if (table) {
    // Iterate through table rows, skipping the header (first row)
    Array.from(table.querySelectorAll('tr')).slice(1).forEach((row) => {
      const cols = Array.from(row.querySelectorAll('td'));
      if (cols.length >= 4) { // Ensure there are at least 4 columns (Icon, Title, Description, Link)
        const iconCell = cols[0];
        const titleCell = cols[1];
        const descriptionCell = cols[2];
        const linkCell = cols[3];

        const li = document.createElement('li');
        li.classList.add('teasers-card');

        // Create image div
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('teasers-card-image');
        const icon = iconCell.querySelector('img') || iconCell.querySelector('picture');
        if (icon) {
          imageDiv.appendChild(icon);
        }
        li.appendChild(imageDiv);

        // Create body div
        const bodyDiv = document.createElement('div');
        bodyDiv.classList.add('teasers-card-body');

        const title = document.createElement('h3');
        title.classList.add('teasers-title');
        title.innerHTML = titleCell.innerHTML;
        bodyDiv.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('teasers-description');
        description.innerHTML = descriptionCell.innerHTML;
        bodyDiv.appendChild(description);

        li.appendChild(bodyDiv);

        // Handle the link
        const link = linkCell.querySelector('a');
        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.classList.add('teasers-link'); // Add a class for styling the link
          // Move all li children into the anchor
          while (li.firstElementChild) {
            anchor.appendChild(li.firstElementChild);
          }
          ul.appendChild(anchor); // Append the anchor to the ul
        } else {
          ul.appendChild(li); // Append the li to the ul if no link
        }
      }
    });
    table.remove(); // Remove the original table from the block
  }

  // Optimize images after creating the structure
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  block.textContent = '';
  block.append(ul);

  // Mobile Carousel Functionality
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  if (isMobile()) {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('teasers-carousel');
    block.insertBefore(carouselContainer, ul);
    carouselContainer.appendChild(ul);

    // Add navigation dots and arrows (similar to previous implementation)
    // This part needs to be implemented based on your specific carousel logic
    // You would add event listeners to these arrows/dots to control the carousel
    // Example placeholders:
    // const navDots = document.createElement('div');
    // navDots.classList.add('teasers-nav-dots');
    // block.appendChild(navDots);
    // const prevArrow = document.createElement('button');
    // prevArrow.classList.add('teasers-arrow', 'teasers-prev-arrow');
    // block.appendChild(prevArrow);
    // const nextArrow = document.createElement('button');
    // nextArrow.classList.add('teasers-arrow', 'teasers-next-arrow');
    // block.appendChild(nextArrow);
    // Implement showCard, currentCardIndex, and event listeners for navigation
  }
}
