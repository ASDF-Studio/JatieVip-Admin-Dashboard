/* eslint-disable import/no-relative-packages */
/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable no-control-regex */
// eslint-disable-next-line max-classes-per-file
import { simd } from 'wasm-feature-detect'
import initResizeWasm, { resize as wasmResize } from '../../codecs/resize/pkg'
import initHqxWasm, { resize as wasmHqx } from '../../codecs/hqx/pkg'

export const magicNumberMapInput = [
  [/^%PDF-/, 'application/pdf'],
  [/^GIF87a/, 'image/gif'],
  [/^GIF89a/, 'image/gif'],
  [/^\x89PNG\x0D\x0A\x1A\x0A/, 'image/png'],
  [/^\xFF\xD8\xFF/, 'image/jpeg'],
  [/^BM/, 'image/bmp'],
  [/^I I/, 'image/tiff'],
  [/^II*/, 'image/tiff'],
  [/^MM\x00*/, 'image/tiff'],
  [/^RIFF....WEBPVP8[LX ]/s, 'image/webp'],
  [/^\xF4\xFF\x6F/, 'image/webp2'],
  [/^\x00\x00\x00 ftypavif\x00\x00\x00\x00/, 'image/avif'],
  [/^\xff\x0a/, 'image/jxl'],
  [/^\x00\x00\x00\x0cJXL \x0d\x0a\x87\x0a/, 'image/jxl'],
] as const

interface DrawableToImageDataOptions {
  width?: number
  height?: number
  sx?: number
  sy?: number
  sw?: number
  sh?: number
}

const init = async () => {
  if (await simd()) {
    const webpEncoder = await import('../../codecs/webp/enc/webp_enc_simd')

    return initEmscriptenModule(webpEncoder.default)
  }
  const webpEncoder = await import('../../codecs/webp/enc/webp_enc')

  return initEmscriptenModule(webpEncoder.default)
}

let emscriptenModule = null
let resizeWasmReady: Promise<unknown> = null
let hqxWasmReady: Promise<unknown> = null

const getWidth = (drawable: ImageBitmap | HTMLImageElement | VideoFrame): number => {
  if ('displayWidth' in drawable) {
    return drawable.displayWidth
  }

  return drawable.width
}

const getHeight = (drawable: ImageBitmap | HTMLImageElement | VideoFrame): number => {
  if ('displayHeight' in drawable) {
    return drawable.displayHeight
  }

  return drawable.height
}

const hasImageDecoder = typeof ImageDecoder !== 'undefined'

const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
  return new Response(blob).arrayBuffer()
}

export type ImageMimeTypes = typeof magicNumberMapInput[number][1]

const sniffMimeType = async (blob: Blob): Promise<ImageMimeTypes | ''> => {
  const firstChunk = await blobToArrayBuffer(blob.slice(0, 16))
  const firstChunkString = Array.from(new Uint8Array(firstChunk))
    .map((v) => String.fromCodePoint(v))
    .join('')

  // eslint-disable-next-line no-restricted-syntax
  for (const [detector, mimeType] of magicNumberMapInput) {
    if (detector.test(firstChunkString)) {
      return mimeType
    }
  }

  return ''
}

export const isTypeSupported = async (mimeType: string): Promise<boolean> => {
  if (!hasImageDecoder) return false
  try {
    return await ImageDecoder.isTypeSupported(mimeType)
  } catch (err) {
    return false
  }
}

const drawableToImageData = (
  drawable: ImageBitmap | HTMLImageElement | VideoFrame,
  opts: DrawableToImageDataOptions = {},
): ImageData => {
  const {
    width = getWidth(drawable),
    height = getHeight(drawable),
    sx = 0,
    sy = 0,
    sw = getWidth(drawable),
    sh = getHeight(drawable),
  } = opts

  // Make canvas same size as image
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  // Draw image onto canvas
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not create canvas context')
  ctx.drawImage(drawable, sx, sy, sw, sh, 0, 0, width, height)

  return ctx.getImageData(0, 0, width, height)
}

const decode = async (blob: Blob | File, mimeType: string): Promise<ImageData> => {
  if (!hasImageDecoder) {
    throw Error(`This browser does not support ImageDecoder. This function should not have been called.`)
  }
  const decoder = new ImageDecoder({
    type: mimeType,
    // Non-obvious way to turn an Blob into a ReadableStream
    data: new Response(blob).body,
  })

  const { image } = await decoder.decode()

  return drawableToImageData(image)
}

const decodeImage = async (url: string): Promise<HTMLImageElement> => {
  const img = new Image()
  img.decoding = 'async'
  img.src = url
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(Error('Image loading error'))
  })

  if (img.decode) {
    // Nice off-thread way supported in Safari/Chrome.
    // Safari throws on decode if the source is SVG.
    // https://bugs.webkit.org/show_bug.cgi?id=188347
    await img.decode().catch(() => null)
  }

  // Always await loaded, as we may have bailed due to the Safari bug above.
  await loaded

  return img
}

const blobToImg = async (blob: Blob): Promise<HTMLImageElement> => {
  const url = URL.createObjectURL(blob)

  try {
    return await decodeImage(url)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export const builtinDecode = async (blob: Blob) => {
  const mimeType = await sniffMimeType(blob)

  if (await isTypeSupported(mimeType)) {
    try {
      return await decode(blob, mimeType)
    } catch (e) {
      return e
    }
  }

  const drawable = await ('createImageBitMap' in window ? createImageBitmap(blob) : blobToImg(blob))

  return drawableToImageData(drawable)
}

const initEmscriptenModule = (moduleFactory) => {
  return moduleFactory({
    noInitialRun: true,
  })
}

const options = {
  alpha_compression: 1,
  alpha_filtering: 1,
  alpha_quality: 100,
  autofilter: 0,
  emulate_jpeg_size: 0,
  exact: 0,
  filter_sharpness: 0,
  filter_strength: 60,
  filter_type: 1,
  image_hint: 0,
  lossless: 0,
  low_memory: 0,
  method: 4,
  near_lossless: 100,
  partition_limit: 0,
  partitions: 0,
  pass: 1,
  preprocessing: 0,
  quality: 75,
  segments: 4,
  show_compressed: 0,
  sns_strength: 50,
  target_PSNR: 0,
  target_size: 0,
  thread_level: 0,
  use_delta_palette: 0,
  use_sharp_yuv: 0,
}

interface HqxResizeOptions extends WorkerResizeOptions {
  method: 'hqx'
}

const optsIsHqxOpts = (opts: WorkerResizeOptions): opts is HqxResizeOptions => {
  return opts.method === 'hqx'
}

export const imageToWebp = async (
  file: File | ImageData,
  isImageData = false,
): Promise<{
  image: ArrayBuffer
  size: number
}> => {
  if (!emscriptenModule) emscriptenModule = init()
  const module = await emscriptenModule
  let decodedImage = null
  if (isImageData) decodedImage = file
  else decodedImage = await builtinDecode(file as File)

  const result = module.encode(decodedImage.data, decodedImage.width, decodedImage.height, options)
  if (!result) throw new Error('Encoding error.')

  return { image: result.buffer, size: result.length }
}

type WorkerResizeMethods = 'triangle' | 'catrom' | 'mitchell' | 'lanczos3' | 'hqx'

export const workerResizeMethods: WorkerResizeMethods[] = ['triangle', 'catrom', 'mitchell', 'lanczos3', 'hqx']

export interface ResizeOptionsCommon {
  width: number
  height: number
  fitMethod: 'stretch' | 'contain'
}

export interface WorkerResizeOptions extends ResizeOptionsCommon {
  method: WorkerResizeMethods
  premultiply: boolean
  linearRGB: boolean
}

interface ClampOpts {
  min?: number
  max?: number
}

const clamp = (num: number, { min = Number.MIN_VALUE, max = Number.MAX_VALUE }: ClampOpts): number => {
  return Math.min(Math.max(num, min), max)
}

const hqx = async (input: ImageData, opts: HqxResizeOptions): Promise<ImageData> => {
  if (!hqxWasmReady) {
    hqxWasmReady = initHqxWasm()
  }

  await hqxWasmReady

  const widthRatio = opts.width / input.width
  const heightRatio = opts.height / input.height
  const ratio = Math.max(widthRatio, heightRatio)
  const factor = clamp(Math.ceil(ratio), { min: 1, max: 4 }) as 1 | 2 | 3 | 4

  if (factor === 1) return input

  const result = wasmHqx(new Uint32Array(input.data.buffer), input.width, input.height, factor)

  return new ImageData(new Uint8ClampedArray(result.buffer), input.width * factor, input.height * factor)
}

const crop = (data: ImageData, sx: number, sy: number, sw: number, sh: number): ImageData => {
  const inputPixels = new Uint32Array(data.data.buffer)

  // Copy within the same buffer for speed and memory efficiency.
  for (let y = 0; y < sh; y += 1) {
    const start = (y + sy) * data.width + sx
    inputPixels.copyWithin(y * sw, start, start + sw)
  }

  return new ImageData(new Uint8ClampedArray(inputPixels.buffer.slice(0, sw * sh * 4)), sw, sh)
}

const getContainOffsets = (sw: number, sh: number, dw: number, dh: number) => {
  const currentAspect = sw / sh
  const endAspect = dw / dh

  if (endAspect > currentAspect) {
    const newSh = sw / endAspect
    const newSy = (sh - newSh) / 2

    return { sw, sh: newSh, sx: 0, sy: newSy }
  }

  const newSw = sh * endAspect
  const newSx = (sw - newSw) / 2

  return { sh, sw: newSw, sx: newSx, sy: 0 }
}
const resizeMethods: WorkerResizeOptions['method'][] = ['triangle', 'catrom', 'mitchell', 'lanczos3']

export const resize = async (data: ImageData, opts: WorkerResizeOptions): Promise<ImageData> => {
  let input = data

  if (!resizeWasmReady) {
    resizeWasmReady = initResizeWasm()
  }

  if (optsIsHqxOpts(opts)) {
    input = await hqx(input, opts)
    // Regular resize to make up the difference
    // eslint-disable-next-line no-param-reassign
    opts = { ...opts, method: 'catrom' }
  }

  await resizeWasmReady

  if (opts.fitMethod === 'contain') {
    const { sx, sy, sw, sh } = getContainOffsets(data.width, data.height, opts.width, opts.height)
    input = crop(input, Math.round(sx), Math.round(sy), Math.round(sw), Math.round(sh))
  }

  const result = wasmResize(
    new Uint8Array(input.data.buffer),
    input.width,
    input.height,
    opts.width,
    opts.height,
    resizeMethods.indexOf(opts.method),
    opts.premultiply,
    opts.linearRGB,
  )

  return new ImageData(new Uint8ClampedArray(result.buffer), opts.width, opts.height)
}

export const getDimenstionSquare = (width: number, height: number, targetSize = 400) => {
  if (width > height) {
    return {
      width: targetSize * (width / height),
      height: targetSize,
    }
  }

  return {
    width: targetSize,
    height: targetSize * (height / width),
  }
}
