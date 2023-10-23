import clsx from 'clsx'
import styles from './Vacancies.module.scss'
import { VacanciesList } from '../../../../features/VacanciesList/VacanciesList'
import { useEffect, useRef, useState } from 'react'

export const Vacancies = () => {
  const [showedMore, setShowedMore] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showedMore && ref.current) {
      ref.current.classList.add(`${styles.collapsed}`)
    }
  }, [showedMore])

  return (
    <section
      ref={ref}
      data-once="true"
      data-grid="false"
      className={clsx('section', styles.vacancies)}
      id="open-vacancies"
    >
      <div className="container">
        <div className={clsx(styles.wrapper)}>
          <div className={styles.wrap}>
            <VacanciesList
              showedMore={showedMore}
              setShowedMore={setShowedMore}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
