<script setup lang="ts">
import l00 from "~/assets/maps/00_Arrival.svg";
import l01 from "~/assets/maps/01_Bigger_Guns_Nearby.svg";
import l02 from "~/assets/maps/02_Never_Burn_Money.svg";
import l03 from "~/assets/maps/03_Defend_THIS.svg";
import l04 from "~/assets/maps/04_Couch_Fishing.svg";
import l05 from "~/assets/maps/05_The_Rose.svg";
import l06 from "~/assets/maps/06_Smells_Like_Napalm_Tastes_Like_Chicken.svg";
import l07 from "~/assets/maps/07_Cool_Fusion.svg";
import l08 from "~/assets/maps/08_G4_Sunbathing.svg";
import l09 from "~/assets/maps/09_Blaspheme_Quarantine.svg";
import l10 from "~/assets/maps/10_Bob_B_Q.svg";
import l11 from "~/assets/maps/11_Shake_Before_Using.svg";
import l12 from "~/assets/maps/12_Fire_Fire_Fire_Fire_Fire.svg";
import l13 from "~/assets/maps/13_Colony_Ship_For_Sale_Cheap.svg";
import l14 from "~/assets/maps/14_Habe_Quiddam.svg";
import l15 from "~/assets/maps/15_Neither_High_nor_Low.svg";
import l17 from "~/assets/maps/17_No_Artificial_Colors.svg";
import l20 from "~/assets/maps/20_Beware_of_Low_Flying_Defense_Drones.svg";
import l24 from "~/assets/maps/24_Welcome_to_the_Revolution.svg";
import l25 from "~/assets/maps/25_Try_again.svg";
import l26 from "~/assets/maps/26_Ingue_Ferroque.svg";
// i know

const MAPS = {
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
};

const props = defineProps<{
  index: number;
  viewBox?: string;
}>();

const map = computed(() => MAPS[props.index as keyof typeof MAPS]);
</script>

<template>
  <component :is="map" :viewBox="props.viewBox" />
</template>
