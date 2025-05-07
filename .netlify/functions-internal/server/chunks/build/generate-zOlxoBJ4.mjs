import { _ as __nuxt_component_0 } from './nuxt-link-GA6KQukH.mjs';
import { d as defineStore, c as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useStories } from './useStories-BWLmmMzV.mjs';
import { ArrowLeft } from 'lucide-vue-next';
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
import 'vue-router';
import '@supabase/ssr';
import './useSupabaseClient-BMmqXcE2.mjs';

const templates = [
  {
    title: "A Day at the Park",
    content: `It was a beautiful {timeOfDay} when {name} decided to visit the local park. The {weather} made it perfect for outdoor activities.

As {name} walked along the path, {activity}. It was one of those moments that made {name} appreciate the simple joys of life.

{name} spent hours {secondActivity}, completely losing track of time. As the day drew to a close, {name} couldn't help but smile, knowing this would become a cherished memory.`
  },
  {
    title: "The Family Dinner",
    content: `Nobody could resist {name}'s famous {dish}. It was a recipe passed down through generations, and {name} had perfected it over the years.

The kitchen was filled with {scent} as {name} prepared the meal. Family members kept sneaking peeks, drawn by the irresistible aroma.

When everyone finally gathered around the table, {reaction}. It was moments like these that made {name} truly happy, surrounded by loved ones and good food.`
  },
  {
    title: "An Unexpected Adventure",
    content: `{name} never expected that a routine {routine} would turn into such an adventure. It all started when {incident}.

Instead of panicking, {name} decided to {solution}. Sometimes the best stories come from unexpected situations.

By the end of the day, {name} had learned {lesson}. It just goes to show that every day has the potential for a memorable story.`
  },
  {
    title: "The Family Tradition",
    content: `Every {occasion}, {name} would organize the family's traditional {activity}. It was something everyone looked forward to all year.

This particular time was special because {reason}. {name} made sure everything was perfect, from {detail1} to {detail2}.

Years later, family members would still talk about that day, especially how {memory}. These traditions are what keep our family bonds strong.`
  },
  {
    title: "A Special Gift",
    content: `{name} spent weeks planning the perfect {gift} for {recipient}. It wasn't just any present; it was something that held special meaning.

The inspiration came from {inspiration}. {name} put so much thought and effort into {preparation}.

When the moment finally came to give the gift, {reaction}. It was a reminder that the best presents come from the heart.`
  }
];
const timeOfDay = ["morning", "afternoon", "spring day", "summer evening", "autumn morning", "winter afternoon"];
const weather = ["gentle breeze", "warm sunshine", "perfect temperature", "clear blue sky", "golden sunlight"];
const activities = [
  "spotted a family of ducks having a dance party",
  "found a treasure map drawn in ketchup",
  "met a squirrel wearing a tiny top hat",
  "discovered a garden where the flowers sang opera",
  "came across a group of dogs playing poker",
  "witnessed a cloud that looked exactly like grandpa"
];
const secondActivities = [
  "teaching squirrels to juggle acorns",
  "organizing a snail racing tournament",
  "starting a band with the local birds",
  "hosting a tea party for garden gnomes",
  "writing poetry with a wise old owl"
];
const dishes = ["apple pie", "lasagna", "chicken soup", "chocolate cake", "roast dinner"];
const scents = [
  "warm cinnamon and vanilla",
  "fresh herbs and garlic",
  "baking bread",
  "roasting vegetables",
  "simmering sauce"
];
const reactions = [
  "everyone burst into applause",
  "tears of joy were shed",
  "stories and laughter filled the room",
  "memories of past gatherings were shared",
  "the room was filled with warmth and love"
];
const routines = ["trip to the grocery store", "morning walk", "garden maintenance", "attic cleaning", "bike ride"];
const incidents = [
  "a parade of penguins crashed the party",
  "the garden gnomes came to life and started dancing",
  "all the socks in the house decided to run away",
  "the refrigerator started telling jokes",
  "the family car turned into a giant rubber duck"
];
const solutions = [
  "organize a sock-finding party with the neighborhood",
  "start a dance competition with the garden gnomes",
  "teach the refrigerator better jokes",
  "become the conductor of the bird orchestra",
  "open a driving school for rubber ducks"
];
const lessons = [
  "that sometimes the best plans are no plans",
  "how wonderful our community can be",
  "that every cloud has a silver lining",
  "to always carry an umbrella",
  "that life's surprises can be the best part"
];
const occasions = ["Christmas", "Thanksgiving", "Summer Solstice", "New Year", "Family Reunion"];
const traditions = [
  "scavenger hunt",
  "talent show",
  "cooking competition",
  "storytelling circle",
  "family Olympics"
];
const reasons = [
  "the youngest generation was finally old enough to participate",
  "we had family visiting from overseas",
  "it marked our 50th year of the tradition",
  "we were celebrating multiple milestones",
  "we had four generations present"
];
const details = [
  "the decorations",
  "the music playlist",
  "the seating arrangement",
  "the party favors",
  "the menu selection",
  "the activities planned",
  "the special surprises"
];
const memories = [
  "everyone ended up dancing in the rain",
  "the youngest ones stole the show",
  "we laughed until sunrise",
  "we created a new family tradition",
  "we broke the record for longest conga line"
];
const gifts = ["handmade quilt", "restored family photo album", "custom recipe book", "memory box", "family tree artwork"];
const recipients = ["grandma", "grandpa", "mom", "dad", "aunt", "uncle"];
const inspirations = [
  "an old family story",
  "a shared childhood memory",
  "a forgotten family tradition",
  "a discovered family heirloom",
  "a meaningful conversation"
];
const preparations = [
  "collecting old photos and memories",
  "learning a new craft",
  "interviewing family members",
  "researching family history",
  "practicing the perfect technique"
];
const useStoryTemplates = defineStore("storyTemplates", {
  state: () => ({
    templates,
    timeOfDay,
    weather,
    activities,
    secondActivities,
    dishes,
    scents,
    reactions,
    routines,
    incidents,
    solutions,
    lessons,
    occasions,
    traditions,
    reasons,
    details,
    memories,
    gifts,
    recipients,
    inspirations,
    preparations
  }),
  actions: {
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    generateStory(name) {
      const template = this.getRandomItem(this.templates);
      let content = template.content.replace(/\{name\}/g, name).replace(/\{timeOfDay\}/g, this.getRandomItem(this.timeOfDay)).replace(/\{weather\}/g, this.getRandomItem(this.weather)).replace(/\{activity\}/g, this.getRandomItem(this.activities)).replace(/\{secondActivity\}/g, this.getRandomItem(this.secondActivities)).replace(/\{dish\}/g, this.getRandomItem(this.dishes)).replace(/\{scent\}/g, this.getRandomItem(this.scents)).replace(/\{reaction\}/g, this.getRandomItem(this.reactions)).replace(/\{routine\}/g, this.getRandomItem(this.routines)).replace(/\{incident\}/g, this.getRandomItem(this.incidents)).replace(/\{solution\}/g, this.getRandomItem(this.solutions)).replace(/\{lesson\}/g, this.getRandomItem(this.lessons)).replace(/\{occasion\}/g, this.getRandomItem(this.occasions)).replace(/\{activity\}/g, this.getRandomItem(this.traditions)).replace(/\{reason\}/g, this.getRandomItem(this.reasons)).replace(/\{detail1\}/g, this.getRandomItem(this.details)).replace(/\{detail2\}/g, this.getRandomItem(this.details)).replace(/\{memory\}/g, this.getRandomItem(this.memories)).replace(/\{gift\}/g, this.getRandomItem(this.gifts)).replace(/\{recipient\}/g, this.getRandomItem(this.recipients)).replace(/\{inspiration\}/g, this.getRandomItem(this.inspirations)).replace(/\{preparation\}/g, this.getRandomItem(this.preparations));
      return {
        title: template.title,
        content
      };
    }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RandomStoryGenerator",
  __ssrInlineRender: true,
  setup(__props) {
    useStoryTemplates();
    useStories();
    const characterName = ref("");
    const seed = ref("initial");
    const generatedStory = ref(null);
    const savedStoryId = ref(null);
    computed(() => {
      const params = new URLSearchParams({
        seed: seed.value,
        backgroundColor: "b6e3f4",
        radius: "50"
      });
      return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-xl p-6" }, _attrs))}><div class="flex items-center gap-6 mb-8">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div><h2 class="text-2xl font-bold text-gray-900 mb-2">Random Story Generator</h2><p class="text-gray-600">Create a random story with a unique character</p></div></div><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-1">Character Name</label><input${ssrRenderAttr("value", characterName.value)} type="text" required placeholder="Enter a name" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"></div>`);
      if (generatedStory.value) {
        _push(`<div class="space-y-4"><h3 class="text-xl font-semibold text-gray-900">${ssrInterpolate(generatedStory.value.title)}</h3><p class="text-gray-700 whitespace-pre-line">${ssrInterpolate(generatedStory.value.content)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-4"><button class="flex-1 px-4 py-2 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-md hover:bg-sky-100"> New Avatar </button><button${ssrIncludeBooleanAttr(!characterName.value) ? " disabled" : ""} class="flex-1 px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"> Generate Story </button></div>`);
      if (generatedStory.value && !savedStoryId.value) {
        _push(`<div class="flex justify-end"><button class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"> Save Story </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (savedStoryId.value) {
        _push(`<div class="flex justify-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/stories/${savedStoryId.value}`,
          class: "px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Story `);
            } else {
              return [
                createTextVNode(" View Story ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/stories",
          class: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` All Stories `);
            } else {
              return [
                createTextVNode(" All Stories ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100"> Generate Another </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RandomStoryGenerator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "generate",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RandomStoryGenerator = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" }, _attrs))}><header class="py-4"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"><h1 class="text-3xl font-bold text-gray-900">Story Generator</h1><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: "inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-5 w-5 mr-2" }, null, _parent2, _scopeId));
            _push2(` Back to Stories `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "h-5 w-5 mr-2" }),
              createTextVNode(" Back to Stories ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      _push(ssrRenderComponent(_component_RandomStoryGenerator, null, null, _parent));
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/generate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=generate-zOlxoBJ4.mjs.map
