import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

interface IProps extends ButtonHTMLAttributes<string> {
  withArrow?: boolean
}

export const Button: FC<IProps> = ({ children, withArrow = true }) => {
  return (
    <button className={styles.button}>
      <div className={clsx(styles.text, 'reveal')}>
        {children}
        {withArrow && (
          <div className={styles.arrow}>
            <img src="/images/icons/arrow-right.svg" alt="btn-arrow" />
            <img src="/images/icons/arrow-right.svg" alt="btn-arrow" />
          </div>
        )}
      </div>
      <div className={clsx(styles.underline, 'reveal reveal-width')}></div>
    </button>
  )
}
