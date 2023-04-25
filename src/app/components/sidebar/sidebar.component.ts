import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadfileComponent } from '../upload-file/uploadfile.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.template.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private matDialog: MatDialog) {}
  
  public openFileDailogBox() {
    this.matDialog.open(UploadfileComponent, {
      width: '600px',
      height: '250px',
    });
  }
}
