import { d as defineStore, s as storeToRefs, u as useSupabaseUser } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-BMmqXcE2.mjs';

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
        const { data, error } = await client.from("stories").select("*").eq("user_id", (_a = user.value) == null ? void 0 : _a.id).order("created_at", { ascending: false });
        if (error) throw error;
        this.stories = data || [];
      } catch (error) {
        console.error("Error loading stories:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async addStory(story) {
      var _a;
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      try {
        const { data, error } = await client.from("stories").insert([{
          user_id: (_a = user.value) == null ? void 0 : _a.id,
          family_member: story.family_member,
          author: story.author,
          title: story.title,
          content: story.content,
          avatar_url: story.avatar_url,
          background_color: story.background_color
        }]).select().single();
        if (error) throw error;
        this.stories.unshift(data);
        return data;
      } catch (error) {
        console.error("Error adding story:", error);
        throw error;
      }
    },
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
//# sourceMappingURL=useStories-BWLmmMzV.mjs.map
