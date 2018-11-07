<template lang="pug">
div: canvas(ref="barcode")
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
    props: [
        'code',
    ],
    mounted() {
        JsBarcode(this.$refs.barcode, this.code);
    },
};
</script>
