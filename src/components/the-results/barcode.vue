<template lang="pug">
div(ref="theDiv")
</template>

<script>

export default {
    props: [
        'canvas',
    ],
    mounted() {
        this.$refs.theDiv.appendChild(this.canvas);
    },
};
</script>
