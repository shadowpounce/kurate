import { instanceCreate } from '../../utils/instance'

export const trackService = () => {
  return {
    async getAll() {
      const { data } = await instanceCreate().get('/tracks')

      return data
    },
  }
}
