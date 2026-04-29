import { Component, OnInit } from '@angular/core';
import { User } from '../modele/user';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login implements OnInit {
  err: number = 0;
  message: string = 'Login ou mot de passe erronés..';
  user = new User();

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/entreprises']);
      },
      error: (err) => {
        this.err = 1;

        if (err.error?.errorCause === 'disabled') {
          this.message = 'Utilisateur désactivé. Veuillez confirmer votre email.';
        } else {
          this.message = 'Login ou mot de passe erronés..';
        }
      },
    });
  }
}
