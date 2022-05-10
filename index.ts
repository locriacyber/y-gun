import * as Y from 'yjs'
import type { IGunChain } from 'gun'
import {fromUint8Array as encode, toUint8Array as decode} from 'js-base64'


export class GunProvider<T extends IGunChain<any, any, any, any>> {
  doc: Y.Doc
  chain: T
  
  constructor(chain: T, doc: Y.Doc) {
    this.doc = doc
    this.chain = chain
    
    chain.get('state-update-v1').map((data) => {
      // var uint8array = new TextEncoder().encode("¢");
      // var string = new TextDecoder().decode(uint8array, {});
      Y.applyUpdate(doc, decode(data))
    })
    
    doc.on('update', this.update.bind(this))
    doc.on('destroy', this.destroy.bind(this))
  }
  
  update(update: Uint8Array) {
    // @ts-ignore
    this.chain.get('state-update-v1').set(encode(update))
  }

  destroy() {
    this.chain.get('state-update-v1').off()
  }
}
