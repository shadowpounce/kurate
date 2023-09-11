import { useContext, useState } from 'react'

import useSplit from '../../hooks/useSplit'
import { DrawableLine } from '../../shared/DrawableLine/DrawableLine'
import styles from './RecordsList.module.scss'
import { MainContext } from '../../app/providers/MainContext'
import clsx from 'clsx'
import { genres, recordsData } from '../../data'
import { Record } from '../../entities/Record/Record'
import { Button } from '../../shared/Button/Button'
import { IRecord } from '../../interfaces/IRecord.interface'

export const RecordsList = () => {
  const [filterActive, setFilterActive] = useState<boolean>(false)
  const [activeGenre, setActiveGenre] = useState<string | undefined>('')

  const [filterString, setFilterString] = useState<string>('')

  const [showedMore, setShowedMore] = useState<boolean>(false)

  const { activeScreen } = useContext(MainContext)

  const toggleFilter = () => {
    filterActive ? setFilterActive(false) : setFilterActive(true)
  }

  const selectGenre = (genre: string) => {
    toggleFilter()
    setActiveGenre(genre)
  }

  const showMore = () => {
    setShowedMore(true)
  }

  return (
    <div className={styles.recordsList}>
      {!showedMore && (
        <div onClick={() => showMore()} className={styles.showMore}>
          <Button withArrow={false}>Show more</Button>
        </div>
      )}
      <div className={styles.top}>
        <div>
          <h2>{useSplit('Our')}</h2>
          <h2>
            {useSplit('Records', {
              duration: 1,
              delay: 0.075,
              startDelay: 0.25,
              ease: 'ease',
            })}
          </h2>
        </div>
        <div className={styles.arrow}>
          <div className={styles.line}>
            <DrawableLine anim={activeScreen === 4 && true}>
              <svg
                width="119"
                height="119"
                viewBox="0 0 119 119"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3,59.5a56.5,56.5 0 1,0 113,0a56.5,56.5 0 1,0 -113,0"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </DrawableLine>
          </div>
          <svg
            className={clsx(styles.icon, 'reveal')}
            width="43"
            height="42"
            viewBox="0 0 43 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 3L3 39M3 39V10M3 39H33.5"
              stroke="white"
              strokeWidth="6"
            />
          </svg>
        </div>
      </div>
      <div className={styles.records}>
        <div className={styles.recordsTop}>
          {window.innerWidth > 768 && (
            <>
              <div className="reveal opacity-0 translate-y-full"></div>
              <div className="reveal opacity-0 translate-y-full">
                <span>
                  <span>Track</span>
                </span>
              </div>
              <div className="reveal opacity-0 translate-y-full">
                <span>
                  <span>Artist(s)</span>
                </span>
              </div>
            </>
          )}
          <div
            className={clsx(
              styles.dropdown,
              filterActive && styles.active,
              'reveal opacity-0 translate-y-full'
            )}
          >
            <div onClick={() => toggleFilter()} className={styles.head}>
              <span>
                <span
                  style={
                    window.innerWidth <= 768
                      ? {
                          opacity: activeGenre ? `0.4` : `1`,
                        }
                      : {
                          opacity: `0.4`,
                        }
                  }
                >
                  Genre:
                </span>{' '}
                <div className={clsx(styles.genre, 'reveal-anim animated')}>
                  {activeGenre && useSplit(activeGenre)}
                </div>{' '}
              </span>
              <div className={styles.filterIcon}>
                {window.innerWidth > 768 ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.833 3.79199H9.33301"
                      stroke="#6E6F6F"
                      strokeWidth="0.875"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.50033 3.79199H1.16699"
                      stroke="#6E6F6F"
                      strokeWidth="0.875"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83366 5.83333C6.96124 5.83333 7.87533 4.91925 7.87533 3.79167C7.87533 2.66409 6.96124 1.75 5.83366 1.75C4.70608 1.75 3.79199 2.66409 3.79199 3.79167C3.79199 4.91925 4.70608 5.83333 5.83366 5.83333Z"
                      stroke="#6E6F6F"
                      strokeWidth="0.875"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.8333 10.2083H10.5"
                      stroke="#6E6F6F"
                      strokeWidth="0.875"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.66699 10.208H1.16699"
                      stroke="#6E6F6F"
                      strokeWidth="0.875"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.16667 12.2501C9.29425 12.2501 10.2083 11.336 10.2083 10.2084C10.2083 9.08083 9.29425 8.16675 8.16667 8.16675C7.03909 8.16675 6.125 9.08083 6.125 10.2084C6.125 11.336 7.03909 12.2501 8.16667 12.2501Z"
                      stroke="#6E6F6F"
                      strokeWidth="0.875"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6004 7.74634L11.1671 13.1797C10.5254 13.8213 9.47539 13.8213 8.83372 13.1797L3.40039 7.74634"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.search}>
                <input
                  value={filterString}
                  onChange={(ev) =>
                    setFilterString(ev.target.value.toLowerCase())
                  }
                  placeholder="Search"
                  type="text"
                />
              </div>
              <div className={styles.bodyList}>
                <ul data-scrollable="true">
                  <li onClick={() => selectGenre('')}>All genres</li>
                  {filterString
                    ? genres
                        .filter((item) =>
                          item.toLowerCase().includes(filterString)
                        )
                        .map((genre) => (
                          <li onClick={() => selectGenre(genre)}>{genre}</li>
                        ))
                    : genres.map((genre) => (
                        <li onClick={() => selectGenre(genre)}>{genre}</li>
                      ))}
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          data-scrollable="true"
          className={clsx(styles.list, showedMore && styles.active)}
        >
          {activeGenre === ''
            ? recordsData.map((record: IRecord) => (
                <Record
                  audio={record.audio}
                  id={record.id}
                  title={record.title}
                  cover={record.cover}
                  artists={record.artists}
                  genre={record.genre}
                />
              ))
            : recordsData
                .filter((record) => {
                  if (Array.isArray(record.genre)) {
                    return record.genre.find(
                      (item) =>
                        item.toLowerCase() === activeGenre?.toLowerCase()
                    )
                  }
                })
                .map((record) => (
                  <Record
                    audio={record.audio}
                    id={record.id}
                    title={record.title}
                    cover={record.cover}
                    artists={record.artists}
                    genre={record.genre}
                  />
                ))}
        </div>

        {!showedMore && (
          <div
            className={clsx(
              styles.shadow,
              'reveal opacity-0 duration-1000 delay-[1000ms]'
            )}
          ></div>
        )}
      </div>
    </div>
  )
}
