import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  @Input() heading: string = '';
  @Input() color: string = '';
  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  public defaultColors: string[] = [
    '#5e35b1',
    '#e53935',
    '#1e88e5',
    '#00acc1',
    '#b7d5c4',
  ];

  constructor() {
  }

  /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    this.color = color;
    this.event.emit(this.color);
  }

}
