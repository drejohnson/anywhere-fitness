export default function lazyload(node: HTMLElement) {
  let onIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement
        lazyImage.src = lazyImage.dataset.src as string
        lazyImage.classList.remove("lazy");
      }
    })
  }
  let observer = new IntersectionObserver(onIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  })
  observer.observe(node)

  return {
    destroy() {
      observer.unobserve(node)
    },
  }
}