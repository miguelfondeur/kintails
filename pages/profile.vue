<template>
  <div class="flex-grow py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Profile</h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Customize your profile and manage your account settings
        </p>
      </div>
      
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>
      
      <div v-else class="space-y-6">
        <!-- Avatar Section -->
        <div class="bg-white rounded-lg shadow-xl overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 class="text-lg font-medium text-gray-900">Profile Avatar</h2>
          </div>
          
          <div class="p-6">
            <div class="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div class="relative w-32 h-32">
                <img 
                  :src="avatarUrl" 
                  alt="Your Avatar"
                  class="w-32 h-32 rounded-full border-4 border-white shadow-lg animate-float"
                />
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <button 
                  @click="openAvatarEditor"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <Pencil class="h-4 w-4 mr-2" />
                  Customize
                </button>
              </div>
            </div>
            
            <!-- Avatar Customization Modal -->
            <AvatarCustomizationModal
              :is-open="isAvatarEditorOpen"
              :options="avatarOptions"
              :seed="avatarSeed"
              @close="closeAvatarEditor"
              @update:options="updateAvatarOptions"
              @save="saveAvatarChanges"
            />
          </div>
        </div>
        
        <!-- Account Information Section -->
        <div class="bg-white rounded-lg shadow-xl overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 class="text-lg font-medium text-gray-900">Account Information</h2>
          </div>
          
          <form @submit.prevent="saveProfile" class="p-6 space-y-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input 
                id="username" 
                v-model="username" 
                type="text" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Username"
              />
              <p class="mt-1 text-sm text-gray-500">This will be displayed on your stories and profile.</p>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <div class="flex justify-between">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <button 
                  type="button" 
                  @click="showPasswordFields = !showPasswordFields"
                  class="text-sm text-sky-600 hover:text-sky-500"
                >
                  {{ showPasswordFields ? 'Cancel' : 'Change password' }}
                </button>
              </div>
              
              <div v-if="showPasswordFields" class="space-y-4 mt-3">
                <div>
                  <label for="current_password" class="block text-sm font-medium text-gray-700">Current Password</label>
                  <input 
                    id="current_password" 
                    v-model="currentPassword" 
                    type="password" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label for="new_password" class="block text-sm font-medium text-gray-700">New Password</label>
                  <input 
                    id="new_password" 
                    v-model="newPassword" 
                    type="password" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input 
                    id="confirm_password" 
                    v-model="confirmPassword" 
                    type="password" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button 
                type="submit"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                :disabled="isSaving"
              >
                <Loader2 v-if="isSaving" class="h-4 w-4 mr-2 animate-spin" />
                <Save v-else class="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
        
        <!-- Danger Zone Section -->
        <div class="bg-white rounded-lg shadow-xl overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-200 bg-red-50">
            <h2 class="text-lg font-medium text-red-800">Danger Zone</h2>
          </div>
          
          <div class="p-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <AlertTriangle class="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">Delete Account</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Once you delete your account, all of your stories and data will be permanently removed. This action cannot be undone.
                </p>
                <div class="mt-4">
                  <button 
                    @click="confirmDeleteAccount"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 class="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Delete Account Confirmation Dialog -->
        <div v-if="showDeleteConfirmation" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-10">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle class="h-6 w-6 text-red-600" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Account</h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to delete your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                      <div class="mt-4">
                        <label for="delete_confirm" class="block text-sm font-medium text-gray-700">Please type "delete my account" to confirm:</label>
                        <input 
                          id="delete_confirm" 
                          v-model="deleteConfirmText" 
                          type="text" 
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="delete my account"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  @click="deleteAccount"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  :disabled="deleteConfirmText !== 'delete my account' || isDeleting"
                >
                  <Loader2 v-if="isDeleting" class="h-4 w-4 mr-2 animate-spin" />
                  Delete Account
                </button>
                <button 
                  @click="showDeleteConfirmation = false"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Success Notification -->
        <div v-if="showSuccessMessage" class="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircle class="h-5 w-5 text-green-500" />
            </div>
            <div class="ml-3">
              <p class="text-sm">{{ successMessage }}</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button @click="showSuccessMessage = false" class="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-200 focus:outline-none">
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Error Notification -->
        <div v-if="showErrorMessage" class="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircle class="h-5 w-5 text-red-500" />
            </div>
            <div class="ml-3">
              <p class="text-sm">{{ errorMessage }}</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button @click="showErrorMessage = false" class="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-200 focus:outline-none">
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  Pencil, 
  Save, 
  X, 
  AlertTriangle, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Loader2
} from 'lucide-vue-next';
import AvatarEditor from '~/components/AvatarEditor.vue';
import AvatarCustomizationModal from '~/components/AvatarCustomizationModal.vue';

// Get user from Supabase
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

// Loading and saving states
const isLoading = ref(true);
const isSaving = ref(false);
const isDeleting = ref(false);

// Form data
const username = ref('');
const email = ref('');
const showPasswordFields = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// Avatar data
const avatarSeed = ref('');
const isAvatarEditorOpen = ref(false);
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

// Notification states
const showSuccessMessage = ref(false);
const successMessage = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');

// Delete confirmation
const showDeleteConfirmation = ref(false);
const deleteConfirmText = ref('');

// Avatar URL
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

// Initialize profile data
onMounted(async () => {
  if (!user.value) {
    router.push('/login');
    return;
  }
  
  try {
    // Get user profile from database
    const { data: profile, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single();
    
    if (error) throw error;
    
    if (profile) {
      username.value = profile.username || user.value.email.split('@')[0];
      email.value = user.value.email;
      
      if (profile.avatar_options) {
        avatarOptions.value = JSON.parse(profile.avatar_options);
      }
      
      if (profile.avatar_seed) {
        avatarSeed.value = profile.avatar_seed;
      } else {
        // Generate a seed based on email
        avatarSeed.value = user.value.email.split('@')[0];
      }
    } else {
      // New user, set defaults
      username.value = user.value.email.split('@')[0];
      email.value = user.value.email;
      avatarSeed.value = user.value.email.split('@')[0];
    }
  } catch (error) {
    showError('Failed to load profile data');
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

// Update avatar options
const updateAvatarOptions = (newOptions) => {
  avatarOptions.value = { ...newOptions };
};

// Save avatar changes
const saveAvatarChanges = async () => {
  isAvatarEditorOpen.value = false;
  
  try {
    isSaving.value = true;
    await saveProfile();
    showSuccess('Avatar updated successfully');
  } catch (error) {
    showError('Failed to update avatar');
  } finally {
    isSaving.value = false;
  }
};

// Save profile changes
const saveProfile = async () => {
  if (!user.value) return;
  
  try {
    isSaving.value = true;
    
    // Check if passwords match if changing password
    if (showPasswordFields.value && newPassword.value) {
      if (newPassword.value !== confirmPassword.value) {
        throw new Error('Passwords do not match');
      }
      
      // Update password with Supabase Auth
      const { error: passwordError } = await client.auth.updateUser({
        password: newPassword.value
      });
      
      if (passwordError) throw passwordError;
    }
    
    // Update email if it changed
    if (email.value !== user.value.email) {
      const { error: emailError } = await client.auth.updateUser({
        email: email.value
      });
      
      if (emailError) throw emailError;
    }
    
    // Save profile data to database
    const { error: profileError } = await client
      .from('profiles')
      .upsert({
        id: user.value.id,
        username: username.value,
        avatar_seed: avatarSeed.value,
        avatar_options: JSON.stringify(avatarOptions.value),
        updated_at: new Date()
      });
    
    if (profileError) throw profileError;
    
    showSuccess('Profile updated successfully');
    
    // Reset password fields
    if (showPasswordFields.value) {
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
      showPasswordFields.value = false;
    }
  } catch (error) {
    showError(error.message || 'Failed to update profile');
    console.error(error);
  } finally {
    isSaving.value = false;
  }
};

// Show delete account confirmation dialog
const confirmDeleteAccount = () => {
  showDeleteConfirmation.value = true;
  deleteConfirmText.value = '';
};

// Delete account
const deleteAccount = async () => {
  if (deleteConfirmText.value !== 'delete my account') return;
  
  try {
    isDeleting.value = true;
    
    // Delete user's stories
    const { error: storiesError } = await client
      .from('stories')
      .delete()
      .eq('user_id', user.value.id);
    
    if (storiesError) throw storiesError;
    
    // Delete user's profile
    const { error: profileError } = await client
      .from('profiles')
      .delete()
      .eq('id', user.value.id);
    
    if (profileError) throw profileError;
    
    // Delete user account
    const { error: authError } = await client.auth.admin.deleteUser(
      user.value.id
    );
    
    if (authError) throw authError;
    
    // Sign out and redirect to home
    await client.auth.signOut();
    router.push('/');
  } catch (error) {
    showError(error.message || 'Failed to delete account');
    console.error(error);
    showDeleteConfirmation.value = false;
  } finally {
    isDeleting.value = false;
  }
};

// Show success message
const showSuccess = (message) => {
  successMessage.value = message;
  showSuccessMessage.value = true;
  
  // Hide after 5 seconds
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 5000);
};

// Show error message
const showError = (message) => {
  errorMessage.value = message;
  showErrorMessage.value = true;
  
  // Hide after 5 seconds
  setTimeout(() => {
    showErrorMessage.value = false;
  }, 5000);
};

// Open avatar editor
const openAvatarEditor = () => {
  isAvatarEditorOpen.value = true;
};

// Close avatar editor
const closeAvatarEditor = () => {
  isAvatarEditorOpen.value = false;
};
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style> 