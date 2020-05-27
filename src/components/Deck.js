import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import War from './War';


export default class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: [],
            bot: [],
        }
    }

    componentDidMount() {
    }

    popPlayerDecks = () => {
        let play = this.state.player;
        let botDeck = this.state.bot;
        play.pop()
        botDeck.pop()
        this.setState({ player: play, bot: botDeck });
    }

    warUpdate = (arr, playerWon) => {
        if (playerWon) {
            let playerDeck = this.state.player;
            for (let i = 0; i < arr.length; i++)
                playerDeck.unshift(arr[i]);
            this.setState({ player: playerDeck });
        } else {
            let botDeck = this.state.bot;
            for (let i = 0; i < arr.length; i++)
                botDeck.unshift(arr[i]);
            this.setState({ bot: botDeck });
        }
    }

    updateDecks = (value1, value2, playerWon) => {
        if (playerWon) {
            let playerDeck = this.state.player;
            playerDeck.unshift(value1, value2);
            this.setState({ player: playerDeck });
        } else {
            let botDeck = this.state.bot;
            botDeck.unshift(value1, value2);
            this.setState({ player: botDeck });
        }
    }

    generateNewDeck = () => {
        let arr = []
        for (let i = 1; i <= 13; i++)
            for (let j = 0; j < 4; j++)
                arr.push(i);
        arr = this.shuffle(arr)
        this.setState({ player: arr.slice(0, 26), bot: arr.slice(26, 53) });
    }

    shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {
        return (
            <div>
                <War newGame={this.generateNewDeck} player={this.state.player} bot={this.state.bot} pop={this.popPlayerDecks} updateDeck={this.updateDecks} warUpdate={this.warUpdate} />
                <div>
                    Player:
                    {this.state.player.map(card => {
                    return <CardBody value={card} />
                })}
                    Bot:
                    {this.state.bot.map(card => {
                    return <CardBody value={card} />
                })}
                </div>
            </div >
        );
    }

}

function CardBody(props) {

    return (
        <Card variant='danger' border='primary'>
            <Card.Body>{props.value}</Card.Body>
        </Card>
    );
}