import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Player } from './character'

// chinoAYAYA logo
// https://www.pixiv.net/artworks/74830542

// ver 9
const GS = 'https://script.google.com/macros/s/AKfycbwNW4gmgtey5O1uwNNNZ_4FnMNlU9cwvy0X5Kxw4dhmGX3vIervpZ4B5i0oqQe8dQxkrA/exec'
const GSsupport = `${GS}?exec=1mrcVKtBRbU0AArT`


@Injectable({
  providedIn: 'root'
})
export class OutsourceService {

  constructor (
    private http: HttpClient
  ) { }
  fetchSupport () {
    return this.http.get<string[][]>(GSsupport).pipe(
      map(arr => {
        const timestamp = arr.shift()![1]
        const updateTime = new Date(`${timestamp} GMT+9`)
        const players = <Player[]>arr.map(row => JSON.parse(row[1]))
        return { updateTime, players }
      })
    )
  }
  fetchCharaIconFull (aid: number) {
    return `https://mergedcharaicon-asset.kirafan.cn/charaicon_${aid}.png`
  }
  fetchWeaponIcon (aid: number) {
    return `https://texture-asset.kirafan.cn/weaponicon/weaponicon_wpn_${aid}.png`
  }
  fetchFruitIcon (aid: number) {
    return `https://asset.kirafan.cn/texture/itemicon/itemicon_${aid}.png`
  }
  fetchTitleIcon (aid: number) {
    return `https://asset.kirafan.cn/texture/achievement/achievement_${aid}.png`
  }
}
