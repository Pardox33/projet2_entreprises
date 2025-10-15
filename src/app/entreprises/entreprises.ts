import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Entreprise } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './entreprises.html'
})
export class Entreprises {

  entreprises: Entreprise[];

  constructor(private entrepriseService: EntrepriseService) {
    this.entreprises = this.entrepriseService.listeEntreprises();
  }
  supprimerEntreprise(ent: Entreprise) {
    //console.log(ent);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.entrepriseService.supprimerEntreprise(ent);
  }
}

