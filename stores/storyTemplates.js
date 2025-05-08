import { defineStore } from 'pinia'

/**
 * @typedef {Object} StoryTemplate
 * @property {string} title - The title of the story template
 * @property {string} content - The content template with placeholders
 */

/** @type {StoryTemplate[]} */
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
]

const timeOfDay = ['morning', 'afternoon', 'spring day', 'summer evening', 'autumn morning', 'winter afternoon']
const weather = ['gentle breeze', 'warm sunshine', 'perfect temperature', 'clear blue sky', 'golden sunlight']
const activities = [
  'spotted a family of ducks having a dance party',
  'found a treasure map drawn in ketchup',
  'met a squirrel wearing a tiny top hat',
  'discovered a garden where the flowers sang opera',
  'came across a group of dogs playing poker',
  'witnessed a cloud that looked exactly like grandpa'
]
const secondActivities = [
  'teaching squirrels to juggle acorns',
  'organizing a snail racing tournament',
  'starting a band with the local birds',
  'hosting a tea party for garden gnomes',
  'writing poetry with a wise old owl'
]
const dishes = ['apple pie', 'lasagna', 'chicken soup', 'chocolate cake', 'roast dinner']
const scents = [
  'warm cinnamon and vanilla',
  'fresh herbs and garlic',
  'baking bread',
  'roasting vegetables',
  'simmering sauce'
]
const reactions = [
  'everyone burst into applause',
  'tears of joy were shed',
  'stories and laughter filled the room',
  'memories of past gatherings were shared',
  'the room was filled with warmth and love'
]
const routines = ['trip to the grocery store', 'morning walk', 'garden maintenance', 'attic cleaning', 'bike ride']
const incidents = [
  'a parade of penguins crashed the party',
  'the garden gnomes came to life and started dancing',
  'all the socks in the house decided to run away',
  'the refrigerator started telling jokes',
  'the family car turned into a giant rubber duck'
]
const solutions = [
  'organize a sock-finding party with the neighborhood',
  'start a dance competition with the garden gnomes',
  'teach the refrigerator better jokes',
  'become the conductor of the bird orchestra',
  'open a driving school for rubber ducks'
]
const lessons = [
  'that sometimes the best plans are no plans',
  'how wonderful our community can be',
  'that every cloud has a silver lining',
  'to always carry an umbrella',
  'that life\'s surprises can be the best part'
]
const occasions = ['Christmas', 'Thanksgiving', 'Summer Solstice', 'New Year', 'Family Reunion']
const traditions = [
  'scavenger hunt',
  'talent show',
  'cooking competition',
  'storytelling circle',
  'family Olympics'
]
const reasons = [
  'the youngest generation was finally old enough to participate',
  'we had family visiting from overseas',
  'it marked our 50th year of the tradition',
  'we were celebrating multiple milestones',
  'we had four generations present'
]
const details = [
  'the decorations',
  'the music playlist',
  'the seating arrangement',
  'the party favors',
  'the menu selection',
  'the activities planned',
  'the special surprises'
]
const memories = [
  'everyone ended up dancing in the rain',
  'the youngest ones stole the show',
  'we laughed until sunrise',
  'we created a new family tradition',
  'we broke the record for longest conga line'
]
const gifts = ['handmade quilt', 'restored family photo album', 'custom recipe book', 'memory box', 'family tree artwork']
const recipients = ['grandma', 'grandpa', 'mom', 'dad', 'aunt', 'uncle']
const inspirations = [
  'an old family story',
  'a shared childhood memory',
  'a forgotten family tradition',
  'a discovered family heirloom',
  'a meaningful conversation'
]
const preparations = [
  'collecting old photos and memories',
  'learning a new craft',
  'interviewing family members',
  'researching family history',
  'practicing the perfect technique'
]

export const useStoryTemplates = defineStore('storyTemplates', {
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
    /**
     * Get a random item from an array
     * @param {Array} array - The array to select from
     * @returns {*} A random item from the array
     */
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)]
    },

    /**
     * Generate a story based on a character name
     * @param {string} name - The name to use in the story
     * @returns {{title: string, content: string}} The generated story with title and content
     */
    generateStory(name) {
      const template = this.getRandomItem(this.templates)
      
      let content = template.content
        .replace(/\{name\}/g, name)
        .replace(/\{timeOfDay\}/g, this.getRandomItem(this.timeOfDay))
        .replace(/\{weather\}/g, this.getRandomItem(this.weather))
        .replace(/\{activity\}/g, this.getRandomItem(this.activities))
        .replace(/\{secondActivity\}/g, this.getRandomItem(this.secondActivities))
        .replace(/\{dish\}/g, this.getRandomItem(this.dishes))
        .replace(/\{scent\}/g, this.getRandomItem(this.scents))
        .replace(/\{reaction\}/g, this.getRandomItem(this.reactions))
        .replace(/\{routine\}/g, this.getRandomItem(this.routines))
        .replace(/\{incident\}/g, this.getRandomItem(this.incidents))
        .replace(/\{solution\}/g, this.getRandomItem(this.solutions))
        .replace(/\{lesson\}/g, this.getRandomItem(this.lessons))
        .replace(/\{occasion\}/g, this.getRandomItem(this.occasions))
        .replace(/\{activity\}/g, this.getRandomItem(this.traditions))
        .replace(/\{reason\}/g, this.getRandomItem(this.reasons))
        .replace(/\{detail1\}/g, this.getRandomItem(this.details))
        .replace(/\{detail2\}/g, this.getRandomItem(this.details))
        .replace(/\{memory\}/g, this.getRandomItem(this.memories))
        .replace(/\{gift\}/g, this.getRandomItem(this.gifts))
        .replace(/\{recipient\}/g, this.getRandomItem(this.recipients))
        .replace(/\{inspiration\}/g, this.getRandomItem(this.inspirations))
        .replace(/\{preparation\}/g, this.getRandomItem(this.preparations))

      return {
        title: template.title,
        content
      }
    }
  }
}) 