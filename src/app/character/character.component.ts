import { Component, Input, OnInit } from '@angular/core';
import { Character, Weapon } from '../character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {
  @Input() chara?: Character
  @Input() show = 'all'
  wpn?: Weapon
  basicFruits: (number | undefined)[] = []
  topFruit?: number
  constructor () { }

  ngOnInit(): void {
    if (this.chara) {
      this.wpn = {
        weaponId: this.chara.weaponId,
        weaponLevel: this.chara.weaponLevel,
        weaponSkillExp: this.chara.weaponSkillExp,
        weaponSkillLevel: this.chara.weaponSkillLevel
      }
      for (let i = 0; i < 15; i++) 
        this.basicFruits[i] = (this.chara.equipItemIds || [])[i]
      this.topFruit = (this.chara.equipItemIds || [])[15]
    }
  }
}
