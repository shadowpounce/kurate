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
          document.querySelector<HTMLDataElement>('#contact')

        if (contactSection) {
          window.fullpage_api.moveTo(Number(contactSection.dataset.screen) + 1)
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
