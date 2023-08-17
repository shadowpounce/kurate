import React, { useRef, useEffect } from 'react'

import styles from './Waves.module.scss'

export const Waves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      let ctx = canvasRef.current.getContext('2d')

      if (ctx) {
        let w = ctx.canvas.width
        let h = ctx.canvas.height

        let colors = ['#ffffff', '#ffffff99', '#ffffff66']

        let MAX_LINES = 4
        let amplitude = 105
        let freq = 0.01
        let rate = 0

        let ctr = 0

        function draw() {
          if (ctx) {
            w = ctx.canvas.width = window.innerWidth
            h = ctx.canvas.height = 1000
            ctx.moveTo(0, h / 2)
            ctr++
            for (let i = 1; i < MAX_LINES; i++) {
              ctr++
              rate = ctr / 1800
              ctx.beginPath()
              for (let x = 0; x < w; x++) {
                let y = (Math.sin(x * freq * (i / 3) + rate) * amplitude) / i
                ctx.lineTo(x, y + h / 2.5)
              }
              ctx.strokeStyle = colors[i]
              ctx.lineWidth = 2
              ctx.stroke()
            }
          }
        }

        const interval = setInterval(draw, 1)

        return () => clearInterval(interval)
      }
    }
  }, [])

  return <canvas className={styles.waves} ref={canvasRef}></canvas>
}
