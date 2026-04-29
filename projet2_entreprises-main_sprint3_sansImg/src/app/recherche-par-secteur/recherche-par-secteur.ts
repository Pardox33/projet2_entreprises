import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Entreprise } from '../modele/entreprise.model';
import { Secteur } from '../modele/secteur.model';
import { EntrepriseService } from '../services/entreprise.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-recherche-par-secteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-secteur.html'
})
export class RechercheParSecteur implements OnInit {

  entreprises!: Entreprise[] 
  secteurs!: Secteur[] 
  idSec!: number;

  constructor(
    private entrepriseService: EntrepriseService,
    private router: Router,
    public authService: Auth
  ) {}

  ngOnInit(): void {
    this.entrepriseService.listeSecteur().subscribe(sec => {
        this.secteurs = sec._embedded.secteurs;
        console.log(sec);
       });
  }

  onChange() {
    this.entrepriseService.rechercherParSecteur(this.idSec).subscribe(ent => {
        this.entreprises = ent;
    });
  }

  supprimerEntreprise(ent: Entreprise) {
    if (confirm("Voulez-vous vraiment supprimer cette entreprise ?")) {
      this.entrepriseService.supprimerEntreprise(ent.idEnt).subscribe(() => {
        this.entreprises = this.entreprises.filter(e => e.idEnt !== ent.idEnt);
      });
    }
  }

  modifierEntreprise(e: Entreprise) {
    this.router.navigate(['updateEntreprise', e.idEnt]);
  }
}
