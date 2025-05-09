import { _ as __nuxt_component_0 } from './nuxt-link-Du4lMCKR.mjs';
import { computed, mergeProps, unref, defineComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { LogOut } from 'lucide-vue-next';
import { c as useRoute, a as useRouter, u as useSupabaseUser } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CKQ8h17k.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main$2 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useSupabaseClient();
    const user = useSupabaseUser();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><nav class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&amp;hair=balding&amp;body=checkered&amp;nose=wrinkles&amp;eyes=glasses&amp;mouth=bigSmile&amp;facialHair=walrus&amp;hairColor=dee1f5&amp;clothingColor=f3b63a&amp;backgroundColor=bde4a7&amp;facialHairProbability=100&amp;radius=50" alt="Kintales" class="w-10 h-10 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300"${_scopeId}><span class="text-2xl font-bold text-gray-900"${_scopeId}>Kintales</span>`);
          } else {
            return [
              createVNode("img", {
                src: "https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&hair=balding&body=checkered&nose=wrinkles&eyes=glasses&mouth=bigSmile&facialHair=walrus&hairColor=dee1f5&clothingColor=f3b63a&backgroundColor=bde4a7&facialHairProbability=100&radius=50",
                alt: "Kintales",
                class: "w-10 h-10 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300"
              }),
              createVNode("span", { class: "text-2xl font-bold text-gray-900" }, "Kintales")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["text-gray-600 hover:text-gray-900 font-medium transition-colors", { "text-sky-600": unref(route).path === "/" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: ["text-gray-600 hover:text-gray-900 font-medium transition-colors", { "text-sky-600": unref(route).path.startsWith("/stories") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Stories `);
          } else {
            return [
              createTextVNode(" Stories ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(user)) {
        _push(`<button class="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent));
        _push(` Sign Out </button>`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-gray-600 hover:text-gray-900 font-medium transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign In `);
            } else {
              return [
                createTextVNode(" Sign In ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/signup",
          class: "px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign Up `);
            } else {
              return [
                createTextVNode(" Sign Up ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></nav></div></header>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StoriesSubnav",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const navItems = [
      { name: "All Stories", path: "/stories" },
      { name: "Story Generator", path: "/generate" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 border-b border-gray-200" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex space-x-8"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: ["py-4 px-1 border-b-2 font-medium text-sm transition-colors", [
            unref(route).path === item.path ? "border-sky-500 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          ]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StoriesSubnav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const showSubnav = computed(
      () => route.path === "/stories" || route.path === "/generate" || route.path.startsWith("/stories/")
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = _sfc_main$2;
      const _component_StoriesSubnav = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      if (unref(showSubnav)) {
        _push(ssrRenderComponent(_component_StoriesSubnav, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BZWO1qkH.mjs.map
