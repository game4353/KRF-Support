import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../character';
import { DataService } from '../data.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.sass']
})
export class SupportComponent implements OnInit {
  players: {time: string, data: Player}[] = []
  show: boolean[] = []
  updateTime?: Date
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getPlayersData().subscribe(arr => {
      if (arr.length === 0) return
      this.updateTime = new Date(`${arr[0].time}+09:00`)
      this.players = arr.sort((a, b) => +new Date(b.data.lastLoginAt) - +new Date(a.data.lastLoginAt))
      this.route.params.subscribe(params => {
        const code = params['code']
        const cid = +params['character']
        //console.log('code', code, 'cid', cid)
        if (code) this.show = this.players.map(obj => obj.data.myCode === code)
        else if (cid) this.show = this.players.map(obj => {
          const cids = obj.data.supportCharacters.map(c => c.characterId)
          if (cids.includes(cid)) return true
          if (cid % 10 === 0 && cids.includes(cid+1)) return true
          return false
        })
        else this.show = this.players.map(_ => true)
      })
    })
  }

}
