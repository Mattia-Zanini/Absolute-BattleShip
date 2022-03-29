<template>
    <div>
        <fork-me-component></fork-me-component>
        <div class="title">
            <h1 class="title__main">Battleship</h1>
            <h3 class="title__small">Place your ships and battle against the computer</h3>
        </div>
        <rules-component></rules-component>
        <div class="row" v-if="gameOver">
            <button @click="newGame" class="new-game">New Game</button>
        </div>
        <div class="container">
            <div class="side side--human">
                <div class="aside">
                    <div class="ships ships--human">
                        <div
                            v-for="ship in ships"
                            @click="selectShip(ship)"
                            :key="ship.id"
                            class="ships__unit"
                            :class="[`ships__unit--${ship.length}`, {'ships__unit--unavailable': ship.human.isReady }, { 'ships__unit--sinked': ship.computer.isSinked}, { 'ships__unit--not-hoverable': isPlaying}]"
                        >{{ ship.name }}</div>
                    </div>
                    <div class="cta" v-if="!isPlaying">
                        <button
                            class="cta__button"
                            :disabled="!selectedShip"
                            :class="{ 'cta__button--disabled': !selectedShip, 'cta__button--animated': selectedShip }"
                            @click="changeShipDirection"
                        >Change ship direction</button>
                        <button class="cta__button" @click="placeShipsRandom">Place ships randomly</button>
                        <button
                            class="cta__button"
                            :disabled="!isPlayerReady"
                            :class="{ 'cta__button--disabled': !isPlayerReady, 'cta__button--animated': isPlayerReady }"
                            @click="startGame"
                        >Start game</button>
                    </div>
                </div>
                <div class="grid grid--human">
                    <div
                        v-for="cell in grid"
                        :key="cell.id"
                        @mouseover="moveShipOnGrid({x: cell.x, y: cell.y})"
                        @mouseout="removeShipHoverState"
                        @click="addShipIdToGrid({x: cell.x, y: cell.y}, grid)"
                        class="grid__cell"
                        :class="{ 'grid__cell--hit': cell.hit, 'grid__cell--placed': !cell.isEmpty && !cell.hit, 'grid__cell--highlighted': cell.isHovered, 'grid__cell--missed': cell.missed, 'grid__cell--sinked': cell.isSinked}"
                    ></div>
                </div>
            </div>
            <transition name="slide">
                <div v-show="isPlaying && AIGrid.length > 0" class="side side--computer">
                    <div class="grid grid--computer">
                        <div
                            v-for="cell in AIGrid"
                            :key="cell.id"
                            @click="attackShip({x: cell.x, y: cell.y})"
                            class="grid__cell"
                            :class="{ 'grid__cell--hit': cell.hit, 'grid__cell--missed': cell.missed, 'grid__cell--sinked': cell.isSinked }"
                        ></div>
                    </div>
                    <div class="aside">
                        <div class="ships ships--computer">
                            <div
                                v-for="ship in ships"
                                @click="selectShip(ship)"
                                :key="ship.id"
                                class="ships__unit"
                                :class="[`ships__unit--${ship.length}`, {'ships__unit--sinked': ship.human.isSinked }, { 'ships__unit--not-hoverable': isPlaying}]"
                            >{{ ship.name }}</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <modal-component @closeModal="isModalOpen = false" :isModalOpen="isModalOpen">
            <div class="popup">
                <h3 class="popup__title">{{ popup.title }}</h3>
                <p class="popup__text">{{ popup.text }}</p>
                <p class="popup__text">Feel like trying again ?</p>
                <button @click="newGame" class="popup__cta">New Game</button>
            </div>
        </modal-component>
    </div>
</template>

<script>
import ModalComponent from "./components/ModalComponent";
import ForkMeComponent from "./components/ForkMeComponent";
import RulesComponent from "./components/RulesComponent";
import shipsList from "./assets/js/ships";
export default {
    components: { ModalComponent, ForkMeComponent, RulesComponent },
    data() {
        return {
            isModalOpen: false,
            popup: {},
            isPlaying: false,
            gameOver: false,
            gridSize: 10,
            ships: shipsList,
            firstTarget: "",
            secondTarget: "",
            grid: [],
            AIGrid: []
        };
    },
    computed: {
        isPlayerReady() {
            return this.ships.every(ship => ship.human.isReady);
        },
        selectedShip() {
            return this.ships.find(ship => ship.isSelected);
        }
    },
    methods: {
        attackShip(coordinates) {
            if (this.gameOver) return
            // retrieve the clicked cell
            const cell = this.AIGrid.find(
                cell => cell.x === coordinates.x && cell.y === coordinates.y
            );
            // retrieve the ship on the clicked cell
            const ship = this.ships[cell.shipId];
            if (cell.isEmpty && !cell.missed) {
                cell.missed = true;
            } else if (cell.hit || cell.missed) {
                return;
            } else {
                cell.hit = true;
                ship.human.hitCounter += 1;
                // check if the ship is sinked
                if (ship.length === ship.human.hitCounter) {
                    ship.human.isSinked = true;
                    this.setShipSink(this.AIGrid, ship)
                }
                // check if all ships are sinked
                if (this.ships.every(ship => ship.human.isSinked)) {
                    this.gameOver = true
                    this.popup.title = "congratulations!";
                    this.popup.text = "You won";
                    return (this.isModalOpen = true);
                }
            }
            setTimeout(() => {
                // wait 0,2s for the AI to attack, feels more natural
                this.AIAttack();
            }, 200);
        },
        AIAttack(skip = false) {
            if (this.gameOver) return

            // generate random numbers for the attack
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);

            // retrieve the cell based on the random generated numbers
            let cell = this.grid.find(
                cell => cell.x === randomX && cell.y === randomY
            );

            if (!this.firstTarget && !skip) {
                // if all cells are surrounded by at least one missed cell
                // relaunch this method but skip this part
                const areCellsMissed = this.getAdjacentCells(randomX, randomY).every(target => target.missed)
                if (areCellsMissed) return this.AIAttack(true);

                // avoid hitting a cell next to a missed one
                const isNextToMissed = this.getAdjacentCells(randomX, randomY).some(target => target.missed)
                if (isNextToMissed) return this.AIAttack();
            }

            // check if there is any cells with a potential ship and select one randomly
            if (this.firstTarget && this.grid.some(cell => cell.prob === 1)) {
                const cells = this.grid.filter(cell => cell.prob === 1);
                const randomCell = Math.floor(Math.random() * cells.length);
                cell = cells[randomCell];
                randomX = cell.x;
                randomY = cell.y;
            }

            if (cell.isEmpty && !cell.missed) {
                cell.prob = 0;
                return (cell.missed = true);
            } else if (cell.missed || cell.hit) {
                return this.AIAttack();
            }

            cell.hit = true;
            const ship = this.ships[cell.shipId];
            ship.computer.hitCounter += 1;

            // if the computer hits another ship next to the first target
            // save the coordinates to attack after the current ship is sinked
            if (this.firstTarget && this.firstTarget.shipId !== cell.shipId) {
                this.secondTarget = cell;
            }

            cell.prob = 0;
            // add probability to the adjacents cells for next attacks
            this.getAdjacentCells(randomX, randomY).forEach(target => {
                if (!target.hit && !target.missed) {
                    target.prob = 1;
                }
            });

            // if the ships ID is different than the one currently under attack
            // add probability*2 to the adjacents cells for next attacks
            if (this.firstTarget && cell.shipId !== this.firstTarget.shipId) {
                this.getAdjacentCells(randomX, randomY).forEach(target => {
                    if (!target.hit && !target.missed) {
                        target.prob = 2;
                    }
                });
            }
            // reset cells porbability
            if (this.firstTarget && !this.secondTarget) {
                if (this.firstTarget.x === cell.x) {
                    this.grid
                        .filter(
                            target => target.prob === 1 && target.x !== cell.x
                        )
                        .forEach(target => (target.prob = 0));
                } else if (this.firstTarget.y === cell.y) {
                    this.grid
                        .filter(
                            target => target.prob === 1 && target.y !== cell.y
                        )
                        .forEach(target => (target.prob = 0));
                }
            }
            // record the coordinates and the ship ID for the next attack
            if (!this.firstTarget) {
                this.firstTarget = cell;
            }
            // check if the ship is sinked
            if (ship.length === ship.computer.hitCounter) {
                ship.computer.isSinked = true;
                this.setShipSink(this.grid, ship)
                // if there is no second target, the next attack will be a random one
                if (this.secondTarget) {
                    this.firstTarget = this.secondTarget;
                    this.secondTarget = "";
                    this.grid
                        .filter(cell => cell.prob === 1)
                        .forEach(cell => (cell.prob = 0));
                    this.grid
                        .filter(cell => cell.prob === 2)
                        .forEach(cell => (cell.prob = 1));
                } else {
                    this.firstTarget = "";
                    this.grid.forEach(cell => (cell.prob = 0));
                }
            }

            // check if all ships are sinked then display the modal
            if (this.ships.every(ship => ship.computer.isSinked)) {
                this.gameOver = true
                this.popup.title = "oops!";
                this.popup.text = "You lost";
                return (this.isModalOpen = true);
            }
        },
        // get all cells surrounding the one passed as parameter
        getAdjacentCells(x, y) {
            return this.grid.filter(
                target =>
                    (target.y === y &&
                        (target.x === x + 1 || target.x === x - 1)) ||
                    (target.x === x &&
                        (target.y === y + 1 || target.y === y - 1))
            );
        },
        setShipSink(grid, ship) {
            grid.filter(cell => cell.shipId === ship.id).forEach(cell => cell.isSinked = true)
        },
        addShipIdToGrid(coordinates, grid) {
            if (!this.selectedShip) return;

            //   check if the ship exceeds the grid limit
            if (this.isShipTooLong(coordinates, this.selectedShip)) return;

            // check if there is already a ship in the selected area
            if (this.areCellsEmpty(grid, coordinates, this.selectedShip))
                return;

            this.getSelectedCells(grid, coordinates, this.selectedShip).forEach(
                cell => {
                    cell.isEmpty = false;
                    cell.shipId = this.selectedShip.id;
                }
            );
            this.ships[this.selectedShip.id].human.isReady = true;
            this.selectedShip.isSelected = false;
        },
        removeShipHoverState() {
            this.grid.forEach(cell => (cell.isHovered = false));
        },
        moveShipOnGrid(coordinates) {
            if (!this.selectedShip) return;

            //   check if the ship exceeds the grid limit
            if (this.isShipTooLong(coordinates, this.selectedShip)) return;

            // check if there is already a ship in the hover area
            if (this.areCellsEmpty(this.grid, coordinates, this.selectedShip))
                return;

            this.getSelectedCells(
                this.grid,
                coordinates,
                this.selectedShip
            ).forEach(cell => (cell.isHovered = true));
        },
        isShipTooLong(coordinates, ship) {
            return (
                (!ship.isVertical ? coordinates.x : coordinates.y) +
                    ship.length >
                10
            );
        },
        areCellsEmpty(grid, coordinates, ship) {
            return grid.some(
                cell =>
                    (!ship.isVertical ? cell.y : cell.x) ===
                        (!ship.isVertical ? coordinates.y : coordinates.x) &&
                    (!ship.isVertical ? cell.x : cell.y) >=
                        (!ship.isVertical ? coordinates.x : coordinates.y) &&
                    (!ship.isVertical ? cell.x : cell.y) <
                        (!ship.isVertical ? coordinates.x : coordinates.y) +
                            ship.length &&
                    !cell.isEmpty
            );
        },
        getSelectedCells(grid, coordinates, ship) {
            return grid.filter(
                cell =>
                    (!ship.isVertical ? cell.y : cell.x) ===
                        (!ship.isVertical ? coordinates.y : coordinates.x) &&
                    (!ship.isVertical ? cell.x : cell.y) >=
                        (!ship.isVertical ? coordinates.x : coordinates.y) &&
                    (!ship.isVertical ? cell.x : cell.y) <
                        (!ship.isVertical ? coordinates.x : coordinates.y) +
                            ship.length
            );
        },
        placeShipsRandom() {
            this.grid.forEach(cell => {
                cell.shipId = null
                cell.isEmpty = true
            });
            this.ships.forEach(ship => (ship.human.isReady = false));
            this.generateRandomCoordinates(this.grid);
        },
        generateRandomCoordinates(grid) {
            this.ships.forEach(ship => {
                if (ship.human.isReady) return;
                const isVertical = Math.round(Math.random());
                let randomX, randomY;
                if (!isVertical) {
                    randomX = Math.floor(Math.random() * (10 - ship.length));
                    randomY = Math.floor(Math.random() * 10);
                } else {
                    randomX = Math.floor(Math.random() * 10);
                    randomY = Math.floor(Math.random() * (10 - ship.length));
                }
                ship.isVertical = isVertical;
                ship.isSelected = true;
                this.addShipIdToGrid({ x: randomX, y: randomY }, grid);
                if (!ship.human.isReady) this.generateRandomCoordinates(grid);
            });
        },
        selectShip(ship) {
            if (this.isPlaying) return;
            if (!ship.human.isReady) {
                this.ships.forEach(ship => (ship.isSelected = false));
                ship.isSelected = true;
            }
        },
        changeShipDirection() {
            if (this.selectedShip)
                this.selectedShip.isVertical = !this.selectedShip.isVertical;
        },
        startGame() {
            this.isPlaying = true;
            this.createAIGrid();
            this.placeAIShips();
        },
        placeAIShips() {
            this.ships.forEach(ship => (ship.human.isReady = false));
            this.generateRandomCoordinates(this.AIGrid);
            this.ships.forEach(ship => (ship.human.isReady = false));
        },
        createGrid(grid = this.grid) {
            let id = 1;
            for (let y = 0; y < this.gridSize; y++) {
                for (let x = 0; x < this.gridSize; x++) {
                    grid.push({
                        id: id++,
                        x: x,
                        y: y,
                        hit: false,
                        isEmpty: true,
                        isHovered: false,
                        missed: false
                    });
                }
            }
        },
        createAIGrid() {
            this.createGrid(this.AIGrid);
        },
        newGame() {
            this.isModalOpen = false;
            this.gameOver = false;
            this.resetGame();
            this.createGrid();
        },
        resetGame() {
            this.isPlaying = false;
            this.grid = [];
            this.AIGrid = [];
            this.firstTarget = "";
            this.ships.forEach(ship => {
                ship.human.isSinked = false;
                ship.human.hitCounter = 0;
                ship.human.isReady = false;
                ship.computer.isSinked = false;
                ship.computer.hitCounter = 0;
            });
        },
    },
    created() {
        this.createGrid();
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500|Audiowide");
@import url("https://fonts.googleapis.com/css?family=Audiowide|Bungee+Inline");
@import "./assets/scss/mixins.scss";
@import "./assets/scss/variables.scss";
@import "./assets/scss/animations.scss";

:root {
    --cell-width: 2.5vw;
    @include screen(medium) {
        --cell-width: 3vw;
    }
    @include screen(small) {
        --cell-width: 4vw;
    }
    @include screen(xs) {
        --cell-width: 6vw;
    }
}

* {
    padding: 0;
    margin: 0;
}

body,
html {
    height: 100%;
}

body {
    position: relative;
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
    overflow-x: hidden;
    background-color: #333333;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%232685ff'/%3E%3Cstop offset='1' stop-color='%23333333'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23fdfff2' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23fdfff2' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.container {
    height: 100%;
    @include flexCenter(center);
    @include screen(small) {
        display: block;
    }
}

.row {
    @include flexCenter(center, center);
}

.title {
    text-align: center;
    text-transform: uppercase;
    padding: 2.5vw 0;

    &__main {
        font-family: "Audiowide", cursive;
        font-size: 2.5rem;
        margin-bottom: 0.8rem;

        @include screen(medium) {
            font-size: 2.2rem;
        }

        @include screen (xs) {
            font-size: 1.8rem;
        }

        @include screen (xxs) {
            font-size: 1.6rem;
        }

        &::after {
            @include hbar(whitesmoke, 30%, 0.2rem, 0.3);
            @include screen (xs) {
                @include hbar(whitesmoke, 30%, .5rem, 0.3);
            }
        }
    }
    &__small {
        font-weight: 300;

        @include screen(medium) {
            font-size: 1rem;
        }

        @include screen (xs) {
            font-size: .9rem;
        }
        @include screen (xxs) {
            font-size: .8rem;
            margin-bottom: .5rem;
        }
    }
}

.side {
    margin-top: 2.5vw;
    @include flexCenter(flex-start, center);
    flex-basis: 50vw;
    @include screen(small) {
        flex-basis: 0;
    }
    &--computer {
        @include screen(small) {
            flex-direction: row-reverse;
        }
    }
    &--human {
        @include screen(small) {
            margin-bottom: 1rem;
        }
    }
}

.cta {
    @include flexCenter(center, center, column);

    &__button {
        font-weight: 500;
        cursor: pointer;
        border: none;
        padding: 1rem 1.5rem;
        background-color: $red-button;
        border-radius: 3px;
        color: whitesmoke;
        transition: all 0.3s ease-in-out;
        outline: none;
        font-size: 0.9rem;
        opacity: 0.95;

        @include screen(large) {
            padding: 0.8rem 0.6rem;
            border-radius: 2px;
            font-size: 0.8rem;
        }

        @include screen(medium) {
            padding: 0.5rem 0.3rem;
            font-size: 0.7rem;
        }

        @include screen(small) {
            padding: 0.6rem 0.5rem;
            font-size: 0.8rem;
            width: 16vw;
        }

        @include screen(xs) {
            padding: 0.5rem 0.5rem;
            font-size: 0.7rem;
            width: 16vw;
        }

        @include screen(xxs) {
            padding: 0.5rem 0.3rem;
            width: 20vw;
        }

        &:hover:not(&--disabled) {
            transform: translateY(-2px);
            background-color: darken($red-button, 10%);
        }

        &--disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &--animated {
            animation: scaleUp 1s infinite;
        }

        &:active {
            transform: translateY(1px);
        }

        &:not(:last-of-type) {
            margin-bottom: 0.8rem;

            @include screen(large) {
                margin-bottom: 0.6rem;
            }

            @include screen(medium) {
                margin-bottom: 0.5rem;
            }
        }
    }
}
.aside {
    @include flexCenter(center, flex-start, column);
    color: whitesmoke;
}

.ships {
    @include flexCenter(flex-start, flex-start, column);
    font-size: 0.9rem;

    &--human {
        align-items: flex-end;
        margin-bottom: 1vw;
        padding-right: 1vw;
    }

    &--computer {
        align-items: flex-start;
        padding-left: 1vw;
        @include screen(small) {
            align-items: flex-end;
            padding-right: 1vw;
            padding-left: 0;
        }
    }
    &__unit {
        position: relative;
        @include flexCenter(center, center);
        margin: 0.2rem 0;
        background-color: darken($grey, 20%);
        height: var(--cell-width);
        border-radius: 1rem;
        user-select: none;
        transition: all 0.2s ease-in-out;

        @include screen(large) {
            font-size: 0.85rem;
        }

        @include screen(medium) {
            font-size: 0.75rem;
        }

        &--unavailable {
            opacity: 0.5;
        }

        &--sinked {
            background-color: darken($red, 10%);
            text-decoration: line-through;
        }

        &:hover:not(&--unavailable):not(&--not-hoverable) {
            cursor: pointer;
            background-color: darken($grey, 10%);
            transform: translateX(0.2rem);
        }

        @for $i from 2 through $ship-count {
            &--#{$i} {
                width: 2.5vw * $i;
                @include screen (medium) {
                    width: 3vw * $i;
                }
                @include screen(small) {
                    width: 10vw;
                }
                @include screen(xs) {
                    width: 14vw;
                }
                @include screen(xxs) {
                    width: 18vw;
                }
            }
        }
    }
}
.grid {
    width: calc(var(--cell-width) * 10);
    height: calc(var(--cell-width) * 10);
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-gap: 3px;
    border-radius: 1%;

    @include screen(small) {
        margin-left: 1rem;
    }

    &--human {
        border: 3px $blue solid;
        background-color: $blue;

        & .grid__cell {
            cursor: default;
        }
    }

    &--computer {
        background-color: $grey;
        border: 3px $grey solid;

        & .grid__cell:hover:not(.grid__cell--hit):not(.grid__cell--missed) {
            background-color: darken($grey, 20%);
        }
    }

    &__cell {
        @include flexCenter(center, center);
        cursor: pointer;
        background-color: whitesmoke;
        width: 95%;
        height: 95%;
        border-radius: 50%;
        transition: all 0.2s ease-in-out;

        &--hit {
            background-color: lighten($red, 3%);
            cursor: not-allowed;
        }

        &--highlighted {
            background-color: $grey;
        }

        &--missed {
            background-color: transparent;
            cursor: not-allowed;
        }

        &--sinked {
            background-color: darken($red, 10%);
        }

        &--placed {
            background-color: darken($grey, 20%);
        }
    }
}

.popup {
    background-color: whitesmoke;
    padding: 2rem 3.5rem;
    border-radius: 0.5rem;
    @include flexCenter(center, center, column);
    color: darken($grey, 30%);

    &__title {
        text-transform: uppercase;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 300;

        &::after {
            @include hbar($grey, 80%, 0.5rem);
        }
    }

    &__cta {
        margin-top: 1.3rem;
        border: none;
        background-color: $blue;
        color: whitesmoke;
        padding: 0.8rem 1.2rem;
        border-radius: 0.3rem;
        text-transform: uppercase;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        outline: none;

        &:hover {
            background-color: darken($blue, 10%);
            transform: translateY(-2px);
        }
    }
}

.slide-enter-active {
    overflow: hidden;
    animation: slideRight 0.8s;
    @include screen(small) {
        animation: slideUp 0.8s;
    }
}
.new-game {
    margin-top: 1rem;
    color: whitesmoke;
    letter-spacing: .1rem;
    font-size: 1rem;
    border: none;
    padding: 1rem .8rem;
    text-transform: uppercase;
    border-radius: .3rem;
    background-color: $blue;
    transition: all .3s ease-in-out;
    outline: none;
    cursor: pointer;

    &:hover {
        transform: scale(1.05) translateY(.3rem);
    }

    &:active {
        transform: scale(.95) translateY(-.3rem);
    }
}
</style>
