<script lang="typescript">
  import LazyImage from './LazyImage.svelte'
  interface Image {
    download_url: string
    author: string
  }
  let fetchData: () => Promise<Image[]> = async () => {
    let res = await fetch('https://picsum.photos/v2/list')
    let data = await res.json()
    return data
  }

  let result = fetchData()
</script>

<style>
</style>

{#await result}
  <div>Loading...</div>
{:then images}
  {#each images as image}
     <LazyImage
      imgSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
      dataSrc={image.download_url}
      imgAlt={image.author}/>
  {/each}
{/await}