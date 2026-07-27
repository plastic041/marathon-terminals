import type { Component } from "vue";
import type { GameId } from "~/games";
import l00 from "~/assets/maps/00_Arrival.svg?component";
import l01 from "~/assets/maps/01_Bigger_Guns_Nearby.svg?component";
import l02 from "~/assets/maps/02_Never_Burn_Money.svg?component";
import l03 from "~/assets/maps/03_Defend_THIS.svg?component";
import l04 from "~/assets/maps/04_Couch_Fishing.svg?component";
import l05 from "~/assets/maps/05_The_Rose.svg?component";
import l06 from "~/assets/maps/06_Smells_Like_Napalm_Tastes_Like_Chicken.svg?component";
import l07 from "~/assets/maps/07_Cool_Fusion.svg?component";
import l08 from "~/assets/maps/08_G4_Sunbathing.svg?component";
import l09 from "~/assets/maps/09_Blaspheme_Quarantine.svg?component";
import l10 from "~/assets/maps/10_Bob_B_Q.svg?component";
import l11 from "~/assets/maps/11_Shake_Before_Using.svg?component";
import l12 from "~/assets/maps/12_Fire_Fire_Fire_Fire_Fire.svg?component";
import l13 from "~/assets/maps/13_Colony_Ship_For_Sale_Cheap.svg?component";
import l14 from "~/assets/maps/14_Habe_Quiddam.svg?component";
import l15 from "~/assets/maps/15_Neither_High_nor_Low.svg?component";
import l17 from "~/assets/maps/17_No_Artificial_Colors.svg?component";
import l20 from "~/assets/maps/20_Beware_of_Low_Flying_Defense_Drones.svg?component";
import l24 from "~/assets/maps/24_Welcome_to_the_Revolution.svg?component";
import l25 from "~/assets/maps/25_Try_again.svg?component";
import l26 from "~/assets/maps/26_Ingue_Ferroque.svg?component";
// :(

export const MAPS: Record<GameId, Record<number, Component>> = {
  m1: {
    0: l00,
    1: l01,
    2: l02,
    3: l03,
    4: l04,
    5: l05,
    6: l06,
    7: l07,
    8: l08,
    9: l09,
    10: l10,
    11: l11,
    12: l12,
    13: l13,
    14: l14,
    15: l15,
    17: l17,
    20: l20,
    24: l24,
    25: l25,
    26: l26,
  },
  // m2는 맵 없음
  m2: {},
};
