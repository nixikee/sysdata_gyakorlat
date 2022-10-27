import { FormGroup, FormControl, Validators } from '@angular/forms';

export function getUpdateUserForm(): FormGroup {
    return new FormGroup({
        oldPassword: new FormControl(''),
        newPassword1: new FormControl(''),
        newPassword2: new FormControl(''),
      });
}
