import { FRONT_URL } from '@/utils/secrets'

const socketConfig = {
  cors: {
    origin: FRONT_URL,
  },
}

export default socketConfig
