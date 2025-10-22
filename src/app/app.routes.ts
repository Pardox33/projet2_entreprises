import { Routes } from '@angular/router';
import { Entreprises } from './entreprises/entreprises';
import { AddEntreprise } from './add-entreprise/add-entreprise';
import { UpdateEntreprise } from './update-entreprise/update-entreprise';
import { RechercheParSecteur } from './recherche-par-secteur/recherche-par-secteur';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';


export const routes: Routes = [
    { path: "entreprises", component: Entreprises },
    { path: "add-entreprise", component: AddEntreprise },
    { path: "updateEntreprise/:id", component: UpdateEntreprise},
    { path: "RechercheParSecteur", component :RechercheParSecteur},
    { path: "rechercheParNom", component :RechercheParNom},
    { path: "", redirectTo: "entreprises", pathMatch: "full" }
];
