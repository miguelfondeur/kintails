<template>
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <img 
              src="https://api.dicebear.com/7.x/personas/svg?skinColor=d78774&hair=balding&body=checkered&nose=wrinkles&eyes=glasses&mouth=bigSmile&facialHair=walrus&hairColor=dee1f5&clothingColor=f3b63a&backgroundColor=bde4a7&facialHairProbability=100&radius=50" 
              alt="Kintales" 
              class="w-10 h-10 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300" 
            />
            <span class="text-2xl font-bold text-gray-900">Kintales</span>
          </NuxtLink>
  
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="/"
              class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              :class="{ 'text-sky-600': route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/stories/all"
              class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              :class="{ 'text-sky-600': route.path.startsWith('/stories') }"
            >
              Stories
            </NuxtLink>
  
            <!-- Auth Buttons -->
            <template v-if="user">
              <div class="relative" ref="dropdownRef">
                <button
                  @click="toggleDropdown"
                  class="flex items-center gap-2 focus:outline-none"
                >
                  <img 
                    :src="userAvatarUrl"
                    alt="User avatar" 
                    class="w-8 h-8 rounded-full border border-gray-500"
                  />
                  <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'transform rotate-180': isDropdownOpen }" />
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-show="isDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                  <NuxtLink 
                    to="/stories/collections" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="closeDropdown"
                  >
                    <div class="flex items-center">
                      <BookOpen class="w-4 h-4 mr-2" />
                      My Stories
                    </div>
                  </NuxtLink>
                  <NuxtLink 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="closeDropdown"
                  >
                    <div class="flex items-center">
                      <User class="w-4 h-4 mr-2" />
                      Profile
                    </div>
                  </NuxtLink>
                  <div class="border-t border-gray-100 my-1"></div>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div class="flex items-center">
                      <LogOut class="w-4 h-4 mr-2" />
                      Sign Out
                    </div>
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors"
              >
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { LogOut, ChevronDown, User, BookOpen } from 'lucide-vue-next';
  
  //Instantiate Supabase and Router
  const route = useRoute()
  const router = useRouter()
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  
  // Dropdown state
  const isDropdownOpen = ref(false)
  const dropdownRef = ref(null)
  
  // Toggle dropdown function
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }
  
  // Close dropdown function
  const closeDropdown = () => {
    isDropdownOpen.value = false
  }
  
  // Handle clicks outside dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownOpen.value = false
    }
  }
  
  // User avatar URL
  const userAvatarUrl = computed(() => {
    if (!user.value) return '';
    return avatarUrl.value;
  });
  
  // User avatar data
  const avatarSeed = ref('');
  const avatarOptions = ref({
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
  });
  
  // Computed avatar URL based on the options
  const avatarUrl = computed(() => {
    // Use a default seed if none is provided
    const seed = avatarSeed.value || (user.value ? user.value.email.split('@')[0] : 'default');
    
    // Create a clean object with only the properties DiceBear expects
    const diceBearParams = {
      seed,
      skinColor: avatarOptions.value.skinColor,
      hair: avatarOptions.value.hair,
      hairColor: avatarOptions.value.hairColor,
      eyes: avatarOptions.value.eyes,
      mouth: avatarOptions.value.mouth,
      body: avatarOptions.value.body,
      facialHair: avatarOptions.value.facialHair,
      clothingColor: avatarOptions.value.clothingColor,
      backgroundColor: avatarOptions.value.backgroundColor,
      radius: '50'
    };
    
    // Filter out any undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(diceBearParams).filter(([_, value]) => value !== undefined && value !== '')
    );
    
    const params = new URLSearchParams(filteredParams);
    return `https://api.dicebear.com/7.x/personas/svg?${params.toString()}`;
  });
  
  // Load the user's avatar settings from the profiles table
  const loadUserAvatar = async () => {
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
          avatarOptions.value = JSON.parse(profile.avatar_options);
        }
        
        if (profile.avatar_seed) {
          avatarSeed.value = profile.avatar_seed;
        } else {
          // Generate a seed based on email
          avatarSeed.value = user.value.email.split('@')[0];
        }
      }
    } catch (error) {
      console.error('Failed to load avatar:', error);
    }
  };
  
  // Setup and cleanup click event listeners
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    loadUserAvatar();
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  
  const handleLogout = async () => {
    closeDropdown();
    await client.auth.signOut();
    router.push('/');
  }
  </script>