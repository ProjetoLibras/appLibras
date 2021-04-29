// ionic g class symptoms/shared/symptoms
export class Symptoms{
  id?: string;
  name?: string;
  idname?: string;
  description?: string = "";
  imgUrl?: string = ""; // a url da imagem
  filePath?: string = ""; // caminho da imagem no Storage
}
