<template>
  <div class="bg-sky-100 min-h-screen">
    <!-- Header Section -->
    <section class="relative py-12 px-4 overflow-hidden">
      <!-- Animated background patterns -->
      <div class="absolute inset-0 -z-10 pattern-background opacity-30"></div>

      <div class="max-w-4xl mx-auto text-center">
        <!-- Dicebear Image -->
        <div class="relative mb-8 inline-block">
          <div class="absolute top-0 left-0 right-0 bottom-0 w-28 h-28 mx-auto rounded-full shadow-2xl filter blur-md bg-sky-300 opacity-40 animate-float-shadow -z-10"></div>
          <img 
            src="https://api.dicebear.com/7.x/personas/svg?skinColor=e5a07e&hair=bald&body=rounded&nose=smallRound&eyes=happy&mouth=bigSmile&facialHair=shadow&hairColor=362c47&clothingColor=456dff&backgroundColor=ffdfbf&facialHairProbability=100&radius=50"
            alt="Feedback Character" 
            class="w-28 h-28 mx-auto rounded-full shadow-xl animate-float relative z-10" 
          />
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Give Us Your Feedback!
        </h1>
        
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          We'd love to hear your thoughts, suggestions, or stories about KinTales!
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div class="p-8">
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              @submit.prevent="handleSubmit"
              class="space-y-6"
            >
              <!-- Hidden input for Netlify Forms -->
              <input type="hidden" name="form-name" value="contact" />
              
              <!-- Name Field -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="Your name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>
              
              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="your.email@example.com"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>
              
              <!-- Feedback Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
                  Feedback Type
                </label>
                <select 
                  v-model="formData.type"
                  name="type" 
                  id="type" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                >
                  <option value="suggestion">Suggestion</option>
                  <option value="bug">Bug Report</option>
                  <option value="story">Story Idea</option>
                  <option value="praise">Praise</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <!-- Message Field -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea 
                  v-model="formData.message"
                  name="message" 
                  id="message" 
                  rows="6" 
                  placeholder="Tell us what you think..."
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                ></textarea>
              </div>
              
              <!-- Form Status Messages -->
              <div v-if="formStatus" :class="[
                'p-4 rounded-lg', 
                formStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                <p>{{ formMessage }}</p>
              </div>
              
              <!-- Submit Button -->
              <div>
                <button 
                  type="submit"
                  :disabled="submitting"
                  class="w-full inline-flex justify-center items-center px-6 py-3 text-lg font-medium text-white bg-sky-500 rounded-lg shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors disabled:opacity-50"
                >
                  <span v-if="submitting">Sending...</span>
                  <span v-else>Send Feedback</span>
                  <SendIcon v-if="!submitting" class="ml-2 h-5 w-5" />
                  <LoaderIcon v-else class="ml-2 h-5 w-5 animate-spin" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SendIcon, LoaderIcon } from 'lucide-vue-next';

const formData = ref({
  name: '',
  email: '',
  type: 'suggestion',
  message: ''
});

const submitting = ref(false);
const formStatus = ref('');
const formMessage = ref('');

const handleSubmit = async () => {
  submitting.value = true;
  formStatus.value = '';
  
  try {
    // Encode form data for Netlify
    const bodyFormData = new FormData();
    
    // Add form-name field which is required for Netlify forms
    bodyFormData.append('form-name', 'contact');
    
    // Add all form fields
    Object.keys(formData.value).forEach(key => {
      bodyFormData.append(key, formData.value[key]);
    });
    
    // Submit to Netlify
    const response = await fetch('/', {
      method: 'POST',
      body: bodyFormData
    });
    
    if (response.ok) {
      // Success
      formStatus.value = 'success';
      formMessage.value = 'Thank you for your feedback! We\'ll get back to you soon.';
      
      // Reset form
      formData.value = {
        name: '',
        email: '',
        type: 'suggestion',
        message: ''
      };
    } else {
      // Error
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formStatus.value = 'error';
    formMessage.value = 'Oops! Something went wrong. Please try again or email us directly.';
    console.error('Form submission error:', error);
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

.animate-float-shadow {
  animation: floatShadow 6s ease-in-out infinite;
}

@keyframes floatShadow {
  0% { transform: scale(1) translateY(0px); opacity: 0.5; }
  50% { transform: scale(1.05) translateY(-12px); opacity: 0.4; }
  100% { transform: scale(1) translateY(0px); opacity: 0.5; }
}
</style> 