import { Secteur } from "./secteur.model";


export class Entreprise {
  idEntreprise!: number;
  nomEntreprise!: string;
  secteur?: Secteur;       
  chiffreAffaires!: number; 
  dateCreation!: Date;
  emailEntreprise!: string;
}
