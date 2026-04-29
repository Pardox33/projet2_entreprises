import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Entreprise } from '../modele/entreprise.model';
import { Secteur } from '../modele/secteur.model';
import { EntrepriseService } from '../services/entreprise.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-entreprise',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-entreprise.html',
})
export class AddEntreprise implements OnInit {
  newEntreprise = new Entreprise();
  secteurs!: Secteur[];
  newIdSec!: number;
  entrepriseForm!: FormGroup;
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private entrepriseService: EntrepriseService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.entrepriseService.listeSecteur().subscribe((secs) => {
      this.secteurs = secs._embedded.secteurs;
    });

    this.entrepriseForm = this.fb.group({
      nomEnt: ['', [Validators.required, Validators.minLength(3)]],
      chiffreAff: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      dateCre: ['', Validators.required],
      secteur: ['', Validators.required],
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }

  addEntreprise() {
    this.newEntreprise.secteur = { idSec: this.newIdSec };

    this.entrepriseService.ajouterEntreprise(this.newEntreprise).subscribe((ent) => {
      if (this.uploadedImage) {
        this.entrepriseService
          .uploadImageEntreprise(this.uploadedImage, this.uploadedImage.name, ent.idEnt)
          .subscribe(() => {
            this.router.navigate(['entreprises']);
          });
      } else {
        this.router.navigate(['entreprises']);
      }
    });
  }
}
