<template>
    <section id="word-counter" class="word-counter__wrapper flex">

        <UserOptions :isOptionsOpen="isOptionsOpen" @toggle:options="openOptions" @apply:styles="applyStyles" />

        <ThemeDropdown />

        <div class="word-counter__content-wrapper">
            <h1>Writing Haven</h1>
            <div class="word-counter__quantity-wrapper">
                <h3>
                    Word Count:
                    <div class="word-counter__quantity-wrapper__blur" v-if="writtenText.length > 0">
                        {{ wordCount }}
                    </div>
                </h3>
            </div>
            <textarea placeholder="Write your text here... save it locally if you want using the save button below!"
                spellcheck="false" class="word-counter__textarea" :style="userStyles" :class="[
                    'word-counter__textarea',
                    isDarkTheme ? 'light-textarea' : 'dark-textarea',
                ]" v-model="writtenText">
            </textarea>
            <div class="word-counter__cta-wrapper">
                <button class="main-btn secondary" @click="loadText">Load Text</button>
                <!-- <button class="main-btn secondary" title="Saves the text and exports it as a PDF File!" @click="savePDF">Save as PDF</button> -->
                <button class="main-btn" @click="saveText">
                    Save Text Locally
                </button>
            </div>
        </div>
        <article class="random-scene-creator__wrapper">
            <button class="main-btn" @click="getRandomConcepts(goal, obstacle, resolution)"> Generate Random Scene for a
                Story</button> <br>
            <div class="random-scene-creator__scenes" v-show="Array.isArray(randomStoryCreator)">
                <span>
                    Goal: {{ randomStoryCreator[0] }} <br>
                </span>
                <span>
                    Obstacle: {{ randomStoryCreator[1] }} <br>
                </span>
                <span>
                    Resolution: {{ randomStoryCreator[2] }} <br>
                </span>
            </div>
        </article>
    </section>
</template>

<script setup>
import { ref, computed } from "#imports";
import { useWrittenTextStore } from '@/stores/writtenText';

definePageMeta({
    middleware: ['get-theme']
})

const textStore = useWrittenTextStore()
const writtenText = ref("");
const isDarkTheme = ref(false);

const textSavedInStore = computed(() => {
    return textStore.$getText
})

const wordCount = computed(() => {
    if (writtenText) {
        return writtenText.value
            .replace(/[.,;:!/?"'@#$%¨&*()!+=_-]/g, "")
            .replaceAll("\n", " ")
            .split(" ")
            .filter((word) => word.length > 0).length;
    } else {
        return 0;
    }
});

function saveText() {
    textStore.saveToLocalStorage(writtenText.value)
}

function loadText() {
    const toLoadText = textStore.loadFromLocalStorage()
    writtenText.value = toLoadText
}

// USER STYLES ----------------------------------------

const fontFamily = ref('Noto Sans')
const fontSize = ref(14)
const isOptionsOpen = ref(false)

// Noto+Sans
const userStyles = ref({
    fontFamily: fontFamily.value,
    fontSize: `${fontSize.value}px`,
})

function applyStyles(styles) {
    userStyles.value = {
        fontFamily: styles[0].value,
        fontSize: `${styles[1].value}px`,
    }
}

function openOptions() {
    isOptionsOpen.value = !isOptionsOpen.value
}

// RANDOM SCENE GENERATOR ------------------------------------------------

const randomStoryCreator = ref('')

function getRandomConcepts(arr1, arr2, arr3) {
    function getRandomConcept(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const concept1 = getRandomConcept(arr1);
    const concept2 = getRandomConcept(arr2);
    const concept3 = getRandomConcept(arr3);

    randomStoryCreator.value = [concept1, concept2, concept3]
}

const goal = ["Want", "Desire", "Long for", "Need", "Think about", "Plan something", "Discuss", "Achieve something", "Hide something", "Confront", "Do harm", "Protect someone", "Seek revenge", "Escape", "Discover a secret", "Prove oneself", "Mystery", "Action", "Discover", "Hide", "Seek", "Escape", "Protect", "Reveal", "Confront", "Build", "Learn", "Follow", "Challenge", "Comfort", "Destroy", "Create", "Overcome", , "Find", "Pursue", "Defy", "Heal", "Explore", "Share", "Remember", "Reach", "Protect", "Discover"];

const obstacle = ["External opposition", "Internal conflict", "Misunderstanding", "Physical barrier", "Emotional turmoil", "Miscommunication", "Unforeseen complication", "Fear of exposure", "Competing interests", "Lack of resources", "Betrayal", "Conflicting goals", "Time constraint", "Environmental challenge", "Personal doubt", "Investigation", "Reaction", "An illusion", "A shadow", "A locked door", "A storm", "A ticking clock", "A secret", "An unexpected ally", "A shaky foundation", "A forgotten memory", "A misleading clue", "A powerful foe", "An open wound", "A reflection", "A missing piece", "A haunting voice", "A hidden message", "A fading light", "A locked gate", "A broken promise", "An endless horizon", "A guarded heart", "A distant echo", "A steep climb", "A fragile bond", "A web of lies", "A ticking bomb", "A threat of violence", "An uncomfortable setting or situation", "Disagreement between characters", "Clashing goals", "Unexpected arrival of another character", "Heightened stakes", "Any kind of surprise"];

const resolution = ["Good outcome", "Unexpected outcome", "Bad outcome", "Doubt", "Emotional transformation", "New insight", "Shift in power", "Relationship change", "Reversal of fortune", "Moral dilemma", "Surprising alliance", "Loss of trust", "Renewed hope", "Unintended consequences", "Deepened conflict", "Revelation", "Consequence", "A new perspective", "The truth is revealed", "A hidden path", "Calm after chaos", "Time slows down", "Trust is broken", "New alliances formed", "Stability achieved", "Knowledge gained", "The real path is shown", "Strength found", "Healing begins", "Self-awareness emerges", "Completion", "Silence", "Understanding achieved", "Clarity", "Freedom", "Forgiveness", "A boundary discovered", "Emotional connection", "Clarity", "A view from the top", "Trust deepens", "The truth uncovered", "Change"];

</script>

<style lang="scss" scoped>
.random-scene-creator {
    &__wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 350px;
        top: 50%;
        bottom: 50%;
        right: 30px;

        & button {
            background-color: var(--color3);
        }
    }

    &__scenes {
        padding: .8rem .8rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        background-color: var(--color3);
    }
}

.word-counter {
    &__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        background-color: var(--primary);
        color: var(--secondary);
        justify-content: center;
        align-items: flex-start;
        padding-top: 3rem;
    }

    &__content-wrapper {
        height: 80%;
    }

    &__cta-wrapper {
        display: flex;
        justify-content: space-between;
    }

    &__quantity-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__blur {
            height: 35px;
            width: 100px;
            opacity: 0.5;
            border-radius: 8px;
            filter: blur(8px);
            position: absolute;
            transform: translate(100px, -29px);
            padding-left: 0.4rem;
            display: flex;
            align-items: center;
            user-select: none;

            transition: 400ms;

            &:hover {
                opacity: 1;
                filter: blur(0px);
            }
        }
    }

    &__textarea {
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid transparent;
        min-width: 800px;
        height: calc(100% - 50px);
        background-color: var(--color3);
        outline: none;
        color: var(--color4);
        resize: horizontal;
        font-weight: 300;

        &:focus {
            border: 1px solid var(--color5);
        }

        &::placeholder {
            color: $n60;
            font-style: italic;
            font-weight: 300;
            opacity: 1;
        }

        &::selection {
            color: var(--primary);
            background-color: var(--color4);
        }
    }
}
</style>