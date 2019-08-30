import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA, } from '@angular/material';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent{

  messageToPrint:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
   
      this.messageToPrint = data;
      var name : any;
    } 
}
