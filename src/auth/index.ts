import { useMachine } from './useMachine';
import { authMachine } from './authMachine';

const { state, send } = useMachine(authMachine)

export { state, send }