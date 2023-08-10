import { useContext, useState } from 'react'
import styles from './Preloader.module.scss'
import { MainContext } from '../../app/providers/MainContext'

export const Preloader = () => {
  const { pageLoaded, setPageLoaded } = useContext(MainContext)

  const [loading, setLoading] = useState<number>(0)
  const [closing, setClosing] = useState<boolean>(false)

  return <div>Preloader</div>
}
