<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import { authStore, initAuth } from '../stores/firebase-auth'
  import Hero from '../components/Hero.svelte'
  import HeroInfo from '../components/HeroInfo.svelte'
  import Button from '../components/Button.svelte'
  import LandingContent from '../components/LandingContent.svelte';

  const { tokenResult } = initAuth()
  console.log($authStore)
  console.log($tokenResult)
</script>

<style lang="postcss">
</style>

<Hero image={"https://res.cloudinary.com/phreshr-media/image/upload/c_scale,q_80,w_2560/v1605975721/anywhere-fitness/splash-hero.webp"}>
  <div class="row-span-2 md:col-span-2">
    <HeroInfo 
      heading={"Welcome, The world is your gym."}
      subHeading={"Find Fitness Classes Anywhere In The World"}>
      <Button
        on:click={() => navigate('browse')} 
        text={"Browse Classes"} />
    </HeroInfo>
  </div>
</Hero>

<LandingContent>
  <h2 slot="heading" class="font-display text-4xl">
    No gym? No problem!
  </h2>
  <p slot="text" class="mb-6">
    Anywhere Fitness makes it easy for Trainers and Clients to hold and attend Fitness classes anywhere in the world. If you're a Trainer, our app allows you to take attendance and process payments with ease. As a Client, you can easily find the classes and locations that interest you.
  </p>
  <div slot="cta">
    <Button 
      textColor="text-black"
      textHover="text-white"
      borderColor="border-black"
      bgHover="bg-black"
      text={"Learn More"}
      on:click={() => navigate('about')}/>
  </div>
</LandingContent>

<LandingContent>
  <img
    slot="image"
    src="https://res.cloudinary.com/phreshr-media/image/upload/c_scale,q_80,w_2560/v1606054232/anywhere-fitness/outdoor-med-ball.webp"
    alt="Man exercising with med ball"
    class="w-full h-full md:h-400px object-cover object-center" />
  <h2 slot="heading" class="font-display text-4xl">
    Choose Your Own Adventure
  </h2>
  <p slot="text" class="mb-6">
    Yoga in a forest? Calisthenics on the beach? With Anywhere Fitness,
    the posibilities are endless. Use our app to easily find and sign up
    for the fitness classes you're interested in anywhere in the world.
  </p>
  <div slot="cta">
    <Button 
      textColor="text-black"
      textHover="text-white"
      borderColor="border-black"
      bgHover="bg-black"
      text={"Get Started"}
      on:click={() => navigate('/auth/client/login')}/>
  </div>
</LandingContent>
