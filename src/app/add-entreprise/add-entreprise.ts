import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Entreprise } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { Secteur } from '../modele/secteur.model';




@Component({
  selector: 'app-add-entreprise',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-entreprise.html',
})
export class AddEntreprise implements OnInit {

  newEntreprise= new Entreprise();
  //message! :string;
  secteurs! : Secteur[];
  newIdSec!: number;
  newSecteur!: Secteur;

  constructor(private entrepriseService: EntrepriseService,
    private router: Router){}
    ngOnInit(): void {
      this.secteurs = this.entrepriseService.listeSecteur();
    }
  addEntreprise(){
    this.newSecteur=this.entrepriseService.consulterSecteur(this.newIdSec);
    this.newEntreprise.secteur=this.newSecteur;
  //console.log(this.newEntreprise);
  this.entrepriseService.ajouterEntreprise(this.newEntreprise);
  //this.message = "Entreprise "+this.newEntreprise.nomEntreprise + "ajoutée avec succès !";
    this.router.navigate(['entreprises']);

}
}
