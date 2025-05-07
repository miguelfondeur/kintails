import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export interface Story {
  id?: number
  user_id: string
  family_member: string
  author: string
  title: string
  content: string
  avatar_url: string
  background_color: string
  created_at?: string
}

export const useStoriesStore = defineStore('stories', {
  state: () => ({
    stories: [] as Story[],
    isLoading: true
  }),

  actions: {
    async loadStories() {
      const client = useSupabaseClient()
      const user = useSupabaseUser()

      this.isLoading = true
      try {
        if (!user.value?.id) {
          console.warn('Cannot load stories: User not authenticated')
          this.stories = []
          return
        }
        
        const { data, error } = await client
          .from('stories')
          .select('*')
          .eq('user_id', user.value.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching stories:', error)
          throw error
        }
        
        this.stories = data || []
      } catch (error) {
        console.error('Error loading stories:', error)
        this.stories = []
      } finally {
        this.isLoading = false
      }
    },

    async addStory(story: Omit<Story, 'id' | 'user_id' | 'created_at'>) {
      const client = useSupabaseClient()
      const user = useSupabaseUser()

      if (!user.value?.id) {
        console.error('Error adding story: User not authenticated')
        throw new Error('User not authenticated')
      }

      try {
        const { data, error } = await client
          .from('stories')
          .insert([{
            user_id: user.value.id,
            family_member: story.family_member,
            author: story.author,
            title: story.title,
            content: story.content,
            avatar_url: story.avatar_url,
            background_color: story.background_color
          }])
          .select()
          .single()

        if (error) {
          console.error('Supabase error details:', error)
          throw error
        }

        this.stories.unshift(data)
        return data
      } catch (error) {
        console.error('Error adding story:', error)
        throw error
      }
    },

    async deleteStory(id: number) {
      const client = useSupabaseClient()

      try {
        const { error } = await client
          .from('stories')
          .delete()
          .eq('id', id)

        if (error) throw error

        this.stories = this.stories.filter(story => story.id !== id)
      } catch (error) {
        console.error('Error deleting story:', error)
        throw error
      }
    }
  }
})