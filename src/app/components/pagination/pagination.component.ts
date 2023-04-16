import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'front-end-internship-assignment-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  totalBox = 5;

  @Input() btnText = '';
  @Input() btnIcon = '';
  @Input() currPage = 1;
  @Input() total = 0;
  @Input() start = 0;
  @Output() selectPage = new EventEmitter();
  @Output() setStart = new EventEmitter();

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
          this.totalBox = 3
      } else {
          this.totalBox = 5
      }
    })
  }

  range(val: number) {
    const arr = [];
    const end = val + this.totalBox - 1

    for (let i = val; i <= end; i++) {
        if (i <= this.total) {
            arr.push(i)
        }
    }
    return arr
  }

  onClickNumber(pageNo: number) {
    this.selectPage.emit(pageNo + 1)
  }

  onClickNext() {
    this.setStart.emit(this.start + this.totalBox)
  }
  onClickPrev() {
    this.setStart.emit(this.start - this.totalBox)
  }
}