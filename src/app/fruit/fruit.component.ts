import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.sass']
})
export class FruitComponent implements OnInit {
  @Input() fid?: number
  constructor() { }

  ngOnInit(): void {
  }

}
