import { useState } from 'react'
import { vacanciesData } from '../../data'
import { VacancyDropdown } from '../../entities/VacancyDropdown/VacancyDropdown'
import { Button } from '../../shared/Button/Button'
import styles from './VacanciesList.module.scss'
import clsx from 'clsx'

export const VacanciesList = () => {
  const [showedMore, setShowedMore] = useState<boolean>(false)
  const [canScroll, setCanScroll] = useState<boolean>(false)

  return (
    <div className={styles.vacanciesList}>
      <div className={clsx(styles.top, 'reveal')}>
        <div className={styles.group}>
          <span>Position</span>
        </div>
        <div className={styles.group}>
          <span>Location</span>
          <span>Type</span>
          <span></span>
        </div>
      </div>
      <div className={clsx(styles.listWrapper)}>
        <ul
          data-scrollable="true"
          className={clsx(styles.list, canScroll && styles.collapsed, 'reveal')}
        >
          {vacanciesData
            .slice(0, showedMore ? vacanciesData.length - 1 : 4)
            .map((vacancy) => (
              <VacancyDropdown
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
      </div>
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
    </div>
  )
}
