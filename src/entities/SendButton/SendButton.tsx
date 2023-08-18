import { FC } from 'react'
import { Button } from '../../shared/Button/Button'

interface IProps {
  withAnim?: boolean
}

export const SendButton: FC<IProps> = ({ withAnim = true }) => {
  return <Button withAnim={withAnim}>Send your demos</Button>
}
