import React, { Component } from 'react';
import {FlatList, Dimensions} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Spinner } from 'native-base';
import MainHeader from "./../Shared/MainHeader";
import TransactionBlock from "./TransactionBlock";

const pageTitle = 'گردش حساب';
export default class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions : [],
            page : 1,
            loading : false,
            refreshing : false
        }
    }

    componentWillMount() {
        this.setState(
            {
                transactions : [],
                page : 1,
                loading : false,
                refreshing : false
            }
        )
        this.getTransactionRequest();
    }

    render() {
        return (
            <Container>
                <FlatList
                    data={this.state.transactions}
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
        return <TransactionBlock transaction={item}/>
    }

    handleRefresh() {
        this.setState({ page : 1 , refreshing : true } , () => {
            this.getTransactionRequest();
        })
    }

    renderFooter() {
        if(!this.state.loading) return null;
        return <Spinner color="#ccc" size={"large"} />
    }

    handleLoadMore() {
        if(this.state.transactions.length > 0) {
            this.setState({page : this.state.page + 1 , loading : true}, () => {
                this.getTransactionRequest()
            })
        }
    }

    getTransactionRequest() {
        const { page } = this.state;
        fetch(`http://www.emzi.net/test/transactions.php?page=${page}`)
            .then(response => response.json())
            .then(json => {
                let transactions = json.data.data;
                if(transactions.length > 0) {
                    this.setState(prevState => {
                        return {
                            transactions : page === 1 ? transactions : [...prevState.transactions , ...transactions],
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