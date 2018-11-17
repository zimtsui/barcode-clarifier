<template lang="pug">
div#root: div#main
    cube-upload(
        multiple
        :auto="false"
        v-model="fileObjects"
    )
    cube-button(@click="parse") 解析
    the-results(:codes="codes")
</template>

<script>
import Promise from 'bluebird';
import TheResults from './the-results/index.vue';
import parseWithQuagga from './parse-with-quagga';
import parseWithZxing from './parse-with-zxing';

export default {
    data() {
        return {
            fileObjects: [],
            codes: [],
        };
    },
    methods: {
        async parse() {
            const files = [];
            // quagga是有副作用的，不能同时运行两个，所以只能循环，不能用函数式编程的写法。
            for (const fileObject of this.fileObjects) {
                files.push({
                    fileObject,
                    code: await Promise.reject()
                        .catchThrow(fileObject.file)
                        .catch(parseWithZxing)
                        .catchThrow(fileObject.file)
                        .catch(parseWithQuagga)
                        .catchReturn(null),
                });
            }
            const filteredFiles = files.filter(file => file.code !== null);
            this.fileObjects = filteredFiles.map(file => file.fileObject);
            this.codes = filteredFiles.map(file => file.code);
        },
    },
    components: {
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
