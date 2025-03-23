let currentId = 0;

export function generateRadioButtonId() {
  currentId++;
  return 'n-radio-button-' + currentId;
}
