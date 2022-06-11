import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../character';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit {
  @Input() info?: Player
  @Input() updateTime?: Date
  loginTime?: Date
  timeDelta: string = ''
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.info) {
      this.loginTime = new Date(`${this.info.lastLoginAt}+09:00`)
      if (this.updateTime) {
        this.timeDelta = this.ms2unit(+this.updateTime - +this.loginTime)
      }
    }
  }
  ms2unit (ms: number) {
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
