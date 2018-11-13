<template lang="pug">
div#root: div#main
    the-uploader(v-model="fileObjects")
    cube-button(@click="parse") 解析
    the-results(:codes="codes")
</template>

<script>
import Quagga from 'quagga';
import TheUploader from './the-uploader/index.vue';
import TheResults from './the-results/index.vue';

export default {
    data() {
        return {
            fileObjects: [],
            codes: [],
        };
    },
    methods: {
        async parse() {
            let files = [];
            // Quagga.decodeSingle是有副作用的函数，只能一个一个运行。
            for (const fileObject of this.fileObjects) {
                const image = new Image();
                image.src = fileObject.base64;
                await new Promise((resolve) => { image.onload = resolve; });
                const code = await new Promise((resolve) => {
                    // quagga文档里根本没写怎么抛出错误，那就不管错误了。
                    Quagga.decodeSingle({
                        decoder: {
                            readers: ['code_128_reader'],
                        },
                        locate: false,
                        numOfWorkers: 0,
                        src: fileObject.base64,
                        // 如果不写size这个参数，解析png时有时会出奇怪的问题，写太大了还出错，可能是个bug吧。
                        inputStream: {
                            size: 2000,
                        },
                    }, (result) => {
                        if (result.codeResult) {
                            resolve(result.codeResult.code);
                        } else {
                            resolve(null);
                        }
                    });
                });
                files.push({
                    fileObject,
                    code,
                });
            }
            files = files.filter(file => file.code !== null);
            this.fileObjects = files.map(file => file.fileObject);
            this.codes = files.map(file => file.code);
        },
    },
    components: {
        TheUploader,
        TheResults,
    },
};

</script>

<style lang="stylus">
#root
    overflow hidden
#main
    margin 20px
</style>
