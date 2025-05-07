import { _ as __nuxt_component_0 } from './nuxt-link-GA6KQukH.mjs';
import { _ as _sfc_main$2 } from './AvatarCreator-CbT7uj5n.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useStories } from './useStories-BWLmmMzV.mjs';
import { Wand2, Plus, Home, Trash2 } from 'lucide-vue-next';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@supabase/ssr';
import './useSupabaseClient-BMmqXcE2.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CreateStoryModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useStories();
    const avatarCreator = ref();
    const backgroundColors = [
      { class: "bg-sky-100" },
      { class: "bg-rose-100" },
      { class: "bg-indigo-100" },
      { class: "bg-amber-100" },
      { class: "bg-blue-100" },
      { class: "bg-green-100" },
      { class: "bg-purple-100" },
      { class: "bg-orange-100" }
    ];
    const form = ref({
      familyMember: "",
      author: "",
      title: "",
      content: "",
      backgroundColor: backgroundColors[0].class
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AvatarCreator = _sfc_main$2;
      if (_ctx.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" }, _attrs))}><div class="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-auto"><div class="p-6"><h2 class="text-2xl font-bold mb-6">Create New Story</h2><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Family Member Name</label><input${ssrRenderAttr("value", form.value.familyMember)} type="text" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Author</label><input${ssrRenderAttr("value", form.value.author)} type="text" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Title</label><input${ssrRenderAttr("value", form.value.title)} type="text" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Story</label><textarea rows="6" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">${ssrInterpolate(form.value.content)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Background Color</label><div class="grid grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(backgroundColors, (color) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "w-full h-12 rounded-lg border-2 transition-all duration-200",
            color.class,
            form.value.backgroundColor === color.class ? "border-sky-500 shadow-md scale-110" : "border-gray-200"
          ])}"></button>`);
        });
        _push(`<!--]--></div></div></div><div>`);
        _push(ssrRenderComponent(_component_AvatarCreator, {
          ref_key: "avatarCreator",
          ref: avatarCreator
        }, null, _parent));
        _push(`</div></div><div class="flex justify-end space-x-3 pt-4"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"> Cancel </button><button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700"> Create Story </button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CreateStoryModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stories",
  __ssrInlineRender: true,
  setup(__props) {
    const { stories, isLoading } = useStories();
    const isCreateModalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CreateStoryModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" }, _attrs))}><header class="py-4"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"><h1 class="text-3xl font-bold text-gray-900">All Stories</h1><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/generate",
        class: "inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Wand2), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Generate Story `);
          } else {
            return [
              createVNode(unref(Wand2), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Generate Story ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-105">`);
      _push(ssrRenderComponent(unref(Plus), { class: "h-5 w-5 mr-2" }, null, _parent));
      _push(` New Story </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-105 hover:rotate-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Home), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Back Home `);
          } else {
            return [
              createVNode(unref(Home), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Back Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(isLoading)) {
        _push(`<div class="flex justify-center items-center min-h-[50vh]"><div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div></div>`);
      } else if (unref(stories).length === 0) {
        _push(`<div class="text-center py-12"><h2 class="text-2xl font-semibold text-gray-600">No stories yet</h2><p class="mt-2 text-gray-500">Click the &quot;New Story&quot; button to create your first story!</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(stories), (story) => {
          _push(`<div class="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"><button class="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 transition-colors" title="Delete story">`);
          _push(ssrRenderComponent(unref(Trash2), { class: "h-5 w-5" }, null, _parent));
          _push(`</button>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/stories/${story.id}`,
            class: "block p-6"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center mb-4"${_scopeId}><img${ssrRenderAttr("src", story.avatarUrl)}${ssrRenderAttr("alt", story.familyMember)} class="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"${_scopeId}><div${_scopeId}><h2 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(story.familyMember)}</h2><p class="text-sm text-gray-500"${_scopeId}>by ${ssrInterpolate(story.author)}</p></div></div><h3 class="text-lg font-medium text-gray-900 mb-2"${_scopeId}>${ssrInterpolate(story.title)}</h3><p class="text-gray-600 line-clamp-3"${_scopeId}>${ssrInterpolate(story.content)}</p>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center mb-4" }, [
                    createVNode("img", {
                      src: story.avatarUrl,
                      alt: story.familyMember,
                      class: "w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md"
                    }, null, 8, ["src", "alt"]),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(story.familyMember), 1),
                      createVNode("p", { class: "text-sm text-gray-500" }, "by " + toDisplayString(story.author), 1)
                    ])
                  ]),
                  createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, toDisplayString(story.title), 1),
                  createVNode("p", { class: "text-gray-600 line-clamp-3" }, toDisplayString(story.content), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CreateStoryModal, {
        "is-open": isCreateModalOpen.value,
        onClose: ($event) => isCreateModalOpen.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stories-H3toEgoZ.mjs.map
