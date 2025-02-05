let currentId = 0;

export function generateInputId() {
  currentId++;
  return 'n-input-' + currentId;
}
