import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ContentService } from 'app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'wm-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {

  public msgs;

  constructor(private content : ContentService, 
              private dialog  : MatDialog) { 

    // Gets the localized content
    this.msgs = this.content.select('navigator.consent');
  }

  ngOnInit() { }

  @ViewChild('consent')
  private template: TemplateRef<ConsentComponent>;
  private config: MatDialogConfig = { 
    disableClose: true,
    //data: this
  };

  public askConsent(): Promise<void> {
    return this.dialog.open(this.template, this.config)
      .afterClosed()
      .toPromise()
      .then( agree => this.granted.emit(agree) );
  }

  @Output() granted = new EventEmitter<boolean>();

  @Input('ask') set ask(ask: boolean) {
    
    if(ask) {// Skips a scheduler round to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout( () => this.askConsent() );
    }
  }
}