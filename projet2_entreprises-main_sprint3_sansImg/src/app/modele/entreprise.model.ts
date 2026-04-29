// ✅ image est string — Jackson sérialise byte[] en base64 automatiquement
export class Image {
  idImage!: number;
  name!: string;
  type!: string;
  image!: string;
}

export class Entreprise {
  idEnt!: number;
  nomEnt!: string;
  chiffreAff!: number;
  dateCre!: Date;
  email!: string;
  secteur!: any;
  images!: Image[];
  imageStr!: string;
}
