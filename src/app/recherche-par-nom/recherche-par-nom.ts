import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Entreprise } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { SearchFilterPipe } from '../search-filter-pipe';


@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {
  nomEntreprise!: string;
  entreprises!: Entreprise[] ;
  allEntreprises!: Entreprise[] ;
  searchTerm: string = '';
  constructor(private entrepriseService: EntrepriseService) { }

ngOnInit(): void {
  this.entreprises = this.entrepriseService.listeEntreprises();
  this.allEntreprises = this.entrepriseService.listeEntreprises();
}

rechercherEntreprises() {
  this.entreprises=this.entrepriseService.rechercherParNom(this.nomEntreprise)
   }


 onKeyUp(filterText: string) {
  this.entreprises = this.allEntreprises.filter(item =>
    item.nomEntreprise.toLowerCase().includes(filterText.toLowerCase())
  );
}
}
