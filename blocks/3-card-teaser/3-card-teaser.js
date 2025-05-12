export default function decorate(block) {
  const cards = Array.from(block.children);

  cards.forEach((card) => {
    card.classList.add('3-card-teaser-card');

    // Assuming the structure within each card is consistent:
    // First element is likely an image or icon wrapper
    // Second element is the title
    // Third element is the description
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