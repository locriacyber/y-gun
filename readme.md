## Installation
```
npm install yjs gun <this repo's git URL>
```

## Usage

```js
import GUN from 'gun'
import { GunProvider } from "y-gun";

const ydoc = new Y.Doc(/* ... */)

let gun = GUN()
new GunProvider(gun.get('some-path-you-chose'), ydoc)
```

## Drawbacks
- Still can't sync across tabs. Need to refresh to see updates. This need support from GunDB's side (the persistence code is based on localStorage).
