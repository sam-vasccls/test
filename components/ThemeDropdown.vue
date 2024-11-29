<template>
    <div ref="dropdownElement" class="dropdown" @click.stop="toggleDropdown">
        <button class="m-1 dropdown__btn btn btn-neutral-content">
            <Icon class="theme-icon" name="material-symbols:partly-cloudy-day" />
            Themes
        </button>
        <ul class="dropdown__content shadow-lg" v-if="isDropdownOpen">
            <li class="dropdown__option" @click="setTheme('default')">
                <div>
                    <Icon :class="[activeTheme === 'default' ? `show-${activeTheme}` : 'invisible']"
                        name="material-symbols:check-rounded" />
                    <Icon class="theme-icon" name="material-symbols:wb-sunny-rounded" />
                </div>
                Default
            </li>
            <li class="dropdown__option" @click="setTheme('dark')">
                <div>
                    <Icon :class="[activeTheme === 'dark' ? `show-${activeTheme}` : 'invisible']"
                        name="material-symbols:check-rounded" />
                    <Icon class="theme-icon" name="material-symbols:dark-mode-rounded" />
                </div>
                Dark
            </li>
            <li class="dropdown__option" @click="setTheme('pink')">
                <div>
                    <Icon :class="[activeTheme === 'pink' ? `show-${activeTheme}` : 'invisible']"
                        name="material-symbols:check-rounded" />
                    <Icon class="theme-icon icon-color-pink" name="material-symbols:circles" />
                </div>
                Pink
            </li>
            <li class="dropdown__option" @click="setTheme('blue')">
                <div>
                    <Icon :class="[activeTheme === 'blue' ? `show-${activeTheme}` : 'invisible']"
                        name="material-symbols:check-rounded" />
                    <Icon class="theme-icon icon-color-blue" name="material-symbols:circles" />
                </div>
                Blue
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "#imports";
import { onClickOutside } from "@vueuse/core";

onBeforeMount(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme)
})

const dropdownElement = ref(null);

const isDropdownOpen = ref(false);
const activeTheme = ref("default");

onClickOutside(dropdownElement, () => isDropdownOpen.value = false);

function setTheme(theme) {
    activeTheme.value = theme;
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute("data-theme", theme);
    isDropdownOpen.value = false;
};

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}
</script>

<style lang="scss" scoped>
.dropdown {
    position: absolute;
    color: var(--secondary);
    top: 1rem;
    right: 2rem;

    &__btn,
    &__content {
        z-index: 2;
    }

    &__content {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 150%;
        right: 0.2rem;
        padding: 0.7rem;
        border-radius: 8px;
        background-color: var(--color3)
    }

    &__option {
        display: flex;
        gap: 1rem;
        padding: 0.3rem 1rem;
        border-radius: 8px;
        cursor: pointer;

        &:hover {
            background-color: var(--color8);
        }

        & div {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
    }
}

.theme-icon {
    font-size: 20px;
}

.show-dark,
.show-pink,
.show-blue,
.show-default {
    opacity: 1;
}

.icon-color-blue {
    color: hsl(210, 100%, 70%);
}

.icon-color-pink {
    color: hsl(340, 100%, 70%);
}
</style>
