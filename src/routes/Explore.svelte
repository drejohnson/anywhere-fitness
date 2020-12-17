<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import Hero from '@components/Hero.svelte';
  import HeroInfo from '@components/HeroInfo.svelte';
  import Search from '@components/Search.svelte';
  import LandingContent from '@components/LandingContent.svelte';
  import Button from '@components/Button.svelte';
  import type { SubmitEvent } from '../types';
  import { currentLocation, placeResult } from '@app/stores/location';

  const customEncodeURI = (str: string) =>
    encodeURI(str.replace(/\s+/g, '+')).replace(/,/g, '%2C');

  $: searchQuery = $placeResult?.formatted_address!;
  $: autoCompleteQuery = $currentLocation;

  $: locationQuery = `?location=${customEncodeURI(
    $placeResult ? searchQuery! : autoCompleteQuery
  )}`;

  $: onSubmit = async (event: SubmitEvent) => {
    try {
      const { store } = event.detail;

      console.log('event detail', event.detail);
      store.subscribe(({ search }) => {
        // console.log('search', search);
        navigate(
          `/explore/search${locationQuery}&q=${encodeURIComponent(
            search.replace(' ', '+')
          )}`
        );
      });
    } catch (err) {
      console.log(err);
      // error = err;
    }
  };
</script>

<style>
</style>

<Hero
  height="h-screen-90"
  image_placeholder="{import.meta.env.SNOWPACK_PUBLIC_CLOUDINARY_PLACEHOLDER_URL}/v1607839759/anywhere-fitness/forest-stretching-optimized.webp"
  image="{import.meta.env.SNOWPACK_PUBLIC_CLOUDINARY_URL}/v1607839759/anywhere-fitness/forest-stretching-optimized.webp">
  <HeroInfo
    heading={'Welcome, The world is your gym.'}
    subHeading={'Find Fitness Classes Anywhere In The World'}>
    <Search {onSubmit} />
  </HeroInfo>
</Hero>

<LandingContent styleClasses="bg-black text-left">
  <h2 slot="heading" class="font-display text-2xl text-white">
    We can't focus on health & wellness without fighting for Black lives.
  </h2>
  <p slot="text" class="text-white">
    We are committed to building an inclusive and anti-racist community. Here’s
    what we’re doing to stand with #BlackLivesMatter
  </p>
  <div slot="cta" class="mt-6">
    <Button text="We support the Black Lives Matter Movement" />
  </div>
</LandingContent>
