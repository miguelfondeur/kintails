import { defineStore, storeToRefs } from 'pinia';
import { u as useSupabaseClient } from './useSupabaseClient-CKQ8h17k.mjs';
import { u as useSupabaseUser } from './server.mjs';

const useStoriesStore = defineStore("stories", {
  state: () => ({
    stories: [],
    isLoading: true
  }),
  actions: {
    async loadStories() {
      var _a;
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      this.isLoading = true;
      try {
        if (!((_a = user.value) == null ? void 0 : _a.id)) {
          console.warn("Cannot load stories: User not authenticated");
          this.stories = [];
          return;
        }
        const { data, error } = await client.from("stories").select("*").eq("user_id", user.value.id).order("created_at", { ascending: false });
        if (error) {
          console.error("Error fetching stories:", error);
          throw error;
        }
        this.stories = data || [];
      } catch (error) {
        console.error("Error loading stories:", error);
        this.stories = [];
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * @param {Object} story - The story to add
     * @param {string} story.family_member
     * @param {string} story.author
     * @param {string} story.title
     * @param {string} story.content
     * @param {string} story.avatar_url
     * @param {string} story.background_color
     */
    async addStory(story) {
      var _a;
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      if (!((_a = user.value) == null ? void 0 : _a.id)) {
        console.error("Error adding story: User not authenticated");
        throw new Error("User not authenticated");
      }
      try {
        const { data, error } = await client.from("stories").insert([{
          user_id: user.value.id,
          family_member: story.family_member,
          author: story.author,
          title: story.title,
          content: story.content,
          avatar_url: story.avatar_url,
          background_color: story.background_color
        }]).select().single();
        if (error) {
          console.error("Supabase error details:", error);
          throw error;
        }
        this.stories.unshift(data);
        return data;
      } catch (error) {
        console.error("Error adding story:", error);
        throw error;
      }
    },
    /**
     * @param {number} id - The ID of the story to delete
     */
    async deleteStory(id) {
      const client = useSupabaseClient();
      try {
        const { error } = await client.from("stories").delete().eq("id", id);
        if (error) throw error;
        this.stories = this.stories.filter((story) => story.id !== id);
      } catch (error) {
        console.error("Error deleting story:", error);
        throw error;
      }
    }
  }
});
const useStories = () => {
  const store = useStoriesStore();
  const { stories, isLoading } = storeToRefs(store);
  return {
    stories,
    isLoading,
    addStory: store.addStory,
    deleteStory: store.deleteStory
  };
};

export { useStories as u };
//# sourceMappingURL=useStories-DtJIu33C.mjs.map
