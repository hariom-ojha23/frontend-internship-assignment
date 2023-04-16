import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'front-end-internship-assignment-chip-list',
  templateUrl: './chipList.component.html',
  styleUrls: ['./chipList.component.scss'],
})
export class ChipListComponent {
  @Input() searchList: string[] = [];
  @Output() clickChip = new EventEmitter();

  onClickChips(value: string) {
    this.clickChip.emit(value);
  }
}
