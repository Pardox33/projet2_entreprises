import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { User } from '../modele/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  myForm!: FormGroup;
  err: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  onRegister() {
    this.loading = true;
    if (this.myForm.invalid) return;

    const user = new User();
    user.username = this.myForm.value.username;
    user.email = this.myForm.value.email;
    user.password = this.myForm.value.password;

    this.authService.registerUser(user).subscribe({
      next: () => {
        this.authService.setRegistredUser(user);
        this.loading = false;
        this.toastr.success('Inscription réussie. Veuillez confirmer votre email.');
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 400) {
          this.err = err.error?.message || 'Email déjà utilisé.';
        } else {
          this.err = "Une erreur inattendue s'est produite.";
        }
      },
    });
  }
}
