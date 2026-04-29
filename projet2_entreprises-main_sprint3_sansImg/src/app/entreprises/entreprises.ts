import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Entreprise, Image } from '../modele/entreprise.model';
import { EntrepriseService } from '../services/entreprise.service';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './entreprises.html',
})
export class Entreprises implements OnInit {
  entreprises!: Entreprise[];

  constructor(
    private entrepriseService: EntrepriseService,
    public authService: Auth,
  ) {}

  ngOnInit() {
    this.chargerEntreprises();
  }

  chargerEntreprises() {
    this.entrepriseService.listeEntreprises().subscribe((ents: Entreprise[]) => {
      this.entreprises = ents;

      this.entreprises.forEach((ent) => {
        this.entrepriseService.getImagesEntreprise(ent.idEnt).subscribe((imgs: Image[]) => {
          if (imgs && imgs.length > 0) {
            // ✅ img.image est déjà en base64 — comme dans joueurs.ts
            ent.imageStr = 'data:' + imgs[0].type + ';base64,' + imgs[0].image;
          }
        });
      });
    });
  }

  supprimerEntreprise(ent: Entreprise) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${ent.nomEnt}" ?`)) {
      this.entrepriseService.getImagesEntreprise(ent.idEnt).subscribe((imgs: Image[]) => {
        if (imgs && imgs.length > 0) {
          const deletes = imgs.map((img) =>
            this.entrepriseService.supprimerImage(img.idImage).toPromise(),
          );
          Promise.all(deletes).then(() => {
            this.entrepriseService.supprimerEntreprise(ent.idEnt).subscribe(() => {
              this.chargerEntreprises();
            });
          });
        } else {
          this.entrepriseService.supprimerEntreprise(ent.idEnt).subscribe(() => {
            this.chargerEntreprises();
          });
        }
      });
    }
  }
}
