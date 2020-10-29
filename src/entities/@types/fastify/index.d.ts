import { FastifyPlugin } from 'fastify'

// interface PluginOptions {
//  //...
//  [key: string] : string
// }

// Optionally, you can add any additional exports.
// Here we are exporting the decorator we added.
export interface authenticate {
 (input: string): string
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module 'fastify' {
 interface FastifyInstance {
   authenticate: authenticate
 }
}

// fastify-plugin automatically adds named export, so be sure to add also this type
// the variable name is derived from `options.name` property if `module.exports.myPlugin` is missing
export const authPlugin: FastifyPlugin/* <PluginOptions> */

// fastify-plugin automatically adds `.default` property to the exported plugin. See the note below
export default authPlugin