import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Entreprise } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNom implements OnInit {

  searchTerm: string = '';
  nomEnt: string = '';
  entreprises: Entreprise[] = [];
  allEntreprises: Entreprise[] = [];

  constructor(
    private entrepriseService: EntrepriseService,
    private router: Router,
    public authService: Auth
  ) { }

  ngOnInit(): void {
  this.entrepriseService.listeEntreprises().subscribe(ent => {
    this.allEntreprises = ent; // 👈 charger une seule fois
  });
  this.entreprises = [];
}

  onKeyUp(filterText: string) {
    if (!filterText.trim()) {
      this.entreprises = [];
      return;
    }
    this.entrepriseService.listeEntreprises().subscribe(ent=>{
      this.allEntreprises=ent;
    this.entreprises = this.allEntreprises.filter(ent =>
      ent.nomEnt.toLowerCase().includes(filterText.toLowerCase())
    );
  });
}
  
  rechercherEntreprises() {
    if (!this.nomEnt.trim()) {
      this.entreprises = [];  
      return;
    }
    this.entrepriseService.rechercherParNom(this.nomEnt).subscribe(ent => {
      console.log(ent);
      this.entreprises = ent;
    });
  }

  modifierEntreprise(ent: Entreprise) {
    this.router.navigate(['updateEntreprise', ent.idEnt]);
  }

  supprimerEntreprise(ent: Entreprise) {
    if (confirm("Voulez-vous vraiment supprimer cette entreprise ?")) {
      this.entrepriseService.supprimerEntreprise(ent.idEnt).subscribe(() => {
        this.entreprises = this.entreprises.filter(e => e.idEnt !== ent.idEnt);
      });
    }
  }
}
