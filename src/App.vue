<template lang="pug">
div
    cube-upload(
        multiple
        :auto="false"
        accept="image/jpeg, image/png"
        v-model="files"
        :processFile="addBase64"
    )
    cube-button(@click="parse") 解析
    barcode(v-for="code in codes" :code="code.value" :key="code.key")
</template>

<script>
import Quagga from 'quagga';
import Barcode from './components/Barcode.vue';

export default {
    data() {
        return {
            files: [],
            codes: [],
        };
    },
    methods: {
        addBase64(file, next) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                file.base64 = fileReader.result;
                next(file);
            };
        },
        async parse() {
            for (const file of this.files) {
                file.code = await new Promise((resolve) => {
                    Quagga.decodeSingle({
                        decoder: {
                            readers: ['code_128_reader'],
                        },
                        locate: false,
                        numOfWorkers: 0,
                        src: file.base64,
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
            }));
        },
    },
    components: {
        Barcode,
    },
};

</script>
