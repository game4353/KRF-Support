import { Component, OnInit } from '@angular/core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.sass']
})
export class HelpComponent implements OnInit {
  faRotateRight = faRotateRight
  constructor() { }

  ngOnInit(): void {
  }
  nothing (e: Event) {
    e.stopPropagation()
  }
}
