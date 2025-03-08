import { AbstractControl, ValidatorFn } from '@angular/forms';

export const MATCH_OTHER_VALIDATOR_KEY = 'matchOther';

export const matchOtherValidator = (
  otherControlOrControlName: string | AbstractControl,
): ValidatorFn => {
  return (control: AbstractControl) => {
    const otherControl =
      typeof otherControlOrControlName === 'string'
        ? control.parent?.get(otherControlOrControlName)
        : otherControlOrControlName;

    if (!otherControl) return null;

    if (!control.value || !otherControl.value) return null;

    if (control.value === otherControl.value) return null;

    return {
      [MATCH_OTHER_VALIDATOR_KEY]: true,
    };
  };
};
