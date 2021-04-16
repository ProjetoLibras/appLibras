import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public actionSheetController: ActionSheetController,
    private auth: AuthService,
    private router: Router) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '...Opções',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Perfil',
        icon: 'person-outline',
        handler: () => {
          this.router.navigate(['/tabs/dashboard'])

        }
      },{
        text: 'Sair / Logout',
        icon: 'exit',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.auth.logout();
        }
      }]
    });
    await actionSheet.present();
  }

}
