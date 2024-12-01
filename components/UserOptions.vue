<template>
    <form @submit.prevent="emits('apply:styles', styles)" class="user-options shadow">
        <section :class="[isOptionsOpen ? 'user-options__open' : 'user-options__closed']" @click.stop="openOptions"
            ref="userOptions">
            <div :class="['user-options__title-wrapper', { 'user-options__title-wrapper__open': isOptionsOpen }]"
                @click.stop="closeOptions">
                <h2 class="user-options__title-wrapper__title">User Options</h2>
                <Icon
                    :class="['user-options__title-wrapper__icon', isOptionsOpen ? 'user-options__title-wrapper__icon-open' : '']"
                    name="material-symbols:arrow-drop-down-circle-outline" />
            </div>

            <section class="user-options__font-size" @click.stop>
                <h3>Font Size:</h3>
                <input class="user-options__font-size__input" type="number" v-model="userFontSize" min="8" max="40">
            </section>

            <!--
                ------------------------------------------------------------- <br>
                MISSING LINE HEIGHT AND FONT WEIGHT <br>
                ------------------------------------------------------------- <br>
            -->

            <fieldset class="user-options__font-family" @click.stop>
                <h3 for="fontFamily">Font Family:</h3>
                <div class="user-options__font-family__itens" v-for="(font, index) in fonts" :key="index">
                    <input type="radio" :id="font" v-model="userFontFamily" name="fontFamily" :value="font"
                        class="visually-hidden">
                    <label :for="font" class="user-options__font-family__itens__label">
                        <span class="user-options__font-family__itens__label--radio">
                            <span :class="{ 'active-font': font === userFontFamily }" />
                        </span>
                        {{ font }}
                    </label>
                </div>
            </fieldset>
            <button class="user-options__main-btn" @click="playActiveAnimation" @click.stop
                :disabled="userFontSize > 40 || userFontSize < 8">
                <div class="active-button"></div>
                <span>
                    Apply Changes
                </span>
            </button>
        </section>
    </form>
</template>

<script setup>
import { ref } from '#imports'
import { onClickOutside } from "@vueuse/core";

const userFontSize = ref(14)
const userFontFamily = ref('Noto Sans')
const fonts = ['Noto Sans', 'Arial', 'Open Sans', 'Playwrite ES Deco']
const isOptionsOpen = ref(false)
const userOptions = ref(null)

const styles = [
    userFontFamily,
    userFontSize
]

onClickOutside(userOptions, () => isOptionsOpen.value = false)

const emits = defineEmits(['apply:styles', 'toggle:options'])

function openOptions() {
    if (isOptionsOpen.value) return
    isOptionsOpen.value = true
}

function closeOptions() {
    isOptionsOpen.value = !isOptionsOpen.value
}

// ANIMATION
function playActiveAnimation() {
    const button = document.querySelector('.active-button');
    button.classList.add('active-button-animation');
    setTimeout(() => button.classList.remove('active-button-animation', false), 300);
}

</script>

<style lang="scss" scoped>
.user-options {
    display: flex;
    flex-direction: column;
    z-index: 5;
    background-color: var(--color-bg);
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
        align-self: flex-start;

        &__open {
            height: 40px;
            border-bottom: 1px solid var(--color-accent);
            transition: 0 0;
        }

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
        padding: .8rem 2rem;
        flex-direction: column;
        backdrop-filter: blur(10px);
        opacity: 1;
        gap: 1rem;
        border-radius: 8px;
        // transition: 0;
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

    &__font-size {
        display: flex;
        flex-direction: column;

        & input {
            padding: .4rem .8rem;
            margin-top: 0.5rem;
            align-self: center;
            width: 90%;
            border-radius: 50px;
            background-color: var(--color-border);
            outline: none;
            border: 1px solid transparent;

            &:focus {
                border-color: var(--color-accent);
            }

            &::selection {
                color: var(--primary);
                background-color: var(--color-text-primary);
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
            align-items: center;
            justify-content: ce;
            padding-inline-start: .8rem;

            &:hover {
                background-color: var(--color-bg);
            }

            & input {
                padding: 0.4rem;
                cursor: pointer;
            }

            &__label {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 16px;
                height: 40px;
                cursor: pointer;
                margin-left: 0.5rem;
                width: 100%;
                flex-wrap: nowrap;

                &--radio {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 16px;
                    height: 16px;
                    border-radius: 100%;
                    border: 1px solid var(--secondary);

                    & .active-font {
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 100%;
                        background-color: var(--color-text-primary);
                    }
                }
            }
        }
    }

    &__main-btn {
        position: relative;
        padding: .5rem 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        margin: auto;
        transition: background-color, border-color 500ms;

        & span {
            z-index: 2;
        }

        &:not([disabled]) {
            border: 1px solid var(--color-accent);
        }

        &:not([disabled]):hover {
            border-color: var(--color-text-primary);
        }

        & .active-button-animation {
            width: 0px;
            height: 0px;
            border-radius: 50px;
            position: absolute;
            background-color: var(--color-hover);
            transition: 150ms ease-out;
            backdrop-filter: blur(20px);

            animation-name: active-options-button;
            animation-duration: 300ms;
            animation-timing-function: ease-out;
            animation-fill-mode: backwards;
        }

        &:disabled {
            background-color: #f0f0f0;
            color: #555;
            border: 1px solid #ccc;
            cursor: not-allowed;
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