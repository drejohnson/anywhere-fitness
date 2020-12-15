export default function fadeScale(
  node: HTMLElement,
  {
    delay = 0,
    duration = 200,
    easing = (x: number) => x,
    baseScale = 0,
    transformOrigin = "top",
  }
) {
  const opacity = +getComputedStyle(node).opacity
  const initialScaleMatch = getComputedStyle(node).transform.match(
    /scale\(([0-9.]+)\)/
  )
  const initialScale = initialScaleMatch ? Number(initialScaleMatch[1]) : 1
  const invertedScale = 1 - baseScale

  return {
    delay,
    duration,
    css: (t: number) => {
      const eased = easing(t)
      return `opacity: ${eased * opacity}; transform: scale(${
        eased * initialScale * invertedScale + baseScale
      }); transform-origin: ${transformOrigin}`
    },
  }
}