import clsx from 'clsx'
import styles from './Vacancies.module.scss'
import { VacanciesList } from '../../../../features/VacanciesList/VacanciesList'
import { useState } from 'react'

export const Vacancies = () => {
  const [showedMore, setShowedMore] = useState<boolean>(false)

  return (
    <section
      data-grid="false"
      className={clsx('section', styles.vacancies)}
      id="open-vacancies"
    >
      <div className="container">
        <div className={clsx(styles.wrapper, showedMore && styles.collapsed)}>
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
