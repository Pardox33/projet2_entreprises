import { Component, OnInit } from '@angular/core';
import { Entreprise, Image } from '../modele/entreprise.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntrepriseService } from '../services/entreprise.service';
import { Secteur } from '../modele/secteur.model';

@Component({
  selector: 'app-update-entreprise',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-entreprise.html',
})
export class UpdateEntreprise implements OnInit {
  currentEntreprise = new Entreprise();
  secteurs!: Secteur[];
  entrepriseForm!: FormGroup;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private entrepriseService: EntrepriseService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.entrepriseForm = this.fb.group({
      nomEnt: ['', [Validators.required, Validators.minLength(3)]],
      chiffreAff: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      dateCre: ['', Validators.required], // ✅ '' et non undefined
      secteur: ['', Validators.required],
    });

    this.entrepriseService.listeSecteur().subscribe((secs) => {
      this.secteurs = secs._embedded.secteurs;
    });

    this.entrepriseService
      .consulterEntreprise(this.activatedRoute.snapshot.params['id'])
      .subscribe((ent) => {
        this.currentEntreprise = ent;

        const dateFormatee = ent.dateCre
          ? new Date(ent.dateCre).toISOString().substring(0, 10)
          : '';

        this.entrepriseForm.patchValue({
          nomEnt: ent.nomEnt ?? '',
          chiffreAff: ent.chiffreAff ?? '',
          email: ent.email ?? '',
          dateCre: dateFormatee,
          secteur: ent.secteur?.idSec ?? '',
        });

        this.entrepriseService.getImagesEntreprise(ent.idEnt).subscribe((imgs: Image[]) => {
          this.currentEntreprise.images = imgs;
        });
      });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImageEntreprise() {
    if (!this.uploadedImage) {
      alert("Veuillez choisir une image d'abord.");
      return;
    }
    this.entrepriseService
      .uploadImageEntreprise(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentEntreprise.idEnt,
      )
      .subscribe((img: Image) => {
        if (!this.currentEntreprise.images) this.currentEntreprise.images = [];
        this.currentEntreprise.images.push(img);
        this.myImage = 'data:' + img.type + ';base64,' + img.image;
      });
  }

  supprimerImage(img: Image) {
    if (confirm('Etes-vous sûr ?')) {
      this.entrepriseService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentEntreprise.images!.indexOf(img);
        if (index > -1) this.currentEntreprise.images!.splice(index, 1);
      });
    }
  }

  updateEntreprise() {
    this.currentEntreprise.nomEnt = this.entrepriseForm.get('nomEnt')?.value;
    this.currentEntreprise.chiffreAff = this.entrepriseForm.get('chiffreAff')?.value;
    this.currentEntreprise.email = this.entrepriseForm.get('email')?.value;
    this.currentEntreprise.dateCre = this.entrepriseForm.get('dateCre')?.value;
    const secId = this.entrepriseForm.get('secteur')?.value;
    this.currentEntreprise.secteur = this.secteurs.find((s) => s.idSec == secId);

    this.entrepriseService.updateEntreprise(this.currentEntreprise).subscribe(() => {
      this.router.navigate(['entreprises']);
    });
  }
}
