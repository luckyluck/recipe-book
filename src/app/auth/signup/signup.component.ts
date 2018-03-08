import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    errorText = '';

    constructor(private authService: AuthService) {}

    onSubmit(form: NgForm) {
        this.errorText = '';
        const email = form.value.email;
        const password = form.value.password;

        this.authService.signupUser(email, password)
            .catch(
                error => {
                    console.log(error);
                    this.errorText = error.message;
                }
            );
    }

}
