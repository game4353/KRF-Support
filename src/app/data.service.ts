import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Data, Player } from './character';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  HOST = 'https://gitlab.com/kirafan/database/-/raw/master/database/'
  GS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0OTf1vSjxvHImFRffN-9FMDrlqceqMrm6JiOI8MUI_4X9d7guccGIGu2xdJTW0Sdi52hBYZNKegwa/pubhtml#'
  weaponData?: {[wid: number]: Data.Weapon}
  playerCache?: {time: string, data: Player}[]

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  /*getSkillData () {
    return this.http.get<Data.SkillList[]>('assets/json/SkillList_PL.json')
  }*/
  getSkillIcon (type: number|'sp'|'auto'|'tree'|'orb'|'blank', isEv4 = false) {
    return '/assets/icon/' + 
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
    /*
    return new Promise((res, rej) => {
      if (!wid) return res(this.DEFAULT)
      this.getWeaponData().subscribe(dict => {
        if (!dict[wid]) return this.error('Invalid weapon ID.')
        const aid = dict[wid].m_ResourceID_R
        res(`https://texture-asset.kirafan.cn/weaponicon/weaponicon_wpn_${aid}.png`)
      })
    })
    */
  }
  getPlayersData () : Observable<{time: string, data: Player}[]>{
    if (this.playerCache) return of(this.playerCache)
    return this.http.get(this.GS, { responseType: 'text' }).pipe(
      map(htmlString => {
        const domParser = new DOMParser()
        const htmlElement = domParser.parseFromString(htmlString, 'text/html')
        const sheets = htmlElement.getElementById(`sheets-viewport`)
        const trs = sheets!.lastElementChild!.getElementsByTagName('tr')
        const players = []
        for (let tr of Array.from(trs)) {
          const tds = tr.getElementsByTagName('td')
          if (!tds[0] || !tds[0].innerText) continue
          const player = {
            time: tds[1].innerText,
            data: JSON.parse(tds[2].innerText)
          }
          players.push(player)
        }
        this.playerCache = players
        return players
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
