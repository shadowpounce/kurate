import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

interface IProps extends ButtonHTMLAttributes<string> {
  withArrow?: boolean
  buttonType?: string
  handleClick?: () => void
  withAnim?: boolean
  withUnderline?: boolean
}

export const Button: FC<IProps> = ({
  children,
  withArrow = true,
  buttonType = 'primary',
  disabled = false,
  handleClick,
  withAnim = true,
  withUnderline = true,
  className,
}) => {
  return (
    <button
      onClick={() => {
        handleClick && handleClick()
      }}
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[buttonType],
        withAnim && styles.withAnim,
        className && className
      )}
    >
      <div className={clsx(styles.text, 'reveal')}>
        <p>{children}</p>
        {withArrow && (
          <div className={styles.arrow}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9346 5.24365L15.4871 9.79615L10.9346 14.3487"
                stroke="#FAFAFA"
                strokeWidth="1.125"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.7373 9.79614H15.3598"
                stroke="#FAFAFA"
                strokeWidth="1.125"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9346 5.24365L15.4871 9.79615L10.9346 14.3487"
                stroke="#FAFAFA"
                strokeWidth="1.125"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.7373 9.79614H15.3598"
                stroke="#FAFAFA"
                strokeWidth="1.125"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      {withUnderline && (
        <div className={clsx(styles.underline, 'reveal reveal-width')}></div>
      )}
    </button>
  )
}
