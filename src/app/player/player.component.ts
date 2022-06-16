import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../character';
import { DataService } from '../data.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {
  @Input() info?: Player
  show: boolean = true
  timeDelta: string = ''
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // filter from url
    this.route.params.subscribe(params => {
      const code = params['code']
      const cid = +params['character']
      if (!this.info) return
      if (code) this.show = this.info.myCode === code
      else if (cid) {
        const cids = this.info.supportCharacters.map(c => c.characterId)
        if (cids.includes(cid)) this.show = true
        else if (cid % 10 === 0 && cids.includes(cid+1)) this.show = true
        else this.show = false
      }
      else this.show = true
    })
    
    if (!this.info) return
    const updateTime = this.dataService.getUpdateTime()
    const loginTime = new Date(`${this.info.lastLoginAt}+09:00`)
    if (updateTime) this.timeDelta = this.timeDiff(loginTime, updateTime)
  }
  timeDiff (before: Date, after: Date) {
    let ms = +after - +before
    ms = Math.floor(ms / 1000)
    if (ms < 60) return `${ms} secs`
    ms = Math.floor(ms / 60)
    if (ms < 60) return `${ms} mins`
    ms = Math.floor(ms / 60)
    if (ms < 24) return `${ms} hrs`
    ms = Math.floor(ms / 24)
    if (ms < 1000) return `${ms} days`
    return `999+ days`
  }
  searchChara (cid: number) {
    this.router.navigate(['/character', cid - (cid % 10)])
  }
  searchCode (code: string) {
    this.router.navigate(['/code', code])
  }

}
