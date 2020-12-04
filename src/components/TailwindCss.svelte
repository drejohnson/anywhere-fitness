<style global lang="postcss">
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";

  @layer components {
    .image {
      @apply w-full h-full object-cover object-center;
    }
    .page-title {
      @apply mt-2 max-w-3xl text-2xl font-semibold text-gray-900;
    }
    .input {
      @apply w-full text-white text-lg bg-transparent py-2 border-b border-white;
    }
    .input-label {
      @apply text-sm font-bold text-white tracking-wide;
    }
    .btn {
      @apply flex flex-col justify-start items-center text-sm uppercase leading-none tracking-wide whitespace-normal py-3 px-8 mb-4 transition duration-300;
    }
    .btn:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    .btn-white-outline {
      @apply text-white border-2 border-solid border-white;
    }
    .btn-white-outline:hover {
      @apply text-black bg-white;
    }
    .btn-black-outline {
      @apply text-black border-2 border-solid border-black;
    }
    .btn-white-outline:hover {
      @apply text-white bg-black;
    }
    .btn-rounded-full {
      @apply rounded-full;
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
    .btn--social {
      @apply shadow-sm;
    }
  }
</style>
