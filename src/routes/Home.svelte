<script lang="typescript">
  import { navigate } from "svelte-navigator";
  import { auth, Status } from "../stores/auth";
  import Profile from "../components/Profile.svelte";
  import Logout from "../components/Logout.svelte";
</script>

<style lang="postcss">
  .hero-bg {
    background-image: url("https://res.cloudinary.com/phreshr-media/image/upload/c_scale,q_80,w_2560/v1605975721/anywhere-fitness/splash-hero.webp");
    @apply flex flex-col justify-center items-center h-screen bg-cover bg-center;
  }
  span:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    content: "";
    opacity: 0.7;
    height: 100vh;
    z-index: 1;
  }
  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: brightness(50%);
  }

  .landing-content {
    max-height: 550px;
  }
</style>

<div class="lg:flex">
  <div class="w-full">
    <section class="hero-bg">
      <span />
      <div class="flex flex-col items-center z-10">
        <h1 class="text-uppercase text-4xl md:text-6xl font-display text-white">
          Welcome, The world is your gym.
        </h1>
        <h3 class="text-2xl text-white mb-6">
          Find Fitness Classes Anywhere In The World
        </h3>
        <button
          class="text-2xl text-white hover:text-black font-display border-2 border-solid border-white py-2 px-16 focus:outline-none hover:bg-white rounded-full"
          on:click={() => navigate('browse')}>Browse Classes</button>
      </div>
    </section>
    <section class="w-full">
      <div class="flex flex-col justify-center items-center my-10 mx-24">
        <h2 class="font-display text-4xl">No gym? No problem!</h2>
        <p class="mb-6">
          Anywhere Fitness makes it easy for Trainers and Clients to hold and
          attend Fitness classes anywhere in the world. If you're a Trainer, our
          app allows you to take attendance and process payments with ease. As a
          Client, you can easily find the classes and locations that interest
          you.
        </p>
        <button
          class="text-2xl text-black hover:text-white font-display border-4 border-solid border-black py-2 px-16 focus:outline-none hover:bg-black rounded-full"
          on:click={() => navigate('about')}>Learn More</button>
      </div>
    </section>
    <section
      class="landing-content grid grid-rows-3-2 md:grid-cols-3-2 md:grid-rows-1">
      <div class="image">
        <img
          src="https://res.cloudinary.com/phreshr-media/image/upload/c_scale,q_80,w_2560/v1606054232/anywhere-fitness/outdoor-med-ball.webp"
          alt="Two people exercising near beach" />
      </div>
      <div class="info bg-gray-200 flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center my-10 mx-24">
          <h2 class="font-display text-4xl">Choose Your Own Adventure</h2>
          <p class="mb-6">
            Yoga in a forest? Calisthenics on the beach? With Anywhere Fitness,
            the posibilities are endless. Use our app to easily find and sign up
            for the fitness classes you're interested in anywhere in the world.
          </p>
          <button
            class="text-2xl text-black hover:text-white font-display border-4 border-solid border-black py-2 px-16 focus:outline-none hover:bg-black rounded-full"
            on:click={() => navigate('/auth/client/login')}>Get Started</button>
        </div>
      </div>
    </section>
  </div>
</div>
