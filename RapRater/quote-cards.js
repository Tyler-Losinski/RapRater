﻿/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, 
    Image
} from 'react-native';

import {
    Container, Icon, View, DeckSwiper, Card, CardItem,
    Thumbnail, Text, Left, Body, Grid, Right
} from 'native-base';
import SideBar from './main-menu';
import TopList from './top-list';

import io from 'socket.io-client/dist/socket.io';



export default class QuoteCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RapQuotes: [{
                Quote: '',
                Quotee:''
            }]
        };
        this.socket = io('http://134.129.126.29:3001',  { transports: ['websocket'] });

        this.socket.emit("get_quotes");

        this.swipeRight = this.swipeRight.bind(this);
        this.swipeLeft = this.swipeLeft.bind(this);

    }

    swipeRight(e) {
        this.socket.emit('upvote', e.ID)
    }

    swipeLeft(e) {
        this.socket.emit('downvote', e.ID)
    }

    componentDidMount() {
        this.socket.on('card_quotes', (data) => {
            this.setState({
                RapQuotes: data
            })
        })
    }

    render() {

        return (
            <Container >
                <View>
                    {this.state.RapQuotes[0].Quote != '' && 
                        <DeckSwiper
                        onSwipeRight={this.swipeRight}
                        onSwipeLeft={this.swipeLeft}
                            dataSource={this.state.RapQuotes}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text>Rap Quote </Text>
                                                <Text note>The Best</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem >
                                        <Body >
                                            <Text>{'"' + item.Quote + '"'}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                    <Icon name="md-quote" />
                                        <Text>{item.Quotee}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Image style={{ width: 50, height: 50 }}
                                                source={require('./img/red_x.png')}
                                            />
                                        </Left>
                                        <Right>
                                            <Image style={{ width: 50, height: 50 }}
                                                source={require('./img/green_thumb.png')}
                                            />
                                        </Right>
                                    </CardItem>
                                </Card>
                            }
                        />
                    }
            </View>
            </Container >
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

