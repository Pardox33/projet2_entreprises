import { Routes } from '@angular/router';
import { Entreprises } from './entreprises/entreprises';
import { AddEntreprise } from './add-entreprise/add-entreprise';
import { UpdateEntreprise } from './update-entreprise/update-entreprise';
import { RechercheParSecteur } from './recherche-par-secteur/recherche-par-secteur';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { entrepriseGuard } from './services/entreprise-guard';
import { ListeSecteurs } from './liste-secteurs/liste-secteurs';
import { Register } from './register/register';
import { VerifEmail } from './verif-email/verif-email';

export const routes: Routes = [
  { path: 'entreprises', component: Entreprises },
  { path: 'add-entreprise', component: AddEntreprise, canActivate: [entrepriseGuard] },
  { path: 'updateEntreprise/:id', component: UpdateEntreprise, canActivate: [entrepriseGuard] },
  { path: 'RechercheParSecteur', component: RechercheParSecteur },
  { path: 'rechercheParNom', component: RechercheParNom },
  { path: 'login', component: Login },
  { path: 'register', component: Register }, // ← NOUVEAU
  { path: 'verifEmail', component: VerifEmail },
  { path: 'app-forbidden', component: Forbidden },
  { path: 'ListeSecteurs', component: ListeSecteurs, canActivate: [entrepriseGuard] },
  { path: '', redirectTo: 'entreprises', pathMatch: 'full' },
];
