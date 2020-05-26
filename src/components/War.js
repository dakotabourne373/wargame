import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

export default class War extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate() {

    }

    compareCards = (player, bot) => {
        if (player > bot) {
            this.props.updateDeck(player, bot, true);
            this.props.pop()
        } else if (player === bot) {
            this.war(player, bot)
        } else {
            this.props.updateDeck(bot, player, false);
            this.props.pop();
        }
    }

    war = (card1, card2) => {
        let warring = true;
        let arr = [card1, card2];
        let index = 5;
        while (warring) {
            let playerCard = this.props.player[this.props.player.length - index];
            let botCard = this.props.bot[this.props.bot.length - index];
            console.log("player: " + playerCard);
            console.log("bot: " + botCard);
            if (playerCard > botCard) {
                console.log("player won")
                this.warHelper(arr, true, index);
                warring = false;
            } else if (playerCard === botCard) {
                console.log("tie")
                index += 4;
            } else {
                console.log("bot won")
                this.warHelper(arr, false, index);
                warring = false;
            }
        }
    }

    warHelper = (arr, playerWon, index) => {
        console.log("Given Array " + arr)
        let playerDeck = this.props.player;
        console.log("Player Deck " + playerDeck)
        let botDeck = this.props.bot;
        console.log("Bot Deck " + botDeck)
        for (let i = index; i > 1; i--) {
            arr.push(playerDeck[playerDeck.length - i]);
            arr.push(botDeck[botDeck.length - i]);
        }
        console.log("Returning array" + arr)
        for (let i = index; i > 0; i--)
            this.props.pop();
        this.props.warUpdate(arr, playerWon);
    }

    handleNewGame = () => {
        this.props.newGame()
    }

    handlePlaceCard = () => {
        let playerCard = this.props.player[this.props.player.length - 1];
        let botCard = this.props.bot[this.props.bot.length - 1];
        this.compareCards(playerCard, botCard)
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.handleNewGame()}> New Game</Button>
                <Button onClick={() => this.handlePlaceCard()}> Place Card Down!</Button>
            </div>

        );
    }


}