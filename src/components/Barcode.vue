<template lang="pug">
div: canvas(ref="barcode")
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
    props: [
        'code',
        'value',
    ],
    data() {
        return {
            image: null,
        };
    },
    mounted() {
        JsBarcode(this.$refs.barcode, this.code);
        this.$emit('input', this.$refs.barcode.toDataURL());
    },
};
</script>
