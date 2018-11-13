<template lang="pug">
cube-upload(
    multiple
    :auto="false"
    v-model="fileObjects"
    :processFile="addBase64"
)
</template>

<script>
export default {
    props: [
        'value',
    ],
    methods: {
        addBase64(file, next) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                file.base64 = fileReader.result;
                next(file);
            };
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
