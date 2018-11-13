<template lang="pug">
div: barcode(
    v-for="result in results"
    :code="result.code"
    :key="result.key"
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
            }));
        },
    },
    components: {
        Barcode,
    },
};
</script>
