<template lang="pug">
div: barcode(
    v-for="(result, index) in results"
    :canvas="result.canvas"
    :key="result.key"
    @click.native="showPreview(index)"
)
</template>

<script>
import JsBarcode from 'jsbarcode';
import Barcode from './barcode.vue';

export default {
    props: [
        'codes',
    ],
    computed: {
        results() {
            return this.codes.map((code) => {
                const canvas = document.createElement('canvas');
                JsBarcode(canvas, code);
                return {
                    key: Symbol('unique'),
                    code,
                    canvas,
                };
            });
        },
        imageUrls() {
            return this.results.map(result => result.canvas.toDataURL('image/png'));
        },
    },
    methods: {
        showPreview(index) {
            this.$createImagePreview({
                $props: {
                    imgs: this.imageUrls,
                    initialIndex: index,
                    loop: false,
                },
            }).show();
        },
    },
    components: {
        Barcode,
    },
};
</script>
