import { storeToRefs } from 'pinia'
import { useStoriesStore } from '~/stores/stories'

export const useStories = () => {
  const store = useStoriesStore()
  const { stories, isLoading } = storeToRefs(store)
  
  // Load stories when the composable is first used
  if (process.client) {
    store.loadStories()
  }

  return {
    stories,
    isLoading,
    addStory: store.addStory,
    deleteStory: store.deleteStory
  }
} 