import { Dispatch, FC, SetStateAction, useState } from 'react'
import { vacanciesData } from '../../data'
import { VacancyDropdown } from '../../entities/VacancyDropdown/VacancyDropdown'
import { Button } from '../../shared/Button/Button'
import styles from './VacanciesList.module.scss'
import clsx from 'clsx'

interface IProps {
  showedMore: boolean
  setShowedMore: Dispatch<SetStateAction<boolean>>
}

export const VacanciesList: FC<IProps> = ({ showedMore, setShowedMore }) => {
  const [canScroll, setCanScroll] = useState<boolean>(false)

  return (
    <>
      <div className={clsx(styles.top, 'reveal')}>
        <div className={styles.group}>
          <span className={styles.vacancyInfoLabel}>
            {window.innerWidth > 768 ? 'Position' : 'Open vacancies'}
          </span>
        </div>
        {window.innerWidth > 768 && (
          <div className={styles.group}>
            <span className={styles.vacancyInfoLabel}>Location</span>
            <span className={styles.vacancyInfoLabel}>Type</span>
            <span className={styles.vacancyInfoLabel}></span>
          </div>
        )}
      </div>
      <ul className={styles.vacanciesList}>
        {vacanciesData.map((vacancy, idx) => (
          <VacancyDropdown
            showedMore={showedMore}
            setShowedMore={setShowedMore}
            idx={idx}
            handleClick={() => {
              if (!showedMore) {
                canScroll ? setCanScroll(false) : setCanScroll(true)
              }
            }}
            position={vacancy.position}
            location={vacancy.location}
            text={vacancy.text}
            requirments={vacancy.requirments}
            type={vacancy.type}
          />
        ))}
      </ul>
      {!showedMore && (
        <Button
          handleClick={() => {
            setShowedMore(true)
            setCanScroll(true)
          }}
          className={clsx(styles.showMore, 'reveal')}
          withArrow={false}
        >
          Show more
        </Button>
      )}
    </>
  )
}
