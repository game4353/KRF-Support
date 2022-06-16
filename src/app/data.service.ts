import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Data, Player } from './character';

const DB = 'https://gitlab.com/kirafan/database/-/raw/master/database/'
const GS = 'https://script.google.com/macros/s/AKfycbxfDBznp5K-_b9dBVio3hK-udXlRTkzAkUH4UAgIK3EazbXs1fnI649Xk49gOIKdpHnqQ/exec'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  weaponData?: { [wid: number]: Data.Weapon }
  playerCache?: { time: string, data: Player }[]
  timePlayersCache?: { timestamp: string, players: Player[] }
  cache: {
    time?: Date,
    players?: Player[]
  } = {}

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  getSkillIcon (type: number|'sp'|'auto'|'tree'|'orb'|'blank', isEv4 = false) {
    return 'assets/icon/' + 
    (() => {
      if (type === 'sp') return 'CMD_SkillSP'
      if (type === 'auto') return 'CMD_SkillPassive'
      if (type === 'tree') return 'AbilityIcon'
      if (type === 'orb') return 'OrbBuffIcon'
      if (type === 'blank') return 'CMD_Blank'
      if (isEv4) type += 10
      switch (type) {
          case 0: return "CMD_NormalAttack"
          case 1: return "CMD_NormalMagicAttack"
          case 3: return "CMD_SkillAttack"
          case 4: return "CMD_SkillMagic"
          case 5: return "CMD_SkillRecovery"
          case 6: return "CMD_SkillBuff"
          case 7: return "CMD_SkillDeBuff"
          case 10: 
          case 11:
          case 13:
          case 14:
            return "CMD_ActiveAttack"
          case 15:
            return "CMD_ActiveRecovery"
          case 16: 
          case 17:
            return "CMD_ActiveBuff"
          default:
            console.log(`Unknown skill type: ${type}`)
            return ''
      }
    })() + '.png'
  }
  getTitleIcon (aid: number) {
    return `https://asset.kirafan.cn/texture/achievement/achievement_${aid}.png`
  }
  getFruitIcon (aid: number) {
    return `https://asset.kirafan.cn/texture/itemicon/itemicon_${aid}.png`
  }
  getCharaIconFull (aid: number) {
    return `https://mergedcharaicon-asset.kirafan.cn/charaicon_${aid}.png`
  }
  getWeaponIcon (aid: number): string {
    return `https://texture-asset.kirafan.cn/weaponicon/weaponicon_wpn_${aid}.png`
  }
  getUpdateTime () {
    return this.cache.time
  }
  getTimeAndPlayers () {
    if (this.cache.players) return of(this.cache.players)
    return this.http.get<string[][]>(`${GS}?support=true`).pipe(
      map(arr => {
        const timestamp = arr.shift()![1]
        this.cache.time = new Date(`${timestamp} GMT+9`)
        const players = <Player[]>arr.map(row => JSON.parse(row[1]))
        return this.cache.players = players
      })
    )
  }
  /*getWeaponData () {
    const url = `${this.HOST}WeaponList.json`
    if (this.weaponData) return of(this.weaponData)
    return this.http.get<Data.Weapon[]>(url)
      .pipe(
        map(data => {
          this.weaponData = {}
          for (let d of data) this.weaponData[d.m_ID] = d
          return this.weaponData
        }),
        catchError(this.handleError<Data.Weapon[]>('getWeaponData', []))
      )
  }*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log (message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private error (message: string) {

  }
}
