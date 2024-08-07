import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

//Validations : Allow Alphanumeric char and space only
export class TextFieldValidator {
    static validTextField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "" && fc.value != null) {
            const regex = /^[0-9a-zA-Z ]+$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validTextField: true };
            }
        } else {
            return null;
        }
    }
}

//Validations : Allow Numeric char 
export class NumericFieldValidator {
    static validNumericField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "" && fc.value != null) {
            const regex = /[0-9]+/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validNumericField: true };
            }
        } else {
            return null;
        }
    }
}

//Validations : Allow char  and space only
export class CharFieldValidator {
    static validCharField(fc: FormControl) {
        if (fc.value != undefined && fc.value != "" && fc.value != null) {
            const regex = /^[a-zA-Z ]+$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validCharField: true };
            }
        } else {
            return null;
        }
    }
}


//Validations : Allow Email only
export class EmailValidator {
    static validEmail(fc: FormControl) {
        if (fc.value != undefined && fc.value != "" && fc.value != null) {
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
            if (regex.test(fc.value)) {
                return null;
            } else {
                return { validEmail: true };
            }
        } else {
            return null;
        }
    }
}

//Validations : Not Allowed whitespace only
export class NoWhiteSpaceValidator {
    static noWhiteSpaceValidator(fc: FormControl) {
        if (fc.value != undefined && fc.value != "" && fc.value != null) {
            const isWhiteSpace = (fc.value.toString().trim().length === 0)

            if (!isWhiteSpace) {
                return null;
            } else {
                return { noWhiteSpaceValidator: true };
            }
        } else {
            return null;
        }
    }
}

// // Validations: To check two fields to be same value
// export function MustMatchValidator(controlName: string, matchingControlName: string) {
//     return (formGroup: FormGroup) => {
//         //const control = formGroup.get(controlName);
//         const control = formGroup.controls[controlName];
//         const matchingControl = formGroup.controls[matchingControlName];

//         if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//             return;
//         }

//         if (control.value !== matchingControl.value) {
//             matchingControl.setErrors({ mustMatch: true });
//         } else {
//             matchingControl.setErrors(null);
//         }
//     }
// }



// Validations: To check two fields to be same value
export function MustMatchValidator(controlName: string, matchingControlName: string) : ValidatorFn {
    return (ctrl : AbstractControl) : ValidationErrors | null => {
        //const control = formGroup.get(controlName);
        const control = ctrl.get(controlName);
        const matchingControl = ctrl.get(matchingControlName);

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return null;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }

        return null;
    }
}