import { FormGroup, FormControl, Validators } from '@angular/forms';

export function getAddUserForm(): FormGroup {
    return new FormGroup({
        companyId: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        email2: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl('')
      });
}
