import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
    }

}
