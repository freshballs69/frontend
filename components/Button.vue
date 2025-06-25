<template>
    <button class="btn" @click="$emit('click')" type="button"> 
        <slot></slot>
    </button>
</template>


<script setup>
const emit = defineEmits(['click'])


</script>

<style lang="scss" scoped>
.btn {
    border: 0;
    background: inherit;
    cursor: pointer;
    border-radius: 4px;
    padding: 0;
    margin: 0;

    &.success {
        background-color: rgba(9, 192, 9, 0.664);
        color: white;
    }

    &.danger {
        background-color: rgba(255, 0, 0, 0.747);
    }

    &.primary {
        background-color: blueviolet;
        color: white;
    }
}
</style>