export function toTagsArray(tags: string) {
  return tags
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
}

export function fromTagsArray(tags: string[]) {
  return tags.join(', ');
}
