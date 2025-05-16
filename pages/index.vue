<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
const toast = useToast();

function handleLogout() {
  clear();
  toast.add({
    title: "Logged out",
    description: "You have been successfully logged out",
    icon: "i-heroicons-check-circle",
    color: "success",
    timeout: 3000,
  });
}
</script>

<template>
  <UContainer class="py-16">
    <UCard class="max-w-md mx-auto" :ui="{ body: 'p-6' }">
      <template #header>
        <div class="flex flex-col items-center pb-4">
          <UAvatar
            v-if="loggedIn"
            :alt="user.login"
            :src="user.picture || ''"
            :text="user.login?.charAt(0).toUpperCase()"
            size="xl"
            class="mb-4"
          />
          <UIcon
            v-else
            name="i-heroicons-user-circle"
            class="text-6xl text-primary mb-2"
          />
          <UBadge v-if="loggedIn" color="success" variant="subtle" class="mt-2">
            Active Session
          </UBadge>
        </div>
        <USeparator />
      </template>

      <div class="text-center py-4">
        <div v-if="loggedIn">
          <h1 class="text-2xl font-semibold mb-2">Welcome {{ user.login }}!</h1>
          <p class="text-gray-500 mb-6">
            Logged in <NuxtTime :datetime="session.loggedInAt" relative />
          </p>

          <UButtonGroup class="mt-6" block>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-user"
              to="/profile"
              class="flex-1"
            >
              Profile
            </UButton>
            <UButton
              color="red"
              variant="soft"
              icon="i-heroicons-arrow-right-on-rectangle"
              @click="handleLogout"
              class="flex-1"
            >
              Logout
            </UButton>
          </UButtonGroup>
        </div>

        <div v-else>
          <h1 class="text-2xl font-semibold mb-2">Welcome</h1>
          <p class="text-gray-500 mb-6">
            Please sign in to access your account
          </p>

          <UCard color="gray" class="mb-6">
            <UAlert
              icon="i-heroicons-information-circle"
              color="info"
              variant="subtle"
              title="Secure Authentication"
              description="We use Auth0 for safe and reliable sign-in"
              class="mb-4"
            />
          </UCard>

          <UButton
            color="primary"
            variant="solid"
            block
            size="lg"
            icon="i-heroicons-lock-closed"
            to="/auth/auth0"
            external
            :ui="{
              rounded: 'rounded-lg',
              padding: 'py-3',
            }"
          >
            Login with Auth0
          </UButton>

          <UCollapsible class="mt-8">
            <template #button>
              <UButton
                variant="link"
                color="gray"
                label="Need help signing in?"
                trailing-icon="i-heroicons-chevron-down"
                :ui="{
                  trailingIcon:
                    'group-data-[state=open]:rotate-180 transition-transform duration-200',
                }"
                class="group"
              />
            </template>

            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
              <p class="text-sm text-gray-500">
                Contact support at support@example.com or check our
                <a href="#" class="text-primary hover:underline">help center</a
                >.
              </p>
            </div>
          </UCollapsible>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
