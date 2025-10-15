import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Entreprise } from '../modele/entreprise.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../services/entreprise.service';
import { Secteur } from '../modele/secteur.model';

@Component({
  selector: 'app-update-entreprise',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-entreprise.html',
  styles: ``
})
export class UpdateEntreprise implements OnInit {
  currentEntreprise = new Entreprise();
  secteurs! : Secteur[];
  updatedSecId! : number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private entrepriseService: EntrepriseService) { }

  
  ngOnInit(): void {
    this.secteurs = this.entrepriseService.listeSecteur();
    this.currentEntreprise = this.entrepriseService.consulterEntreprise(this.activatedRoute.snapshot.params['id']);
    this.updatedSecId! = this.currentEntreprise.secteur?.idSec??0;
  }  

   updateEntreprise() {
    this.currentEntreprise.secteur = this.entrepriseService.consulterSecteur(this.updatedSecId);
    this.entrepriseService.updateEntreprise(this.currentEntreprise);
    this.route.navigate(['entreprises']);
   }
  }
