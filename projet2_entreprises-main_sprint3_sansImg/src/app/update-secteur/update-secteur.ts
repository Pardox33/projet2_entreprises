import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Secteur } from '../modele/secteur.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';

@Component({
  selector: 'app-update-secteur',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-secteur.html',
  styles: ``,
})
export class UpdateSecteur implements OnInit {
  @Input() secteur!: Secteur;
  @Input() ajout!: boolean;
  @Output() secteurUpdated = new EventEmitter<Secteur>();

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {}

  saveSecteur() {
    if (this.ajout) {
      const newSecteur: Partial<Secteur> = { nomSec: this.secteur.nomSec };

      this.entrepriseService.ajouterSecteur(newSecteur).subscribe({
        next: (sec: Secteur) => {
          this.secteurUpdated.emit(sec);
          this.secteur.nomSec = '';
        },
        error: (err: any) => console.error('Erreur ajout secteur', err),
      });
    } else {
      this.entrepriseService.updateSecteur(this.secteur).subscribe({
        next: (sec: Secteur) => this.secteurUpdated.emit(sec),
        error: (err: any) => console.error('Erreur mise à jour secteur', err),
      });
    }
  }
}
