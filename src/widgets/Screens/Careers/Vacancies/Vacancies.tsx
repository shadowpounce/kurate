import clsx from 'clsx'
import styles from './Vacancies.module.scss'
import { VacanciesList } from '../../../../features/VacanciesList/VacanciesList'

export const Vacancies = () => {
  return (
    <section
      data-grid="false"
      className={clsx('section', styles.vacancies)}
      id="open-vacancies"
    >
      <div className="container">
        <div className={styles.wrapper}>
          <VacanciesList />
        </div>
      </div>
    </section>
  )
}
