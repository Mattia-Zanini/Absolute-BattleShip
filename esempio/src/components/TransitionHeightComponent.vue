<template>
    <transition name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave">
        <slot></slot>
    </transition>
</template>


<script>
export default {
    methods: {
    enter(element) {
        const width = getComputedStyle(element).width;
        element.style.width = width;
        element.style.position = 'absolute';
        element.style.visibility = 'hidden';
        element.style.height = 'auto';

        const height = getComputedStyle(element).height;
        element.style.width = null;
        element.style.position = null;
        element.style.visibility = null;
        element.style.height = 0;

        // Force repaint to make sure the animation is triggered correctly.
        getComputedStyle(element).height;

        // Trigger the animation. We use `setTimeout` because we need to make sure the
        // browser has finished painting after setting the `height` to `0` in the line above.
        setTimeout(() => element.style.height = height);
    },
    afterEnter(element) {
        element.style.height = 'auto';
    },
    leave(element) {
        const height = getComputedStyle(element).height;
        element.style.height = height;

        // Force repaint to make sure the animation is triggered correctly.
        getComputedStyle(element).height;

        setTimeout(() => element.style.height = 0);
    }
    }
}
</script>

<style scoped>
/* force the browser into optimizing the animation */
* {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

.expand-enter-active,
.expand-leave-active {
    transition: all 1s ease-in-out;
    overflow: hidden;
}
.expand-enter,
.expand-leave-to {
    height: 0;
    opacity: 0;
}
</style>
