import clsx from 'clsx'

interface IOptions {
  duration: number
  delay: number
  startDelay: number
  ease: string
}

const useSplit = (
  string: string,
  options: IOptions = {
    duration: 1,
    delay: 0.075,
    startDelay: 0,
    ease: 'ease',
  },
  anim: boolean = false
) => {
  return string.split('').map((char, idx) => (
    <span
      style={
        anim
          ? {
              animationTimingFunction: options.ease,
              animationDuration: `${options.duration}s`,
              animationDelay: `${options.startDelay + idx * options.delay}s`,
            }
          : {
              transitionTimingFunction: options.ease,
              transitionDuration: `${options.duration}s`,
              transitionDelay: `${options.startDelay + idx * options.delay}s`,
            }
      }
      className={clsx(anim ? 'reveal-anim animated' : 'reveal')}
      key={idx}
    >
      {char === ' ' ? <div className="hidden-letter">.</div> : char}
    </span>
  ))
}
export default useSplit
