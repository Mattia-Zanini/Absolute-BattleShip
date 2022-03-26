<template>
    <transition-height-component>
        <div class="row" v-if="showRules">
            <div class="rules">
                <span class="close__icon" @click="showRules = false">
                    <svg
                        class="close__svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        ></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </span>
                <h4 class="rules__title">Rules</h4>
                <ul class="rules__list">
                    <li class="rules__item">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 26 26"
                            >
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                            </svg>
                        </span>
                        <span>Place each of your ship on the grid by clicking on it or use the auto placement button</span>
                    </li>
                    <li class="rules__item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 26 26"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                        </svg>
                        <span>Click start game to show the computer grid</span>
                    </li>
                    <li class="rules__item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 26 26"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                        </svg>
                        <span>Try and sink all computer ships on its grid</span>
                    </li>
                </ul>
            </div>
        </div>
    </transition-height-component>
</template>

<script>
import TransitionHeightComponent from "./TransitionHeightComponent";

export default {
    components: { TransitionHeightComponent },
    data() {
        return {
            showRules: true
        };
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";

.close {
    &__icon {
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.6rem;
    opacity: 0.8;
    color: black;

        &:hover {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    &__svg {
        width: 22px;
        height: 22px;

        @include screen (medium) {
            width: 18px;
            height: 18px;
        }
        @include screen (xs) {
            width: 15px;
            height: 15px;
        }
    }

    & svg {
        fill: currentColor;
    }

    
}

.rules {
    position: relative;
    background-color: whitesmoke;
    display: inline-block;
    padding: 1rem 1.5rem;
    border-radius: 0.2rem;
    opacity: 0.7;
    font-size: .9rem;

    @include screen(large) {
        font-size: 0.8rem;
        padding: 0.8rem 1.2rem;
    }

    @include screen(medium) {
        font-size: 0.7rem;
        padding: 0.6rem 0.8rem;
    }

    @include screen(xxs) {
        width: 80vw;
    }

    &__title {
        font-weight: 400;
        font-size: 1.2rem;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 1rem;

        @include screen(medium) {
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }

        @include screen(medium) {
            font-size: .9rem;
            margin-bottom: .3rem;
        }
        
    }

    &__list {
        list-style: none;
        line-height: 1.5rem;

        @include screen(medium) {
            line-height: 1.2rem;
        }
    }

    &__item {
        display: flex;
        align-items: center;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: scale(0);
}
</style>


