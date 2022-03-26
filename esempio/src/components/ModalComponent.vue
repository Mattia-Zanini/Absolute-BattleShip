<template>
    <transition name="fade" @after-enter="viewContent = true">
        <div class="modal" @click="closeModal" v-if="isModalOpen">
            <span class="close__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    ></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
            </span>
            <transition name="scale">
                <div @click.stop v-show="viewContent">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isModalOpen: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            viewContent: false
        };
    },
    methods: {
        openModal() {
            this.viewModal = true;
        },
        closeModal() {
            this.viewContent = false;
            this.$emit("closeModal");
        }
    }
};
</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.85);
    transition: all 0.4s ease-in-out;
}
.close__icon {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    opacity: 0.8;
    color: whitesmoke;

    & svg {
        fill: currentColor;
    }

    &:hover {
        transform: scale(1.1);
        opacity: 1;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.scale-enter-active {
    animation: scaleIn 0.2s ease-in-out forwards;
}
.scale-leave-active {
    animation: scaleOut 0.2s ease-in-out forwards;
}
@keyframes scaleIn {
    0% {
        opacity: 0;
        transform: scale(0.75);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes scaleOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.75);
    }
}
</style>