import { cubicOut } from "svelte/easing"

export default function slide(
  node: HTMLElement,
  { delay = 0, duration = 400, easing = cubicOut, vertical = false }
) {
  const style = getComputedStyle(node)
  const transform = style.transform === "none" ? "" : style.transform
  return {
    delay,
    duration,
    easing,
    css: (t: number, u: number) => {
      if (vertical) {
        return `transform: ${transform} translate3d(0, ${-u * 100}%, 0)`
      } else {
        return `transform: ${transform} translate3d(${-u * 100}%, 0, 0)`
      }
    },
  }
}