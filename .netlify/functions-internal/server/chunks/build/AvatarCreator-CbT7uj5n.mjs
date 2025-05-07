import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AvatarCreator",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const skinColors = [
      "623d36",
      "92594b",
      "b16a5b",
      "d78774",
      "e5a07e",
      "e7a391",
      "eeb4a4"
    ];
    const hairStyles = [
      "bald",
      "balding",
      "bobBangs",
      "bobCut",
      "bunUndercut",
      "buzzcut",
      "curly",
      "curlyBun",
      "curlyHighTop",
      "fade",
      "long",
      "mohawk",
      "pigtails",
      "shortCombover",
      "straightBun"
    ];
    const bodyStyles = [
      "checkered",
      "rounded",
      "small",
      "squared"
    ];
    const noseStyles = [
      "mediumRound",
      "smallRound",
      "wrinkles"
    ];
    const eyeStyles = [
      "glasses",
      "happy",
      "open",
      "sleep",
      "sunglasses",
      "wink"
    ];
    const mouthStyles = [
      "bigSmile",
      "frown",
      "lips",
      "pacifier",
      "smile",
      "smirk",
      "surprise"
    ];
    const facialHairStyles = [
      "beardMustache",
      "goatee",
      "pyramid",
      "shadow",
      "soulPatch",
      "walrus"
    ];
    const hairColors = [
      "6c4545",
      "362c47",
      "dee1f5",
      "e15c66",
      "e16381",
      "f27d65",
      "f29c65"
    ];
    const clothingColors = [
      "6dbb58",
      "54d7c7",
      "456dff",
      "7555ca",
      "e24553",
      "f3b63a",
      "f55d81"
    ];
    const backgroundColors = [
      "b6e3f4",
      "c0aede",
      "ffd5dc",
      "ffdfbf",
      "bde4a7",
      "b4e9f8"
    ];
    const options = ref({
      skinColor: "d78774",
      hair: "balding",
      body: "checkered",
      nose: "wrinkles",
      eyes: "glasses",
      mouth: "bigSmile",
      facialHair: "walrus",
      hairColor: "dee1f5",
      clothingColor: "f3b63a",
      backgroundColor: "bde4a7"
    });
    const buildUrlParams = (opts = {}) => {
      const mergedOptions = { ...options.value, ...opts };
      const params = new URLSearchParams();
      Object.entries(mergedOptions).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
      params.append("radius", "50");
      return params.toString();
    };
    const avatarUrl = computed(() => {
      return `https://api.dicebear.com/7.x/personas/svg?${buildUrlParams()}`;
    });
    const getPreviewUrl = (overrides = {}) => {
      return `https://api.dicebear.com/7.x/personas/svg?${buildUrlParams(overrides)}`;
    };
    __expose({
      getAvatarUrl: () => avatarUrl.value
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-xl p-6" }, _attrs))}><div class="flex items-center gap-6 mb-8"><div class="relative w-24 h-24"><img${ssrRenderAttr("src", avatarUrl.value)} alt="Avatar Preview" class="w-24 h-24 max-w-none rounded-full border-4 border-white shadow-lg animate-float"></div><div><h2 class="text-2xl font-bold text-gray-900 mb-2">Avatar Creator</h2><p class="text-gray-600">Customize your family member&#39;s avatar</p></div></div><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Skin Color</label><div class="grid grid-cols-6 gap-2"><!--[-->`);
      ssrRenderList(skinColors, (color) => {
        _push(`<button class="${ssrRenderClass([
          "w-8 h-8 rounded-full border-2 transition-all duration-200",
          options.value.skinColor === color ? "border-sky-500 scale-110 shadow-lg" : "border-gray-200"
        ])}" style="${ssrRenderStyle({ backgroundColor: `#${color}` })}"></button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Hair Style</label><div class="grid grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(hairStyles, (style) => {
        _push(`<button class="${ssrRenderClass([
          "p-2 rounded-lg border-2 transition-all duration-200",
          options.value.hair === style ? "border-sky-500 bg-sky-50 shadow-lg" : "border-gray-200"
        ])}"><img${ssrRenderAttr("src", getPreviewUrl({ hair: style }))}${ssrRenderAttr("alt", style)} class="w-full h-auto rounded-full aspect-square object-cover"><p class="text-center text-sm mt-1 capitalize">${ssrInterpolate(style.replace(/([A-Z])/g, " $1").trim())}</p></button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Body Type</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(bodyStyles, (style) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          options.value.body === style ? "bg-sky-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        ])}">${ssrInterpolate(style.replace(/([A-Z])/g, " $1").trim())}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Nose Style</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(noseStyles, (style) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          options.value.nose === style ? "bg-sky-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        ])}">${ssrInterpolate(style.replace(/([A-Z])/g, " $1").trim())}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Eyes</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(eyeStyles, (style) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          options.value.eyes === style ? "bg-sky-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        ])}">${ssrInterpolate(style.replace(/([A-Z])/g, " $1").trim())}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Mouth</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(mouthStyles, (style) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          options.value.mouth === style ? "bg-sky-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        ])}">${ssrInterpolate(style.replace(/([A-Z])/g, " $1").trim())}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Facial Hair</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(facialHairStyles, (style) => {
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          options.value.facialHair === style ? "bg-sky-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        ])}">${ssrInterpolate(style.replace(/([A-Z])/g, " $1").trim())}</button>`);
      });
      _push(`<!--]--><button class="${ssrRenderClass([
        "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
        !options.value.facialHair ? "bg-sky-500 text-white shadow-lg scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      ])}"> None </button></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Hair Color</label><div class="grid grid-cols-6 gap-2"><!--[-->`);
      ssrRenderList(hairColors, (color) => {
        _push(`<button class="${ssrRenderClass([
          "w-8 h-8 rounded-full border-2 transition-all duration-200",
          options.value.hairColor === color ? "border-sky-500 scale-110 shadow-lg" : "border-gray-200"
        ])}" style="${ssrRenderStyle({ backgroundColor: `#${color}` })}"></button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Clothing Color</label><div class="grid grid-cols-6 gap-2"><!--[-->`);
      ssrRenderList(clothingColors, (color) => {
        _push(`<button class="${ssrRenderClass([
          "w-8 h-8 rounded-full border-2 transition-all duration-200",
          options.value.clothingColor === color ? "border-sky-500 scale-110 shadow-lg" : "border-gray-200"
        ])}" style="${ssrRenderStyle({ backgroundColor: `#${color}` })}"></button>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Background Color</label><div class="grid grid-cols-6 gap-2"><!--[-->`);
      ssrRenderList(backgroundColors, (color) => {
        _push(`<button class="${ssrRenderClass([
          "w-8 h-8 rounded-full border-2 transition-all duration-200",
          options.value.backgroundColor === color ? "border-sky-500 scale-110 shadow-lg" : "border-gray-200"
        ])}" style="${ssrRenderStyle({ backgroundColor: `#${color}` })}"></button>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AvatarCreator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AvatarCreator-CbT7uj5n.mjs.map
