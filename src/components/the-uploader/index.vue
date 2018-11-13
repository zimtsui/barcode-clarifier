<template lang="pug">
cube-upload(
    multiple
    :auto="false"
    v-model="fileObjects"
    :processFile="addBase64"
)
</template>

<script>
import Compressor from 'compressorjs';

export default {
    props: [
        'value',
    ],
    methods: {
        addBase64(file, next) {
            new Promise(
                (resolve, reject) => new Compressor(file, {
                    maxWidth: 1024,
                    maxHeight: 1024,
                    quality: 1,
                    success: resolve,
                    error: reject,
                }),
            ).catch((error) => {
                console.error(error);
                return file;
            }).then((file) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    file.base64 = fileReader.result;
                    next(file);
                };
            });
        },
    },
    computed: {
        fileObjects: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
