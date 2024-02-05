import { instanceCreate } from '../../utils/instance'

export const vacancyService = () => {
  return {
    async getAll() {
      const { data } = await instanceCreate().get('/vacancies')

      return data
    },
  }
}
