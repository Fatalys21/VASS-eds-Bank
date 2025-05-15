export default function decorate(block) {
  block.classList.add('full-width-banner');

  // Get the content rows
  const rows = [...block.children];

  // Assume the content structure is Image, Text, CTA-Label, CTA-Link
  if (rows.length >= 4) {
    const imageRow = rows[0];
    const textRow = rows[1];
    const ctaLabelRow = rows[2];
    const ctaLinkRow = rows[3];

    // Extract content
    const imageUrl = imageRow.querySelector('img')?.src;
    const textContent = textRow.textContent.trim();
    const ctaLabel = ctaLabelRow.textContent.trim();
    const ctaLink = ctaLinkRow.textContent.trim();

    // Clear existing content
    block.innerHTML = '';

    // Create the banner content
    const bannerContent = document.createElement('div');
    bannerContent.classList.add('full-width-banner-content');

    if (imageUrl) {
      block.style.backgroundImage = `url(${imageUrl})`;
    }

    const textElement = document.createElement('p');
    textElement.textContent = textContent;
    bannerContent.appendChild(textElement);

    if (ctaLabel && ctaLink) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('button', 'pill-button'); // Add classes for styling
      ctaButton.textContent = ctaLabel;
      ctaButton.href = ctaLink;
      bannerContent.appendChild(ctaButton);
    }

    block.appendChild(bannerContent);
  }
}