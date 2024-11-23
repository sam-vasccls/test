<template>
    <form @submit.prevent="emits('apply:styles', styles)" class="user-options shadow">
        <section :class="[isOptionsOpen ? 'user-options__open' : 'user-options__closed']">
            <div class="user-options__title-wrapper" @click="emits('toggle:options')">
                <h2 class="user-options__title-wrapper__title">User Options</h2>
                <Icon
                    :class="['user-options__title-wrapper__icon', isOptionsOpen ? 'user-options__title-wrapper__icon-open' : '']"
                    name="material-symbols:arrow-drop-down-circle-outline" />
            </div>
            <span class="user-options__division-line"></span>

            <section class="user-options__font-size" @click.stop>
                <h3>Font Size:</h3>
                <input type="number" v-model="userFontSize">
            </section>

            <!--
                ------------------------------------------------------------- <br>
                MISSING LINE HEIGHT AND FONT WEIGHT <br>
                ------------------------------------------------------------- <br>
            -->

            <fieldset class="user-options__font-family" @click.stop>
                <h3 for="fontFamily">Font Family:</h3>
                <div class="user-options__font-family__itens">
                    <input type="radio" id="noto" v-model="userFontFamily" name="font" value="Noto Sans">
                    <label for="noto">Noto Sans</label>
                </div>
                <div class="user-options__font-family__itens">
                    <input type="radio" id="arial" v-model="userFontFamily" name="font" value="Arial">
                    <label for="arial">Arial</label>
                </div>
                <div class="user-options__font-family__itens">
                    <input type="radio" id="opensans" v-model="userFontFamily" name="font" value="Opens Sans">
                    <label for="opensans">Open Sans</label>
                </div>
                <div class="user-options__font-family__itens">
                    <input type="radio" id="playwrite" v-model="userFontFamily" name="font" value="Playwrite ES Deco">
                    <label for="playwrite">Playwrite España Decorativa</label>
                </div>
            </fieldset>
            <button class="user-options__main-btn" @click="playActiveAnimation" @click.stop>
                <div class="active-button"></div>
                <span>
                    Apply Changes
                </span>
            </button>
        </section>
    </form>
</template>

<script setup>
import { ref, toRefs } from '#imports'

const userFontSize = ref(14)
const userFontFamily = ref('Noto Sans')

const styles = [
    userFontFamily,
    userFontSize
]

const props = defineProps({
    isOptionsOpen: {
        type: Boolean,
        default: false
    },
})

const emits = defineEmits(['apply:styles', 'toggle:options'])

const { isOptionsOpen } = toRefs(props)


function openOptions() {
    isOptionsOpen.value = !isOptionsOpen.value
}

// ANIMATION

function playActiveAnimation() {
    const button = document.querySelector('.active-button');
    button.classList.add('active-button-animation', true);
    setTimeout(() => button.classList.remove('active-button-animation', false), 300);
}

</script>

<style lang="scss" scoped>
.user-options {
    display: flex;
    flex-direction: column;
    z-index: 5;
    background-color: var(--loading);
    position: absolute;
    user-select: none;
    font-size: 0.875rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    height: auto;
    gap: 1rem;
    align-items: center;
    left: 20px;
    top: 20px;
    color: var(--secondary);
    transition: 300ms;

    & input,
    & label {
        font-size: 14px;
    }

    &:hover {
        backdrop-filter: blur(10px);
        opacity: 1;
    }


    &__title-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--secondary);
        justify-content: center;
        width: 100%;
        gap: .5rem;
        transition: 1s;
        align-self: flex-start;

        &__icon {
            font-size: 20px;
            transition: 200ms;
        }

        &__icon-open {
            transform: rotateX(180deg);
        }
    }

    &__open {
        display: flex;
        padding: .8rem 1rem;
        flex-direction: column;
        backdrop-filter: blur(10px);
        opacity: 1;
        gap: 1rem;
        border-radius: 8px;
    }

    &__closed {
        padding: .8rem 1rem;
        cursor: pointer;

        & section,
        & fieldset,
        & button {
            opacity: 0;
            display: none;
        }
    }

    &__division-line {
        border-bottom: 1px solid var(--color5);
    }

    &__font-size {
        display: flex;
        flex-direction: column;

        & input {
            padding: .4rem .8rem;
            margin-top: 0.5rem;
            align-self: center;
            width: 90%;
            border-radius: 50px;
            background-color: var(--primary);
            outline: none;
            border: 1px solid transparent;

            &:focus {
                border-color: var(--color5);
            }

            &::selection {
                color: var(--primary);
                background-color: var(--color4);
            }
        }
    }

    &__font-family {
        display: flex;
        flex-direction: column;
        gap: .8rem;

        &__itens {
            display: flex;
            border-radius: 8px;
            padding-inline-start: .8rem;

            &:hover {
                background-color: var(--color5);
            }

            & label,
            & input {
                padding: 0.4rem;
                cursor: pointer;
            }
        }
    }

    & label {
        display: inline-block;
        margin-left: 0.5rem;
        flex-grow: 1;
    }

    &__main-btn {
        position: relative;
        padding: .5rem 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        border: 1px solid var(--color5);
        margin: auto;
        transition: 500ms;

        & span {
            z-index: 2;
        }

        &:hover {
            border-color: var(--color4);
        }

        & .active-button-animation {
            width: 0px;
            height: 0px;
            border-radius: 50px;
            position: absolute;
            background-color: var(--color5);
            transition: 150ms ease-out;
            backdrop-filter: blur(20px);

            animation-name: active-options-button;
            animation-duration: 300ms;
            animation-timing-function: ease-out;
            animation-fill-mode: backwards;
        }
    }
}

@keyframes active-options-button {
    0% {
        opacity: 1;
        width: 0;
        height: 0;
    }

    20% {
        opacity: 1;
    }

    75% {
        width: 100%;
        height: 100%;
        opacity: 1;
    }

    100% {
        opacity: .1;
        width: 100%;
        height: 100%;
    }
}
</style>