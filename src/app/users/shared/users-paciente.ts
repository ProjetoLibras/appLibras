export class UsersPaciente {
  email?: string;
  password?: string;
  name?: string;
  cartaosus?: string;
  tiposanguineo?: string; /** A+, A-, B+, B-, AB+, AB-, O+, O- */
  faixaetaria?: string; /** criança, jovens, adultos e idodos */
  sexo?: string;
  datanascimento?: string;
  zipcode?: string = "";
  address?: string = "";
  address_number?: string = "";
  contato?: string;
  address_district?: string = "";
  address_city?: string = "";
  address_state?: string = "";
  address_complement?: string = "";
  comorbidades?: string = "";
  tipousuario?: string  = "paciente";
}
