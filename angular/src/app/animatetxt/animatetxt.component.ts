import { Component, OnInit, HostBinding } from '@angular/core';

import {
 trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-animatetxt',
  templateUrl: './animatetxt.component.html',
  styleUrls: ['./animatetxt.component.css'],
  animations:[
    trigger('changeDivSize', [
      state('initial', style({
        backgroundColor: 'green',
        width: '100px',
        height: '100px'
      })),
      state('final', style({
        backgroundColor: 'red',
        width: '200px',
        height: '200px'
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
    trigger('bgImgTrigger', [
      state('none, void', style({
          width: '10px'
      })),
      state('maximum', style({
          width: '308px',
          backgroundColor: 'blue',
          color: 'white',
          top: '50px',
          left: '150px'

      })),
      transition('none => maximum', animate('200ms'))
  ])
    
  ]
})
export class AnimatetxtComponent implements OnInit {

  currentState = 'initial';
  text = 'Everyday I am 1% better than yesterday';
  state:string = 'none';


  constructor() { }

  ngOnInit() {

}
ngAfterViewInit() {
  this.state = 'maximum';
}
changeState() {
  this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
}

}
