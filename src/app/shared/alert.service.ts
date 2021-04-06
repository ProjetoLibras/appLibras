import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async showConfirmarExclusão(name: string, actionRemove: () => void){
    const alert = await this.alertController.create({
      header: 'Remover o item? ',
      message: `Deseja remover o item: ${name}`,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Remover',
          handler: () => {
            actionRemove();
          }
        }
      ]
    });
    await alert.present();
  }



}
