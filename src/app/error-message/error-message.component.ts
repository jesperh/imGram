import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMsg: string;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // const chng = changes['errorMsg'];
    // this.errorMsg = chng.currentValue;
  }
}
