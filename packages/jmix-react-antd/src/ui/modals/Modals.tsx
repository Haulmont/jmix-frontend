import React, { useReducer, useMemo, useCallback } from 'react';
import { Modal, ModalProps as AntdModalProps } from "antd";

type ModalsReducer<BaseOptions> = (state: ModalsOptions<BaseOptions>, action: ModalsAction<BaseOptions>) => ModalsOptions<BaseOptions>;
type ModalsOptions<BaseOptions> = Set<ModalOptions<BaseOptions>>;
interface ModalsProps {
  children: React.ReactNode
}

type ModalOptions<BaseOptions> = BaseOptions & {
  content?: React.ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}
interface ModalsAction<BaseOptions> {
  type: string,
  payload?: ModalOptions<BaseOptions>
}
interface ModalsAPI<BaseOptions> {
  open: (options: ModalOptions<BaseOptions>) => () => void,
  close: (options: ModalOptions<BaseOptions>) => void,
  closeAll: () => void
}

enum ActionTypes {
  ADD = "ADD",
  DELETE = "DELETE",
  DELETE_ALL = "DELETE_ALL"
}

let modalsControlsContainer: ModalsAPI<any>;

function renderModals<BaseOptions>(
  modalsOptions: ModalsOptions<BaseOptions>,
  dispatch: React.Dispatch<ModalsAction<BaseOptions>>
): JSX.Element[] {
  return Array.from(modalsOptions).map((options, index) => {
    const { onCancel: onCancelOptions, onOk: onOkOptions, content, ...restOptions } = options;

    const onCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onCancelOptions?.(e);
      dispatch({ type: ActionTypes.DELETE, payload: options });
    };
    const onOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onOkOptions?.(e);
      dispatch({ type: ActionTypes.DELETE, payload: options });
    }
    return (
      <Modal
        visible={true}
        {...restOptions}
        onCancel={onCancel}
        onOk={onOk}
        key={`modal-${index}`}
      >
        {content}
      </Modal>
    )
  })
}

const modals = {
  open<BaseOptions = AntdModalProps>(options: ModalOptions<BaseOptions>): () => void {
    return modalsControlsContainer?.open(options);
  },
  close<BaseOptions = AntdModalProps>(options: ModalOptions<BaseOptions>) {
    return modalsControlsContainer?.close(options);
  },
  closeAll() {
    return modalsControlsContainer?.closeAll();
  }
}

function Modals<BaseOptions = AntdModalProps>({ children }: ModalsProps) {
  const initialState: ModalsOptions<BaseOptions> = useInitState<BaseOptions>();
  const reducer: ModalsReducer<BaseOptions> = useInitReducer<BaseOptions>();

  const [modalsState, dispatch] = useReducer<ModalsReducer<BaseOptions>>(reducer, initialState);

  modalsControlsContainer = useInitModalsControls<BaseOptions>(dispatch);

  return (
    <>
      {renderModals<BaseOptions>(modalsState, dispatch)}
      {children}
    </>
  )
}

function useInitReducer<BasicOptions>(): ModalsReducer<BasicOptions> {
  return useCallback((state: ModalsOptions<BasicOptions>, action: ModalsAction<BasicOptions>) => {
    switch (action.type) {
      case ActionTypes.ADD: {
        return new Set<ModalOptions<BasicOptions>>(state).add(action.payload!);
      };
      case ActionTypes.DELETE: {
        const updatedState = new Set<ModalOptions<BasicOptions>>(state);
        updatedState.delete(action.payload!);
        return updatedState;
      };
      case ActionTypes.DELETE_ALL: {
        return new Set<ModalOptions<BasicOptions>>();
      }
      default: return state
    }
  }, []);
}

function useInitState<BasicOptions>(): ModalsOptions<BasicOptions> {
  return useMemo(() => {
    return new Set<ModalOptions<BasicOptions>>();
  }, []);
}

function useInitModalsControls<BasicOptions>(
  dispatch: React.Dispatch<ModalsAction<BasicOptions>>
): ModalsAPI<BasicOptions> {
  return useMemo(() => {
    return {
      open(options: ModalOptions<BasicOptions>): () => void {
        dispatch({ type: ActionTypes.ADD, payload: options });
        return function () {
          dispatch({ type: ActionTypes.DELETE, payload: options });
        }
      },
      close(options: ModalOptions<BasicOptions>) {
        dispatch({ type: ActionTypes.DELETE, payload: options });
      },
      closeAll() {
        dispatch({ type: ActionTypes.DELETE_ALL });
      }
    }
  }, []);
}

export { Modals, modals };
