import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Find the content table (the second table in the block's direct children)
  const contentTable = block.children[1];

  if (!contentTable) {
    // If no content table is found, there's nothing to render
    return;
  }

  const ul = document.createElement('ul');

  // Get rows, skipping the header row (slice(1))
  const rows = Array.from(contentTable.querySelectorAll('tr')).slice(1);

  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll('td'));
    if (cells.length >= 3) { // We need at least 3 columns: Icon, Title, Link
      const iconCell = cells[0];
      const titleCell = cells[1];
      const linkCell = cells[2];

      const link = linkCell.querySelector('a');
      if (link && link.href) {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = link.href;
        linkWrapper.classList.add('teasers-item'); // Add a class for styling

        // Add the image
        const icon = iconCell.querySelector('picture') || iconCell.querySelector('img');
        if (icon) {
            linkWrapper.appendChild(icon.cloneNode(true));
        }

        // Add the title
        const title = document.createElement('h3');
        title.innerHTML = titleCell.innerHTML;
        linkWrapper.appendChild(title);

        ul.appendChild(linkWrapper);
      }
    }
  });

  // Clear the original block content (which includes the tables)
  block.innerHTML = '';

  // Optimize images after they are added to the DOM
  ul.querySelectorAll('picture > img').forEach((img) => {
    if (!img.closest('picture')) { // Ensure it's not already in a picture tag
       img.replaceWith(createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]));
    }
  });
}
