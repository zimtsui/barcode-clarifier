<template lang="pug">
div: barcode(
    v-for="result in results"
    :code="result.code"
    :key="result.key"
    :show="ifShow(result.key)"
    @click.native="onClick(result.key)"
)
</template>

<script>
import Barcode from './barcode.vue';

export default {
    props: [
        'codes',
    ],
    computed: {
        results() {
            return this.codes.map(code => ({
                key: Symbol('unique'),
                code,
                show: true,
            }));
        },
    },
    watch: {
        codes() {
            this.previewed = null;
        },
    },
    data() {
        return {
            previewed: null,
        };
    },
    methods: {
        ifShow(key) {
            return !this.previewed || key === this.previewed;
        },
        onClick(key) {
            if (key === this.previewed) this.previewed = null; else this.previewed = key;
        },
    },
    components: {
        Barcode,
    },
};
</script>
