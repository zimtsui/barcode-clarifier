import { BrowserBarcodeReader } from '@zxing/library';
import readImageFile from './read-image-file';

const codeReader = new BrowserBarcodeReader();

export default file => Promise.resolve(file)
    .then(readImageFile)
    .then(originalDataUrl => codeReader.decodeFromImage(
        undefined, originalDataUrl,
    ));
