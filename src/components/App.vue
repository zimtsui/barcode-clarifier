<template lang="pug">
div
    el-upload(
        action=""
        multiple
        :on-change="updateFileList"
        :on-remove="updateFileList"
        :auto-upload="false"
        list-type="picture"
    )
        el-button(slot="trigger" size="small" type="primary") 添加图片
        el-button(style="margin-left: 10px;" size="small" type="success" @click="decodePictures") 清晰化
        div(slot="tip" class="el-upload__tip") 先添加图片，再点清晰化。
    barcode(v-for="code in codes" :code="code.value" :key="code.id")
</template>

<script>
import Quagga from 'quagga';
import Barcode from './Barcode.vue';

export default {
    data() {
        return {
            fileList: [],
            codes: [],
        };
    },
    methods: {
        updateFileList(file, fileList) {
            this.fileList = [...fileList];
        },
        async decodePictures() {
            const codes = [];
            for (const file of this.fileList) {
                codes.push(await new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file.raw);
                    fileReader.addEventListener('load', () => {
                        Quagga.decodeSingle({
                            decoder: {
                                readers: ['code_128_reader'],
                            },
                            locate: false,
                            numOfWorkers: 0,
                            src: fileReader.result,
                        }, (result) => {
                            if (result.codeResult) {
                                resolve(result.codeResult.code);
                            } else {
                                resolve(null);
                            }
                        });
                    });
                }));
            }
            this.codes = codes
                .filter(code => code !== null)
                .map(code => ({
                    value: code,
                    id: Symbol('unique'),
                }));
        },
    },
    components: {
        Barcode,
    },
};

</script>
