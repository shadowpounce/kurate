import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../app/providers/HomeContext'
import { HomeScreens } from '../../widgets/Screens/Home'
import { WithFullpage } from '../../app/providers/WithFullpage'
import { MainContext } from '../../app/providers/MainContext'
import { ThreeDCards } from '../../features/ThreeDCards/ThreeDCards'
import { ArtistsContext } from '../../app/providers/ArtistsContext'
import { CareersScreens } from '../../widgets/Screens/Careers'
import { useLocation, useNavigate } from 'react-router-dom'
import { CareersContext } from '../../app/providers/CareersContext'
import { WithScrollSmoother } from '../../app/providers/WithScrollSmoother'
import { useQuery } from '@tanstack/react-query'
import { vacancyService } from '../../services/Vacancy/Vacancy.service'
import {
  IVacancy,
  IVacancyResponse,
} from '../../interfaces/Components/Vacancy/IVacancy.interface'

export const Careers = () => {
  const {
    setActiveScreen,
    setDirection,
    activeScreen,
    setPlayerActive,
    playerActive,
    setCurrentPage,
  } = useContext(MainContext)

  const [vacancies, setVacancies] = useState<IVacancy[]>()

  useEffect(() => {
    setCurrentPage('careers')
  }, [])

  const { data: vacanciesData } = useQuery<IVacancyResponse>({
    queryKey: ['vacancies'],
    queryFn: () => vacancyService().getAll(),
  })

  useEffect(() => {
    if (vacanciesData) {
      setVacancies(vacanciesData.data)
    }
  }, [vacanciesData])

  return (
    <CareersContext.Provider
      value={{
        vacancies,
      }}
    >
      <WithScrollSmoother>
        {CareersScreens.map((screen) => screen)}
      </WithScrollSmoother>
    </CareersContext.Provider>
  )
}
