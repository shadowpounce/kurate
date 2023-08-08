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
  }
) => {
  return string.split('').map((char, idx) => (
    <span
      style={{
        transitionTimingFunction: options.ease,
        transitionDuration: `${options.duration}s`,
        transitionDelay: `${options.startDelay + idx * options.delay}s`,
      }}
      className="reveal"
      key={idx}
    >
      {char === ' ' ? <div className="hidden-letter">f</div> : char}
    </span>
  ))
}
export default useSplit
