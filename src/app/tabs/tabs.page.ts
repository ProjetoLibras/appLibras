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
    private auth: AuthService) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '...Opções',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
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
