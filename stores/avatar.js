import { defineStore } from 'pinia';

export const useAvatarStore = defineStore('avatar', {
  state: () => ({
    seed: '',
    options: {
      skinColor: 'd78774',
      hair: 'bald',
      body: 'squared',
      nose: 'mediumRound',
      eyes: 'open',
      mouth: 'smirk',
      facialHair: '',
      hairColor: '362c47',
      clothingColor: '456dff',
      backgroundColor: 'bde4a7',
      facialHairProbability: 0
    },
    isLoaded: false
  }),
  
  getters: {
    avatarUrl: (state) => {
      if (!state.seed) return '';
      
      // Create a clean object with only the properties DiceBear expects
      const diceBearParams = {
        seed: state.seed,
        skinColor: state.options.skinColor,
        hair: state.options.hair,
        hairColor: state.options.hairColor,
        eyes: state.options.eyes,
        mouth: state.options.mouth,
        body: state.options.body,
        facialHair: state.options.facialHair,
        clothingColor: state.options.clothingColor,
        backgroundColor: state.options.backgroundColor,
        radius: '50'
      };
      
      // Filter out any undefined parameters
      const filteredParams = Object.fromEntries(
        Object.entries(diceBearParams).filter(([_, value]) => value !== undefined && value !== '')
      );
      
      const params = new URLSearchParams(filteredParams);
      return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`;
    }
  },
  
  actions: {
    async loadFromDatabase() {
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      
      if (!user.value) return;
      
      try {
        const { data: profile, error } = await client
          .from('profiles')
          .select('avatar_seed, avatar_options')
          .eq('id', user.value.id)
          .single();
        
        if (error) throw error;
        
        if (profile) {
          if (profile.avatar_options) {
            this.options = JSON.parse(profile.avatar_options);
          }
          
          if (profile.avatar_seed) {
            this.seed = profile.avatar_seed;
          } else {
            // Generate a seed based on email
            this.seed = user.value.email.split('@')[0];
          }
          
          this.isLoaded = true;
        }
      } catch (error) {
        console.error('Failed to load avatar from database:', error);
      }
    },
    
    async saveToDatabase() {
      const client = useSupabaseClient();
      const user = useSupabaseUser();
      
      if (!user.value) return;
      
      try {
        const { error } = await client
          .from('profiles')
          .upsert({
            id: user.value.id,
            avatar_seed: this.seed,
            avatar_options: JSON.stringify(this.options),
            updated_at: new Date()
          });
        
        if (error) throw error;
      } catch (error) {
        console.error('Failed to save avatar to database:', error);
        throw error;
      }
    },
    
    updateOptions(newOptions) {
      this.options = { ...newOptions };
    },
    
    updateSeed(newSeed) {
      this.seed = newSeed;
    },
    
    generateRandomSeed() {
      this.seed = Math.random().toString(36).substring(7);
    }
  }
}); 