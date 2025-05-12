export default function decorate(block) {
  // Find the table element within the block
  const table = block.querySelector('table');

  if (table) {
    const cards = [];
    // Iterate through table rows, skipping the header (first row)
    Array.from(table.querySelectorAll('tr')).slice(1).forEach((row) => {
      const cols = Array.from(row.querySelectorAll('td'));
      if (cols.length >= 4) { // Ensure there are at least 4 columns (Icon, Title, Description, Link)
        const iconCell = cols[0];
        const titleCell = cols[1];
        const descriptionCell = cols[2];
        const linkCell = cols[3];

        const card = document.createElement('div');
        card.classList.add('teasers-card');

        // Extract content and build card structure
        const icon = iconCell.querySelector('img');
        if (icon) card.appendChild(icon); // Append the actual image element

        const title = document.createElement('h3');
        title.classList.add('teasers-title');
        title.innerHTML = titleCell.innerHTML;
        card.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('teasers-description');
        description.innerHTML = descriptionCell.innerHTML;
        card.appendChild(description);

  // Check if it's a mobile view (you can adjust the breakpoint)
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches; // Using a common mobile breakpoint

  if (isMobile()) {
    // Create a carousel container
    const carouselContainer = document.createElement('div');
 carouselContainer.classList.add('teasers-carousel');

        // Create the link for the entire card
        const link = linkCell.querySelector('a');
        if (link) {
          link.classList.add('teasers-link');
          link.innerHTML = ''; // Clear link text, as the entire card will be clickable
          link.appendChild(card); // Wrap the card content in the link
          carouselContainer.appendChild(link); // Append the link (containing the card) to the carousel
        } else {
 carouselContainer.appendChild(card); // Append the card if no link is provided
        }

    // Append cards to the carousel container
    const navDots = document.createElement('div');
 navDots.classList.add('3-card-teaser-nav-dots');
    navDots.classList.add('teasers-nav-dots');
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
 dot.classList.add('teasers-dot');
 if (index === 0) {
 dot.classList.add('active'); // Indicate the initially active dot
      }
      dot.addEventListener('click', () => {
 showCard(index);
      });
 navDots.appendChild(dot);
    });

    // Create navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.classList.add('teasers-arrow', 'teasers-prev-arrow');
    prevArrow.innerHTML = '<'; // Left arrow character
    const nextArrow = document.createElement('button');
    nextArrow.classList.add('teasers-arrow', 'teasers-next-arrow');
    nextArrow.innerHTML = '>'; // Right arrow character

        cards.push(card); // Add the created card to the cards array for carousel logic
      }
    });

    block.innerHTML = ''; // Clear the original content
    block.appendChild(carouselContainer);
    block.appendChild(prevArrow);
    block.appendChild(nextArrow);
    block.appendChild(navDots);
    table.remove(); // Remove the original table from the block

    let currentCardIndex = 0;

    const showCard = (index) => {
 cards.forEach((card, i) => {
 card.style.display = i === index ? 'block' : 'none';
      });
 navDots.querySelectorAll('.teasers-dot').forEach((dot, i) => {
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
  } else {
    // If not mobile, append cards directly (assuming the original HTML structure with cards is not present)
    // You might need to adjust this part based on your desired desktop layout without the carousel wrapper
    // For now, let's re-create the cards based on the table data for desktop view as well
    const desktopCardsContainer = document.createElement('div');
    desktopCardsContainer.classList.add('teasers-desktop'); // Add a class for desktop specific styling

    Array.from(table.querySelectorAll('tr')).slice(1).forEach((row) => {
      const cols = Array.from(row.querySelectorAll('td'));
      if (cols.length >= 4) {
        const iconCell = cols[0];
        const titleCell = cols[1];
        const descriptionCell = cols[2];
        const linkCell = cols[3];

        const card = document.createElement('div');
        card.classList.add('teasers-card'); // Use the same card class for consistent styling
        if (iconCell) card.appendChild(iconCell.querySelector('img') || document.createElement('div'));
        if (titleCell) { const title = document.createElement('h3'); title.innerHTML = titleCell.innerHTML; card.appendChild(title); }
        if (descriptionCell) { const description = document.createElement('p'); description.innerHTML = descriptionCell.innerHTML; card.appendChild(description); }
        if (linkCell && linkCell.querySelector('a')) { const link = linkCell.querySelector('a'); link.appendChild(card); desktopCardsContainer.appendChild(link); } else { desktopCardsContainer.appendChild(card); }
      }
    });
    block.innerHTML = '';
    block.appendChild(desktopCardsContainer);
  }
}