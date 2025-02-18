let currentId = 0;

export function generateRadioGroupId() {
  currentId++;
  return 'n-radio-group-' + currentId;
}
