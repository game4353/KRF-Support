import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { Player } from '../character';
import { DataService } from '../data.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.sass']
})
export class SupportComponent implements OnInit {
  players: Player[] = []
  show: boolean[] = []
  updateTime?: Date
  loaded = false
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    /*
    let cookie = 0
    if (this.cookieService.check('test')) cookie = +this.cookieService.get('test') + 1
    this.cookieService.set('test', String(cookie))
    console.log('cookie: ', cookie)
    */

    this.dataService.getTimeAndPlayers().subscribe(players => {
      this.updateTime = this.dataService.getUpdateTime()
      this.players = players.sort((a, b) => +new Date(b.lastLoginAt) - +new Date(a.lastLoginAt))
      /*this.route.params.subscribe(params => {
        this.loaded = false
        const code = params['code']
        const cid = +params['character']
        //console.log('code', code, 'cid', cid)
        if (code) this.show = this.players.map(obj => obj.myCode === code)
        else if (cid) this.show = this.players.map(obj => {
          const cids = obj.supportCharacters.map(c => c.characterId)
          if (cids.includes(cid)) return true
          if (cid % 10 === 0 && cids.includes(cid+1)) return true
          return false
        })
        else this.show = this.players.map(_ => true)
        
      })*/
      this.loaded = true
    })
  }

}
