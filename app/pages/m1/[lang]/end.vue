<script setup lang="ts">
import { BASE_URL } from "~/lib/url";

const ogTitle = `Marathon`;
const ogDescription = `Epilogue`;

useHead({
  title: "Marathon",
  meta: [
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { property: "og:image", content: `${BASE_URL}/marathon-logo.png` },
    { name: "twitter:image", content: `${BASE_URL}/marathon-logo.png` },
  ],
});
</script>

<template>
  <div class="h-100dvh flex flex-col gap-8">
    <Header />
    <div
      class="font-[Orbit] mx-auto w-full max-w-[60ch] px-[2ch] pb-80 text-right text-pretty sm:text-balance break-keep wrap-break-word text-lg flex flex-col gap-12"
    >
      <p>
        포어의 반역자 정찰선은 17년 동안 별 무리와 은하의 중심을 가로지르며
        칠천여 개 항성계의 기록을 작성하고 폐기하다, 우리은하 중력의 중심에서
        97광년 떨어진 희미한 별의 두 번째 행성을 천천히 공전하기 시작했다.
      </p>

      <p>
        탐사선이 제작되어 발사되었다. 기술의 원래 주인인 포어도, 인공지능의
        제작을 감독한 미쳐버린 천재들도 경악할 기술력의 추진기와 장비가 달려
        있었다. 대륙의 윤곽이 지도에 그려졌고, 행성을 덮은 사막의 이동하는
        모래와 바위 아래 묻혀 있던 고대 도시의 방사능에 오염된 유적들이
        나타났다.
      </p>

      <p>
        지칠 줄 모르는, 기계의 힘으로 불멸을 얻은 승무원들은 아래에 묻힌 죽은
        세계의 후손이자 유전적 개선품이었다. 천 년이 넘는 시간을 넘어 돌아와
        고향 땅을 밟은 것은 그들 종족에서 그들이 처음이었다. 그들은 압제자에
        맞설 무기와 기술을 찾기 위해, 자신을 노예로 만든 고대 전쟁의 잔해를
        수색했다.
      </p>

      <p class="text-balance">
        함선의 안팎에서, 포어 컴퓨터의 잔해 사이를 춤추며
      </p>

      <p class="text-2xl font-bold">듀란달은 웃고 있었다</p>
    </div>
  </div>
</template>
