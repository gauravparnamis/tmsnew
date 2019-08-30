import {
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    
    

  } from '@angular/material';

  import { NgModule } from '@angular/core';
  


  @NgModule({
    imports: [
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatToolbarModule,
      MatDialogModule
    ],
    exports: [
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatToolbarModule,
      MatDialogModule
    ],
    entryComponents: [MatDialogModule],

  })
  export class AppMaterialModule { }