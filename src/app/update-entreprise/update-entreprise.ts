import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreprise } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { Secteur } from '../modele/secteur.model';

@Component({
  selector: 'app-update-entreprise',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-entreprise.html',
  styles: ``
})
export class UpdateEntreprise implements OnInit {
  currentEntreprise = new Entreprise();
  secteurs!: Secteur[];
  updatedSecId!: number;
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private entrepriseService: EntrepriseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.secteurs = this.entrepriseService.listeSecteur();
    this.currentEntreprise = this.entrepriseService.consulterEntreprise(this.activatedRoute.snapshot.params['id']);
    this.updatedSecId = this.currentEntreprise.secteur?.idSec ?? 0;

    // Création du FormGroup avec validation
    this.myForm = this.formBuilder.group({
      idEntreprise: [{ value: this.currentEntreprise.idEntreprise, disabled: true }, Validators.required],
      nomEntreprise: [this.currentEntreprise.nomEntreprise, Validators.required],
      secteur: [this.updatedSecId, Validators.required],
      chiffreAffaires: [String(this.currentEntreprise.chiffreAffaires), [Validators.required, Validators.minLength(3),Validators.pattern("^[0-9]+(\\.[0-9]+)?$")]],
      dateCreation: [this.formatDate(this.currentEntreprise.dateCreation), Validators.required],
      email: [this.currentEntreprise.emailEntreprise, [Validators.required,  Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]]
    });
  }

  updateEntreprise() {
    if (this.myForm.invalid) return;

    // Mettre à jour les champs depuis le formulaire
    this.currentEntreprise.nomEntreprise = this.myForm.value.nomEntreprise;
    this.currentEntreprise.secteur = this.entrepriseService.consulterSecteur(this.myForm.value.secteur);
    this.currentEntreprise.chiffreAffaires = this.myForm.value.chiffreAffaires;
    this.currentEntreprise.dateCreation = new Date(this.myForm.value.dateCreation);
    this.currentEntreprise.emailEntreprise = this.myForm.value.email;

    this.entrepriseService.updateEntreprise(this.currentEntreprise);
    this.route.navigate(['entreprises']);
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
