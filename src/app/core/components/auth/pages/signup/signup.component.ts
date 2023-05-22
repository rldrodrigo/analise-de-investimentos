import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formAuth: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  public msgError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public submitForm(){
    if(this.formAuth.valid) {
      this.authService.signup({
        name: this.formAuth.value.name,
        email: this.formAuth.value.email,
        password: this.formAuth.value.password,
        confirmPassword: this.formAuth.value.confirmPassword,
      }).subscribe({
        next: (res) => {
          if(res.status === 301) {
            this.msgError == res.error;
          }
        },
        error: (e) => (this.msgError = e),
      })
    }
  }

}
