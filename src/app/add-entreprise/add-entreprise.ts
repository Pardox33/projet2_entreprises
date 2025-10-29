import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Entreprise } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { Secteur } from '../modele/secteur.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-add-entreprise',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-entreprise.html',
})
export class AddEntreprise implements OnInit {

  newEntreprise= new Entreprise();
  //message! :string;
  secteurs! : Secteur[];
  newIdSec!: number;
  newSecteur!: Secteur;
  myForm!: FormGroup;
  email!: string;
 

  constructor(private entrepriseService: EntrepriseService,
              private router: Router,
              private formBuilder: FormBuilder){}
    ngOnInit(): void {
      this.secteurs = this.entrepriseService.listeSecteur();
      this.myForm = this.formBuilder.group({

        idEntreprise: ['', Validators.required],
        nomEntreprise: ['', Validators.required],
        secteur: ['', Validators.required],
        chiffreAffaires: ['', [Validators.required, Validators.minLength(3),Validators.pattern("^[0-9]+(\\.[0-9]+)?$")]],
        dateCreation: ['', Validators.required],
        email: ['', [Validators.required,  Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]]

      });

  }
  addEntreprise() {
    this.newSecteur = this.entrepriseService.consulterSecteur(this.newIdSec);
    this.newEntreprise.secteur = this.newSecteur;
    //console.log(this.newEntreprise);
    this.entrepriseService.ajouterEntreprise(this.newEntreprise);
    //this.message = "Entreprise "+this.newEntreprise.nomEntreprise + "ajoutée avec succès !";
    this.router.navigate(['entreprises']);

  }
  idExiste(id: number): boolean {
    return this.entrepriseService.listeEntreprises()
      .some(e => e.idEntreprise === id);
  }
  nomExiste(nom: string): boolean {
    if (!nom) return false;
    return this.entrepriseService.listeEntreprises()
      .some(e => e.nomEntreprise.toLowerCase() === nom.toLowerCase());
  }
}
