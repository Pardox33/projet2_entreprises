import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { User } from '../modele/user';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verif-email.html',
})
export class VerifEmail implements OnInit {
  code: string = '';
  user: User = new User();
  err: string = '';
  loading: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Retrieve the user that just registered
    this.user = this.authService.getRegistredUser();
  }

  onValidateEmail() {
    this.loading = true;
    this.err = '';

    this.authService.validateEmail(this.code).subscribe({
      next: () => {
        // Email confirmed → auto-login the user
        this.authService.login(this.user).subscribe({
          next: (data) => {
            this.loading = false;
            const jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/entreprises']);
          },
          error: (err: any) => {
            this.loading = false;
            // Account verified but auto-login failed (shouldn't happen normally)
            alert('Email confirmé ! Veuillez vous connecter.');
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err: any) => {
        this.loading = false;
        if (err.error?.errorCode === 'INVALID_TOKEN') {
          this.err = 'Code invalide !';
        } else if (err.error?.errorCode === 'EXPIRED_TOKEN') {
          this.err = 'Code expiré ! Veuillez vous réinscrire.';
        } else {
          this.err = err.error?.message || 'Une erreur est survenue.';
        }
      },
    });
  }
}
