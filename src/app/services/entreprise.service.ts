import { Component, Injectable } from '@angular/core';
import { Entreprise } from '../modele/entreprise.model';
import { Secteur } from '../modele/secteur.model';
// import { of, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})


export class EntrepriseService {
  

  entreprises: Entreprise[];
  entreprise!: Entreprise;
  secteurs: Secteur[];
  entreprisesRecherche!: Entreprise[];

  constructor() {
    this.secteurs = [
      { idSec: 1, nomSec: "Technologie" },
      { idSec: 2, nomSec: "Jeux vidéo" },
      { idSec: 3, nomSec: "Sport" },
      { idSec: 4, nomSec: "Média" },
      { idSec: 5, nomSec: "Transport aérien" },
      { idSec: 6, nomSec: "Espace extra-atmosphérique" }
    ];
    this.entreprises = [
      { idEntreprise: 1, nomEntreprise: "Apple", secteur: { idSec: 1, nomSec: "Technologie" }, chiffreAffaires: 394000, dateCreation: new Date("04/01/1976"), emailEntreprise: "contact@apple.com" },
      { idEntreprise: 2, nomEntreprise: "Ubisoft", secteur: { idSec: 2, nomSec: "Jeux vidéo" }, chiffreAffaires: 2300, dateCreation: new Date("03/12/1986"), emailEntreprise: "info@ubisoft.com" },
      { idEntreprise: 3, nomEntreprise: "Adidas", secteur: { idSec: 3, nomSec: "Sport" }, chiffreAffaires: 21000, dateCreation: new Date("08/18/1949"), emailEntreprise: "service@adidas.com" },
      { idEntreprise: 4, nomEntreprise: "Netflix", secteur: { idSec: 4, nomSec: "Média" }, chiffreAffaires: 31000, dateCreation: new Date("08/29/1997"), emailEntreprise: "support@netflix.com" },
      { idEntreprise: 5, nomEntreprise: "Emirates", secteur: { idSec: 5, nomSec: "Transport aérien" }, chiffreAffaires: 26000, dateCreation: new Date("10/25/1985"), emailEntreprise: "contact@emirates.com" },
      { idEntreprise: 6, nomEntreprise: "SpaceX", secteur: { idSec: 6, nomSec: "Espace extra-atmosphérique" }, chiffreAffaires: 10000, dateCreation: new Date("03/14/2002"), emailEntreprise: "hello@spacex.com" }
    ];
  }

  // Retourne la liste de toutes les entreprises
  listeEntreprises(): Entreprise[] {
    return this.entreprises;
  }

  // Ajoute une nouvelle entreprise au tableau
  ajouterEntreprise(ent: Entreprise) {
    this.entreprises.push(ent);
  }

  supprimerEntreprise(ent: Entreprise) {
    //console.log(ent);
    const index = this.entreprises.indexOf(ent, 0);
    if (index > -1) {
      this.entreprises.splice(index, 1);
    }
  }
  consulterEntreprise(id: number): Entreprise {
    this.entreprise = this.entreprises.find(p => p.idEntreprise == id)!;
    return this.entreprise;
  }
  updateEntreprise(ent: Entreprise) {
    const index = this.entreprises.indexOf(ent, 0);
    if (index > -1) {
      this.entreprises.splice(index, 1); //supprimer l'ancien éléments
      this.entreprises.splice(index, 0, ent); // insérer le nouvel élément
    }
  }
  listeSecteur(): Secteur[] {
    return this.secteurs;
  }
  consulterSecteur(id: number): Secteur {
    return this.secteurs.find(cat => cat.idSec == id)!;
  }
  rechercherParSecteur(idSec: number): Entreprise[] {
    this.entreprisesRecherche = [];
    this.entreprises.forEach((cur, index) => {
      if (cur.secteur?.idSec == idSec) {
        this.entreprisesRecherche.push(cur);
      }
    });
    return this.entreprisesRecherche;
  }

  rechercherParNom(nom: string): Entreprise[] {
    const entreprisesFiltrees = this.entreprises.filter(ent =>
      ent.nomEntreprise.toLowerCase().includes(nom.toLowerCase())
    );
    return (entreprisesFiltrees);
  }

}

