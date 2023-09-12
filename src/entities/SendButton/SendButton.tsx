import { FC, useContext } from 'react'
import { Button } from '../../shared/Button/Button'
import { MainContext } from '../../app/providers/MainContext'

interface IProps {
  withAnim?: boolean
}

export const SendButton: FC<IProps> = ({ withAnim = true }) => {
  return (
    <Button
      handleClick={() => {
        const contactSection =
          document.querySelector<HTMLDivElement>('#contact')

        if (contactSection) {
          window.scrollTo({
            left: 0,
            top: contactSection.offsetTop,
            behavior: 'smooth',
          })
        } else {
          location.href = '/#contact'
        }
      }}
      withAnim={withAnim}
    >
      Send your demos
    </Button>
  )
}
