import { EventObject, interpret, Interpreter, InterpreterOptions, MachineOptions, State, StateConfig, StateMachine, Typestate } from "xstate"
import { Readable, readable } from "svelte/store"

interface UseMachineOptions<TContext, TEvent extends EventObject> {
  context?: Partial<TContext>;
  state?: StateConfig<TContext, TEvent>;
  }

type TTMachineOptions<
TContext,
TEvent extends EventObject
> = Partial<InterpreterOptions> &
Partial<UseMachineOptions<TContext, TEvent>> &
Partial<MachineOptions<TContext, TEvent>>

type UseMachineResponse<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = { value: any; context: TContext }
> = {
  state: Readable<State<TContext, TEvent, any, TTypestate>>;
  send: Interpreter<TContext, any, TEvent, TTypestate>['send'];
}

export function useMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = { 
    value: any; 
    context: TContext 
  }>(
    machine: StateMachine<TContext, 
    any, 
    TEvent, 
    TTypestate>, 
    options: TTMachineOptions<TContext, TEvent> = {}): UseMachineResponse<TContext, TEvent, TTypestate> {
  const service = interpret(machine, options)

  const state = readable(service.initialState, setState => {
    service.onTransition(currentState => {
      if (currentState.changed) {
        setState(currentState)
      }
    }).start()

    return (): void => {
      service.stop()
    }
  })

  return {
    state: store,
    send: service.send
  };
}