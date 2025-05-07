import { _ as _sfc_main$1 } from './AvatarCreator-CbT7uj5n.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "avatar",
  __ssrInlineRender: true,
  setup(__props) {
    const avatarCreator = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AvatarCreator = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-12 px-4" }, _attrs))}><div class="max-w-3xl mx-auto">`);
      _push(ssrRenderComponent(_component_AvatarCreator, {
        ref_key: "avatarCreator",
        ref: avatarCreator
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/avatar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=avatar-8kOf_wwn.mjs.map
