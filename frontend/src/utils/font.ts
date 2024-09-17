/** @format */
import { Poppins, Roboto, Asap, Archivo, IBM_Plex_Mono } from 'next/font/google'

export const poppins_init = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
export const asap_init = Asap({
  subsets: ['latin'],
  variable: '--font-asap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
export const roboto_init = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic']
})
export const archivo_init = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic']
})
export const IBM_Plex_Mono_init = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm_plex_mono',
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic']
})

export const poppins = poppins_init.variable
export const asap = asap_init.variable
export const roboto = roboto_init.variable
export const archivo = archivo_init.variable
export const ibm_plex_mono = IBM_Plex_Mono_init.variable
