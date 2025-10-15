import { Routes } from '@angular/router';
import { Entreprises } from './entreprises/entreprises';
import { AddEntreprise } from './add-entreprise/add-entreprise';
import { UpdateEntreprise } from './update-entreprise/update-entreprise';

export const routes: Routes = [
    { path: "entreprises", component: Entreprises },
    { path: "add-entreprise", component: AddEntreprise },
    { path: "", redirectTo: "entreprises", pathMatch: "full" },
    {path: "updateEntreprise/:id", component: UpdateEntreprise}
];
