import { FormGroup, FormControl } from '@angular/forms';

export function getLoginForm(): FormGroup {
    return new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
      });
}