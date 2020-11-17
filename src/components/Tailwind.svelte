<style global lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";

  @layer components {
    .page-title {
      @apply mt-2 max-w-3xl text-2xl font-semibold text-gray-900;
    }

    .btn {
      @apply font-bold py-2 px-4 rounded;
    }

    .btn-blue {
      @apply bg-blue-500 text-white;
    }
    .btn-blue:hover {
      @apply bg-blue-700;
    }

    .btn-gray {
      @apply bg-gray-400 text-gray-800;
    }
    .btn-gray:hover {
      @apply bg-gray-500;
    }
  }
</style>