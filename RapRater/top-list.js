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
    Container, Icon, ListItem, List, Right,
    Thumbnail, Text, Left, Body, Grid, Content
} from 'native-base';
import SideBar from './main-menu';

import RapQuotes from './RapQuotes.json'
import io from 'socket.io-client/dist/socket.io';


export default class TopLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RapQuotes: [{
                Quote: '',
                Quotee: ''
            }]
        };
        this.socket = io('http://134.129.126.29:3001', { transports: ['websocket'] });
        this.socket.emit('get_quotes_list');
    }

    componentDidMount() {
        this.socket.on('list_quotes', (data) => {
            this.setState({
                RapQuotes: data
            })
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.RapQuotes[0].Quote != '' &&
                        <List dataArray={this.state.RapQuotes}
                            renderRow={(item) =>
                                <ListItem>
                                <Body>
                                    <Left><Text>{'"' + item.Quote + '"'}</Text></Left>
                                    <Text note>{item.Quotee} <Icon name="ios-thumbs-up" />{item.Votes}</Text>
                                    </Body>
                                </ListItem>
                            }>
                        </List>
                    }
                </Content>
            </Container>
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

