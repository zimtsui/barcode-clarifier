import Quagga from 'quagga';
import Compressor from 'compressorjs';
import readImageFile from './read-image-file';

export default file => new Promise(
    (resolve, reject) => new Compressor(file, {
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
        success: resolve,
        error: reject,
    }),
).catch((error) => {
    // 压缩失败就返回原图
    console.error(error);
    return file;
}).then(
    readImageFile,
).then(compressedDataUrl => new Promise((resolve, reject) => {
    // quagga文档里根本没写怎么抛出错误，那就不管错误了。
    Quagga.decodeSingle({
        decoder: {
            readers: ['code_128_reader'],
        },
        locate: false,
        numOfWorkers: 0,
        src: compressedDataUrl,
        // 如果不写size这个参数，解析png时有时会出奇怪的问题，写太大了还出错，可能是个bug吧。
        inputStream: {
            size: 2000,
        },
    }, (result) => {
        if (result.codeResult) {
            resolve(result.codeResult.code);
        } else {
            reject();
        }
    });
}));
