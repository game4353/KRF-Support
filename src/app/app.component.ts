import { Component } from '@angular/core';
import { faCircleQuestion, faGear, faRotateRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'きらファン　サポート'
  faRotateRight = faRotateRight
  faCircleQuestion = faCircleQuestion
  faGear = faGear
}
