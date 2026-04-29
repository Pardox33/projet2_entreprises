import { Component, OnInit } from '@angular/core';
import { Secteur } from '../modele/secteur.model';
import { EntrepriseService } from '../services/entreprise.service';
import { CommonModule } from '@angular/common';
import { UpdateSecteur } from '../update-secteur/update-secteur';

@Component({
  selector: 'app-liste-secteurs',
  standalone: true,
  imports: [CommonModule, UpdateSecteur],
  templateUrl: './liste-secteurs.html'
})
export class ListeSecteurs implements OnInit {

  secteurs!: Secteur[];
  updatedSec: Secteur = { idSec: 0, nomSec: '' };
  ajout: boolean = true;

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.chargerSecteurs();
  }

  chargerSecteurs() {
    this.entrepriseService.listeSecteur()
      .subscribe(sec => {
        this.secteurs = sec._embedded.secteurs;
      });
  }

  secteurUpdated(sec: Secteur) {
  if (this.ajout) {
    this.entrepriseService.ajouterSecteur(sec)
      .subscribe(() => this.chargerSecteurs());
  } else {
    this.entrepriseService.updateSecteur(sec)
      .subscribe(() => this.chargerSecteurs());
  }

  // Réinitialiser le formulaire
  this.updatedSec = { idSec: 0, nomSec: '' };
  this.ajout = true;
}


  updateSec(sec: Secteur) {
    this.updatedSec = { ...sec }; // clonage pour éviter modification directe
    this.ajout = false;
  }
}
