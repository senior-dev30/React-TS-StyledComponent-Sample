import _ from 'lodash'
import { createTransform, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Immutable from 'seamless-immutable'

import { RootState } from '../Redux'

const transform = createTransform(
  // transform state on its way to being serialized and persisted.
  // inboundState should be an immutable object
  (inboundState: RootState) => {
    if (_.has(inboundState, 'asMutable')) {
      return inboundState.asMutable({ deep: true })
    }
    return inboundState
  },
  // transform state being rehydrated
  // outboundState should be a raw object
  outboundState => {
    return Immutable(outboundState)
  },
)

const version = 1

export const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  version,
  transforms: [transform],
  blacklist: ['form'],
  migrate: state => {
    if (_.get(state, '_persist.version') === version) return Promise.resolve(state)

    return Promise.resolve({
      _persist: { rehydrated: false, version },
    })
  },
}
