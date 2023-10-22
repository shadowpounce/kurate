import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import { vacanciesData } from '../../data'
import { VacancyDropdown } from '../../entities/VacancyDropdown/VacancyDropdown'
import { Button } from '../../shared/Button/Button'
import styles from './VacanciesList.module.scss'
import clsx from 'clsx'
import useSplit from '../../hooks/useSplit'
import { MainContext } from '../../app/providers/MainContext'

const types = ['remote', 'hybrid', 'full-time']
const locations = ['london', 'sheffield']

interface IProps {
  showedMore: boolean
  setShowedMore: Dispatch<SetStateAction<boolean>>
}

export const VacanciesList: FC<IProps> = ({ showedMore, setShowedMore }) => {
  const [canScroll, setCanScroll] = useState<boolean>(false)

  const [filterActive, setFilterActive] = useState<boolean>(false)
  const [filterTwoActive, setFilterTwoActive] = useState<boolean>(false)

  const [activeLocation, setActiveLocation] = useState<string | undefined>('')
  const [activeType, setActiveType] = useState<string | undefined>('')

  const [filterString, setFilterString] = useState<string>('')
  const [filterTwoString, setFilterTwoString] = useState<string>('')

  const toggleFilter = (filter: string) => {
    if (filter === 'location') {
      filterActive ? setFilterActive(false) : setFilterActive(true)
    }

    if (filter === 'type') {
      filterTwoActive ? setFilterTwoActive(false) : setFilterTwoActive(true)
    }
  }

  const selectLocation = (genre: string) => {
    toggleFilter('location')

    setActiveLocation(genre)
  }

  const selectType = (genre: string) => {
    toggleFilter('type')

    setActiveType(genre)
  }

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
            <div
              className={clsx(
                styles.dropdown,
                filterActive && styles.active,
                'reveal opacity-0 translate-y-full'
              )}
            >
              <div className={styles.head}>
                <span>
                  <span
                    style={
                      window.innerWidth <= 768
                        ? {
                            opacity: activeLocation ? `0.4` : `1`,
                          }
                        : {
                            opacity: `0.4`,
                          }
                    }
                  >
                    LOCATION:
                  </span>{' '}
                  <div className={clsx(styles.genre, 'reveal-anim animated')}>
                    {activeLocation && activeLocation}
                  </div>{' '}
                </span>
                <div
                  onClick={() => toggleFilter('location')}
                  className={styles.filterIcon}
                >
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
                {activeLocation && (
                  <div
                    onClick={() => {
                      setActiveLocation('')
                      setFilterActive(false)
                    }}
                    className={styles.resetFilterIcon}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.51465 9.38086L9.99993 0.895577"
                        stroke="#6E6F6F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.99993 9.38079L1.51465 0.895508"
                        stroke="#6E6F6F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                )}
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
                    {filterString
                      ? locations
                          .filter((item) =>
                            item.toLowerCase().includes(filterString)
                          )
                          .map((location) => (
                            <li onClick={() => selectLocation(location)}>
                              {location}
                            </li>
                          ))
                      : locations.map((location) => (
                          <li onClick={() => selectLocation(location)}>
                            {location}
                          </li>
                        ))}
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles.dropdown,
                filterTwoActive && styles.active,
                'reveal opacity-0 translate-y-full'
              )}
            >
              <div className={styles.head}>
                <span>
                  <span
                    style={
                      window.innerWidth <= 768
                        ? {
                            opacity: activeType ? `0.4` : `1`,
                          }
                        : {
                            opacity: `0.4`,
                          }
                    }
                  >
                    TYPE:
                  </span>{' '}
                  <div className={clsx(styles.genre, 'reveal-anim animated')}>
                    {activeType && activeType}
                  </div>{' '}
                </span>
                <div
                  onClick={() => toggleFilter('type')}
                  className={styles.filterIcon}
                >
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
                {activeType && (
                  <div
                    onClick={() => {
                      setActiveType('')
                      setFilterActive(false)
                    }}
                    className={styles.resetFilterIcon}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.51465 9.38086L9.99993 0.895577"
                        stroke="#6E6F6F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.99993 9.38079L1.51465 0.895508"
                        stroke="#6E6F6F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.body}>
                <div className={styles.search}>
                  <input
                    value={filterTwoString}
                    onChange={(ev) =>
                      setFilterTwoString(ev.target.value.toLowerCase())
                    }
                    placeholder="Search"
                    type="text"
                  />
                </div>
                <div className={styles.bodyList}>
                  <ul data-scrollable="true">
                    {filterTwoString
                      ? types
                          .filter((item) =>
                            item.toLowerCase().includes(filterTwoString)
                          )
                          .map((type) => (
                            <li onClick={() => selectType(type)}>{type}</li>
                          ))
                      : types.map((type) => (
                          <li onClick={() => selectType(type)}>{type}</li>
                        ))}
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ul className={styles.vacanciesList}>
        {activeLocation && activeType
          ? vacanciesData
              .filter(
                (vacancy) =>
                  vacancy.location.toLowerCase() === activeLocation &&
                  vacancy.type.toLowerCase() === activeType
              )
              .map((vacancy, idx) => (
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
              ))
          : vacanciesData.map((vacancy, idx) => (
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
