import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

/**
 * @typedef {Object} Story
 * @property {number} [id]
 * @property {string} user_id
 * @property {string} family_member
 * @property {string} author
 * @property {string} title
 * @property {string} content
 * @property {string} avatar_url
 * @property {string} background_color
 * @property {string} [created_at]
 */

export const useStoriesStore = defineStore('stories', {
  state: () => ({
    stories: [],
    isLoading: true,
    exploreStories: [],
    isExploreLoading: true,
    userStories: [],
    isUserStoriesLoading: true
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

    /**
     * @param {number} id - The ID of the story to delete
     */
    async deleteStory(id) {
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
    },

    /**
     * @param {number} id - The ID of the story to update
     * @param {Object} storyData - The updated story data
     */
    async updateStory(id, storyData) {
      const client = useSupabaseClient()

      try {
        const { data, error } = await client
          .from('stories')
          .update({
            family_member: storyData.family_member,
            author: storyData.author,
            title: storyData.title,
            content: storyData.content,
            avatar_url: storyData.avatar_url,
            background_color: storyData.background_color
          })
          .eq('id', id)
          .select()
          .single()

        if (error) throw error

        // Update the story in the local state
        const index = this.stories.findIndex(story => story.id === id)
        if (index !== -1) {
          this.stories[index] = data
        }
        
        return data
      } catch (error) {
        console.error('Error updating story:', error)
        throw error
      }
    },

    /**
     * Load stories from all users for the explore page
     */
    async loadExploreStories() {
      const client = useSupabaseClient()
      
      this.isExploreLoading = true
      try {
        console.log('Fetching explore stories...')
        // Get all stories with join to profiles to get the real user info
        const { data, error } = await client
          .from('stories')
          .select(`
            *,
            profiles:profiles(
              username,
              avatar_seed,
              avatar_options
            )
          `)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching explore stories:', error)
          throw error
        }
        
        console.log(`Loaded ${data?.length || 0} explore stories`)
        this.exploreStories = data || []
      } catch (error) {
        console.error('Error loading explore stories:', error)
        this.exploreStories = []
      } finally {
        this.isExploreLoading = false
      }
    },

    /**
     * Load stories from a specific user
     * @param {string} userId - The ID of the user whose stories to load
     */
    async loadUserStories(userId) {
      const client = useSupabaseClient()
      
      this.isUserStoriesLoading = true
      try {
        console.log(`Fetching stories for user: ${userId}`)
        // Get stories from specific user with profile info
        const { data, error } = await client
          .from('stories')
          .select(`
            *,
            profiles:profiles(
              username,
              avatar_seed,
              avatar_options
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching user stories:', error)
          throw error
        }
        
        console.log(`Loaded ${data?.length || 0} stories for user ${userId}`)
        this.userStories = data || []
      } catch (error) {
        console.error('Error loading user stories:', error)
        this.userStories = []
      } finally {
        this.isUserStoriesLoading = false
      }
    }
  }
}) 