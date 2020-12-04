export default function lazyload(node: HTMLElement) {
  let onIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement
        const lazyBackgroundImage = entry.target as HTMLElement
        if (lazyImage.dataset.src) {
          lazyImage.src = lazyImage.dataset.src as string
          lazyImage.classList.remove("lazy");
        } else {
          lazyBackgroundImage.classList.add("visible");
        }
      }
    })
  }
  let observer = new IntersectionObserver(onIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  })
  observer.observe(node)

  return {
    destroy() {
      observer.unobserve(node)
    },
  }
}