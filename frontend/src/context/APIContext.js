import React from 'react'
import { APIClient } from '../apiClient'

export const APIContext = React.createContext(new APIClient())