import React, {
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './Input.module.scss'
import useSplit from '../../hooks/useSplit'
import clsx from 'clsx'

interface IProps extends InputHTMLAttributes<string> {
  setValue: { setStateAction: Dispatch<SetStateAction<string>> }
  //   activeValue: {
  //     value: string
  //   }
  currentStep?: string
}

export const Input: FC<IProps> = ({
  placeholder,
  //   activeValue,
  value,
  setValue,
  currentStep,
}) => {
  const placeholderRef = useRef<HTMLDivElement>(null)

  const [inputLabel, setInputLabel] = useState<string | undefined>(placeholder)

  useEffect(() => {
    setTimeout(() => setInputLabel(placeholder), 1000)
  }, [placeholder])

  const { setStateAction } = setValue
  //   const { value } = activeValue

  useEffect(() => {
    if (placeholderRef.current) {
      const letters = Array.from(
        placeholderRef.current.querySelectorAll<HTMLSpanElement>('span')
      )

      letters.forEach((letter) => {
        letter.classList.remove('animated')
        letter.classList.add(`${styles.toDown}`)

        setTimeout(() => {
          letter.classList.remove(`${styles.toDown}`)
          letter.classList.add('animated')
        }, 1000)
      })
    }
  }, [currentStep])

  return (
    <div className={styles.input}>
      <div className={styles.content}>
        <div ref={placeholderRef} className={styles.placeholder}>
          <div className={value !== '' ? styles.hidden : ''}>
            {useSplit(
              `${inputLabel}`,
              {
                duration: 0.75,
                delay: 0.075,
                startDelay: 0,
                ease: 'ease',
              },
              true
            )}
          </div>
        </div>
        <div className={styles.topLabel}>
          {value !== '' && (
            <>
              {useSplit(
                `${inputLabel}`,
                {
                  duration: 0.5,
                  delay: 0.075,
                  startDelay: 0,
                  ease: 'ease',
                },
                true
              )}
            </>
          )}
        </div>
        <input
          onChange={(ev) => {
            setValue && setStateAction(ev.target.value)
          }}
          value={value}
          type="text"
        />
      </div>
    </div>
  )
}
