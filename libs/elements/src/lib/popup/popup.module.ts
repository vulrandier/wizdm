import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { PopupComponent } from './popup.component';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [PopupComponent],
  entryComponents: [
    // Don't forget to declare dialogs here
    PopupComponent
  ]
})
export class PopupModule {}