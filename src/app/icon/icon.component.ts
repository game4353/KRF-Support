import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass']
})
export class IconComponent implements OnInit {
  @Input() type?: string
  @Input() id?: number
  @Input() tag?: 'sp'
  @Input() opacity: number = 1
  @Input() text?: string | number
  
  bg?: string
  frame?: string
  url: string = ''
  constructor (private dataService: DataService) { }

  ngOnInit(): void {
    let aid = this.id
    if (aid !== undefined) { 
      switch (this.type) {
        case 'icon':
          this.url = this.dataService.getCharaIconFull(aid)
          break
        case 'wpn':
          this.bg = 'assets/icon/IconBG.png'
          this.frame = 'assets/icon/IconFrame.png'
          if (aid > 1e6) {
            aid -= aid % 10
            this.frame = 'assets/icon/IconFrameGold.png'
          } else if (`${aid}`.match(/^1.04$/)) aid += 1
          else if (`${aid}`.match(/^1.05$/)) aid -= 1        
          this.url = this.dataService.getWeaponIcon(aid)
          break
        case 'fruit':
          this.url = this.dataService.getFruitIcon(aid)
          break
        case 'title':
          this.url = this.dataService.getTitleIcon(aid)
          break
      }
    } else if (this.tag !== undefined) {
      switch (this.type) {
        case 'skill':
          this.url = this.dataService.getSkillIcon(this.tag)
          break
      }
    } else {
      switch (this.type) {
        case 'comment':
          this.url = 'assets/icon/IncreaseDecreaseField.png'
          break
      }      
    }
  }

}
