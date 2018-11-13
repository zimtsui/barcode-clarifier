<template lang="pug">
div
    cube-upload(
        multiple
        :auto="false"
        v-model="files"
        :processFile="addBase64"
    )
    cube-button(@click="parse") 解析
    barcode(
        v-for="(code, index) in codes"
        :code="code.value"
        :key="code.key"
        @click.native="showPreview(index)"
        v-model="code.image"
    )
</template>

<script>
import Quagga from 'quagga';
import JsBarcode from 'jsbarcode';
import Barcode from './components/Barcode.vue';

export default {
    data() {
        return {
            files: [],
            codes: [],
            previewInitialIndex: 0,
        };
    },
    computed: {
        images() {
            // return this.codes.map(code => code.image);
            return this.codes.map((code) => {
                const canvas = document.createElement('canvas');
                JsBarcode(canvas, code.value);
                return canvas.toDataURL();
            });
        },
    },
    methods: {
        showPreview(index) {
            this.$createImagePreview({
                $props: {
                    imgs: this.images,
                    initialIndex: index,
                    loop: false,
                },
            }).show();
        },
        addBase64(file, next) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                file.base64 = fileReader.result;
                file.image = new Image();
                file.image.src = file.base64;
                file.image.onload = () => next(file);
            };
        },
        async parse() {
            // Quagga.decodeSingle是有副作用的函数，只能一个一个运行。
            for (const file of this.files) {
                file.code = await new Promise((resolve) => {
                    Quagga.decodeSingle({
                        decoder: {
                            readers: ['code_128_reader'],
                        },
                        locate: false,
                        numOfWorkers: 0,
                        src: file.base64,
                        // 如果不写size这个参数，解析png时有时会出奇怪的问题，可能是个bug吧。
                        inputStream: {
                            size: Math.max(file.file.image.width, file.file.image.hight),
                        },
                    }, (result) => {
                        if (result.codeResult) {
                            resolve(result.codeResult.code);
                        } else {
                            resolve(null);
                        }
                    });
                });
            }
            this.files = this.files.filter(file => file.code !== null);
            this.codes = this.files.map(file => ({
                key: Symbol('unique'),
                value: file.code,
                image: null,
            }));
        },
    },
    components: {
        Barcode,
    },
};

</script>
