import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from '../modele/entreprise.model';
import { Image } from '../modele/entreprise.model';
import { Secteur } from '../modele/secteur.model';
import { SecteurWrapper } from '../modele/secteurWrapped.model';
import { Auth } from './auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  apiURL = 'http://localhost:8083/entreprises/api';
  apiURLSec = 'http://localhost:8083/entreprises/sec';

  constructor(
    private http: HttpClient,
    private authService: Auth,
  ) {}

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Bearer ' + this.authService.getToken() });
  }

  listeEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.apiURL + '/all');
  }

  ajouterEntreprise(ent: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.apiURL}/addent`, ent, {
      headers: this.getAuthHeaders(),
    });
  }

  consulterEntreprise(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.apiURL}/getbyid/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateEntreprise(ent: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.apiURL}/updateent`, ent, {
      headers: this.getAuthHeaders(),
    });
  }

  supprimerEntreprise(id: number) {
    return this.http.delete(`${this.apiURL}/delent/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  listeSecteur(): Observable<SecteurWrapper> {
    return this.http.get<SecteurWrapper>(this.apiURLSec, {
      headers: this.getAuthHeaders(),
    });
  }

  ajouterSecteur(sec: Partial<Secteur>): Observable<Secteur> {
    return this.http.post<Secteur>(this.apiURLSec, sec, {
      headers: this.getAuthHeaders(),
    });
  }

  updateSecteur(sec: Secteur): Observable<Secteur> {
    return this.http.put<Secteur>(`${this.apiURLSec}/${sec.idSec}`, sec, {
      headers: this.getAuthHeaders(),
    });
  }

  rechercherParNom(nom: string): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.apiURL}/entByName/${nom}`, {
      headers: this.getAuthHeaders(),
    });
  }

  rechercherParSecteur(idSec: number): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.apiURL}/entsec/${idSec}`, {
      headers: this.getAuthHeaders(),
    });
  }

  uploadImageEntreprise(file: File, filename: string, idEnt: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, filename);
    return this.http.post(`${this.apiURL}/image/uploadImageEntreprise/${idEnt}`, formData);
  }

  getImagesEntreprise(idEnt: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiURL}/image/getImagesEntreprise/${idEnt}`);
  }

  supprimerImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/image/delete/${id}`);
  }
}
