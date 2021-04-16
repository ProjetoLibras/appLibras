import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  public attendanceList: any;

  constructor(private firestore: AngularFirestore) { }

  async ngOnInit() {
    this.attendanceList = await this.initializeItems();
  }

  async initializeItems(): Promise<any>{
    const attendanceList = await this.firestore.collection('attendanceList').valueChanges().pipe(first()).toPromise();
    return attendanceList;
  }

  async filterList(evt) {
    this.attendanceList = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.attendanceList = this.attendanceList.filter(currentAttendance => {
      if (currentAttendance.sus && searchTerm) {
        return (currentAttendance.sus.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    })
  }

}
