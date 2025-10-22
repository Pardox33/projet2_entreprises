import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Entreprise } from '../modele/entreprise.model';
import { Secteur } from '../modele/secteur.model';
import { EntrepriseService } from '../services/entreprise.service';

@Component({
  selector: 'app-recherche-par-secteur',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './recherche-par-secteur.html',
  styles: ``
})
export class RechercheParSecteur implements OnInit {
  entreprises!:Entreprise[];
  secteurs!:Secteur[];
  idSecteur!:number;

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.secteurs = this.entrepriseService.listeSecteur();
    this.entreprises = this.entrepriseService.listeEntreprises();
  }

  onChange(){
    console.log(this.idSecteur);
    this.entreprises = this.entrepriseService.rechercherParSecteur(this.idSecteur);
  }

  supprimerEntreprise(e: Entreprise){
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
      this.entrepriseService.supprimerEntreprise(e);
      this.entreprises = this.entrepriseService.rechercherParSecteur(this.idSecteur);
    }
  }
}