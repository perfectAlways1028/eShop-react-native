import React, { Component } from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Spinner } from 'native-base';
import MainHeader from "./../Shared/MainHeader";
import NotificationBlock from "./NotificationBlock";
import { base, categories } from './../../assets/styles';

const pageTitle = 'پیام ها';
export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications : [],
            page : 1,
            loading : false,
            refreshing : false
        }
    }

    componentWillMount() {
        this.setState(
            {
                notifications : [],
                page : 1,
                loading : false,
                refreshing : false
            }
        )
        this.getNotificationRequest();
    }

    render() {
        return (
            <Container>
                <MainHeader title={pageTitle}  />

                <FlatList
                    data={this.state.notifications}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Spinner  />}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh.bind(this)}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.5}
                    numColumns = {1}
                />
            </Container>
        )
    }

    renderItem({ item }) {
        return <NotificationBlock notification={item}/>
    }

    handleRefresh() {
        this.setState({ page : 1 , refreshing : true } , () => {
            this.getNotificationRequest();
        })
    }

    renderFooter() {
        if(!this.state.loading) return null;
        return <Spinner color="#ccc" size={"large"} />
    }

    handleLoadMore() {
        if(this.state.notifications.length > 0) {
            this.setState({page : this.state.page + 1 , loading : true}, () => {
                this.getNotificationRequest()
            })
        }
    }

    getNotificationRequest() {
        const { page } = this.state;
        fetch(`http://www.emzi.net/test/notifications.php?page=${page}`)
            .then(response => response.json())
            .then(json => {
                let notifications = json.data.data;
                if(notifications.length > 0) {
                    this.setState(prevState => {
                        return {
                            notifications : page === 1 ? notifications : [...prevState.notifications , ...notifications],
                            page : json.data.current_page,
                            refreshing : false
                        }
                    })
                }

                this.setState({ loading : false})
            })
            .catch(error => console.log(error))
    }

}