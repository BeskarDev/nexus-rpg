import { useDispatch } from 'react-redux'
import { AppStore } from '../store'

export const useAppDispatch: () => AppStore['dispatch'] = useDispatch
