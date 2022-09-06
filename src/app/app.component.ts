import { Component, HostBinding } from '@angular/core';
import { faCircleQuestion, faGear, faRotateRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  @HostBinding('class') get class() {
    return (/Mobi|Android/i.test(navigator.userAgent))? 'mobile': 'pc'
  }
  faRotateRight = faRotateRight
  faCircleQuestion = faCircleQuestion
  faGear = faGear
  help = false

  refresh () {
    location.reload()
  }
  toggleHelp () {
    this.help = !this.help
  }
}
