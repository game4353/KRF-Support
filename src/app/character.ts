export namespace Data {
  export interface Weapon {
    m_ID: number
    m_WeaponName: string
    m_Rare: number
    m_ClassType: number
    m_Cost: number
    m_ControllType: number
    m_ResourceID_L: number
    m_ResourceID_R: number
    m_ClassAnimType: number
    m_ExpTableID: number
    m_InitLv: number
    m_LimitLv: number
    m_EvolvedCount: number
    m_InitAtk: number
    m_InitMgc: number
    m_InitDef: number
    m_InitMDef: number
    m_MaxAtk: number
    m_MaxMgc: number
    m_MaxDef: number
    m_MaxMDef: number
    m_SkillID: number
    m_SkillLimitLv: number
    m_SkillExpTableID: number
    m_SaleAmount: number
    m_CanSell: number
    m_UpgradeBonusMaterialItemIDs: number[]
    m_PassiveSkillID: number
    m_EquipableCharaID: number
    default: boolean
    maxEvolution: number
  }
  export interface SkillList {
    m_ID: number
    m_SkillName: string
    m_SkillDetail: string
    m_SkillType: number
    m_UniqueSkillScene: string
    m_UniqueSkillVoiceCueSheet: string
    m_UniqueSkillSeCueSheet: string
    m_UniqueSkillBgmCueName: string
    m_SAP: number
    m_SAG: number
    m_Recasts: [number, number, number]
    m_LoadFactors: [number, number, number]
    m_IsCharaCutIn: 0 | 1
    sap: { index: number, option: number[] }[]
  }
}
export interface Character {
  managedCharacterId: number
  characterId: number
  level: number
  exp: number
  levelBreak: number
  duplicatedCount: number
  arousalLevel: number
  skillLevel1: number
  skillLevel2: number
  skillLevel3: number
  weaponId: number
  weaponLevel: number
  weaponSkillLevel: number
  weaponSkillExp: number
  namedLevel: number
  namedExp: number
  abilityBoardId: number
  equipItemIds: number[] | null
}
export interface Weapon {
  weaponId: number
  weaponLevel: number
  weaponSkillLevel: number
  weaponSkillExp: number
}
export interface Player {
  comment: string
  currentAchievementId: number
  direction: number
  firstFavoriteMember: Character
  lastLoginAt: string
  level: number
  managedFriendId: number
  myCode: string
  name: string
  namedTypes: null
  playerId: number
  state: number
  supportCharacters: Character[]
  supportLimit: number
  supportName: string
  totalExp: number
}