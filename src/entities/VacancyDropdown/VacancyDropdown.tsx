import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './VacancyDropdown.module.scss'
import { Button } from '../../shared/Button/Button'
import clsx from 'clsx'

interface IProps {
  position: string
  location: string
  type: string
  text: string
  requirments: string[]
  handleClick?: () => void
}

export const VacancyDropdown: FC<IProps> = ({
  position,
  location,
  type,
  text,
  requirments,
  handleClick,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState<boolean>(false)
  const [bodyHeight, setBodyHeight] = useState<number>(0)

  useEffect(() => {
    const body = bodyRef.current

    if (body) {
      setBodyHeight(body.offsetHeight)
    }
  }, [bodyRef])

  const toggleDropdown = () => {
    active ? setActive(false) : setActive(true)
  }

  return (
    <div
      data-height={bodyHeight}
      style={
        active
          ? {
              height: `${bodyHeight + 170}px`,
            }
          : {
              cursor: 'default',
            }
      }
      className={clsx(styles.vacancyDropdown, active && styles.active)}
    >
      <div className={styles.head}>
        <div className={styles.position}>
          <h6>{position}</h6>
        </div>
        <div className={styles.addInfo}>
          <span className={styles.position}>{position}</span>
          <div className={styles.group}>
            <span className={styles.type}>{type}</span>
            <Button
              className={styles.more}
              handleClick={() => {
                toggleDropdown()
                handleClick && handleClick()
              }}
              withUnderline={false}
            >
              More
            </Button>
          </div>
        </div>

        <div ref={bodyRef} className={styles.body}>
          <div className={styles.wrapper}>
            <div className={styles.squares}>
              <div className={styles.arnament}>
                <svg
                  width="149"
                  height="153"
                  viewBox="0 0 149 153"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="79.0969"
                    width="36.0494"
                    height="36.0494"
                    fill="white"
                  />
                  <rect
                    opacity="0.3"
                    x="63.329"
                    y="1.83437"
                    width="52.385"
                    height="52.385"
                    stroke="white"
                    stroke-width="1.68901"
                  />
                  <path
                    d="M119.858 101.416L119.261 100.819L118.664 101.416L97.4212 122.659L96.8241 123.256L97.4212 123.853L118.664 145.095L119.261 145.692L119.858 145.095L141.1 123.853L141.697 123.256L141.1 122.659L119.858 101.416ZM102.611 123.256L119.261 106.607L135.91 123.256L119.261 139.905L102.611 123.256ZM119.261 94.7109L147.806 123.256L119.261 151.801L90.7158 123.256L119.261 94.7109Z"
                    fill="white"
                    stroke="white"
                    stroke-width="1.68901"
                  />
                </svg>
              </div>
            </div>
            <div className={styles.content}>
              <p className={styles.text}>{text}</p>
              <ul>
                {requirments.map((requirment) => (
                  <li>{requirment}</li>
                ))}
              </ul>
              <Button>Apply now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
