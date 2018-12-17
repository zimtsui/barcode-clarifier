<template lang="pug">
div.barcode-div(:class="{ invisable: !show }")
    canvas.barcode-canvas(ref="theCanvas")
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
    props: [
        'code',
        'show',
    ],
    mounted() {
        JsBarcode(this.$refs.theCanvas, this.code, {
            width: 16,
            height: 800,
            fontSize: 256,
        });
    },
};
</script>

<style lang="stylus">
.barcode-div
    margin 5px auto
    width 95%
.barcode-canvas
    width 100%
.invisable
    visibility hidden
</style>
