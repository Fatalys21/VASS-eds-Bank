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
 const ul = document.createElement('ul');

 // Iterate through table rows, skipping the header (first row)
  Array.from(contentTable.querySelectorAll('tr')).slice(1).forEach((row) => {
 const li = document.createElement('li');
 li.classList.add('new-teasers-card'); // Add class to the li
 const cols = Array.from(row.querySelectorAll('td'));

 // Process each cell in the row
 cols.forEach((col, index) => {
 const div = document.createElement('div');
 // Assign classes based on content type and position
 if (index === 0 && col.querySelector('img')) {
 div.classList.add('new-teasers-card-image');
 div.appendChild(col.querySelector('img'));
 } else {
 div.classList.add('new-teasers-card-body');
        div.innerHTML = col.innerHTML; // Copy content including potential anchor tags
 }
 li.appendChild(div);
 });

 // Handle the link wrapping if a link exists in the last column
 const linkCell = cols[3]; // Assuming the link is always the 4th column
 const linkElement = linkCell ? linkCell.querySelector('a') : null;
 if (linkElement) {
 const linkWrapper = document.createElement('a');
 linkWrapper.href = linkElement.href;
 linkWrapper.classList.add('new-teasers-link');
 // Move all content from the li into the linkWrapper
 while (li.firstElementChild) linkWrapper.appendChild(li.firstElementChild);
 li.appendChild(linkWrapper); // Append the link wrapper to the li
 }

 ul.append(li);
 });

  // Decorate icons if any were added dynamically
 // Note: decorateIcons should be called on the block *after* content is added
 // decorateIcons(block);

 // Clear the original content of the block (the tables)
  block.innerHTML = '';
  block.append(ul);
}