import { Component, Input, OnInit } from '@angular/core';
import { Weapon } from '../character';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.sass']
})
export class WeaponComponent implements OnInit {
  @Input() wpn?: Weapon
  ev: number | '' = ''
  constructor (private dataService: DataService) { }

  ngOnInit(): void {
    if (!this.wpn) return
    if (this.wpn.weaponId > 99999) this.ev = this.wpn.weaponId % 10
  }

}
