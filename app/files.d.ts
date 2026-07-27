// Specify the file extension you want to import
declare module "*.yaml" {
  const value: any; // Add type definitions here if desired
  export default value;
}

// vite-svg-loader: `?component` 로 불러오면 Vue 컴포넌트가 된다.
declare module "*.svg?component" {
  import type { FunctionalComponent, SVGAttributes } from "vue";
  const src: FunctionalComponent<SVGAttributes>;
  export default src;
}
