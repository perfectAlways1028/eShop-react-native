import React, { Component } from 'react';
import {FlatList, Dimensions} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Spinner } from 'native-base';
import VendorHeader from "./../Shared/VendorHeader";
import VendorOrderBlock from "./VendorOrderBlock";
import VendorLiveOrderBlock from "./VendorLiveOrderBlock";
const pageTitle = 'سفارشات در حال انتظار...';

export default class VendorOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            page : 1,
            loading : false,
            refreshing : false
        }
    }

    componentWillMount() {
        this.setState(
            {
                orders : [],
                page : 1,
                loading : false,
                refreshing : false
            }
        )
        this.getOrderRequest();
    }

    render() {
        return (
            <Container>
                <VendorHeader title={pageTitle}  />
                <FlatList
                    data={this.state.orders}
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
        return <VendorLiveOrderBlock order={item}/>
    }

    handleRefresh() {
        this.setState({ page : 1 , refreshing : true } , () => {
            this.getOrderRequest();
        })
    }

    renderFooter() {
        if(!this.state.loading) return null;
        return <Spinner color="#ccc" size={"large"} />
    }

    handleLoadMore() {
        if(this.state.orders.length > 0) {
            this.setState({page : this.state.page + 1 , loading : true}, () => {
                this.getOrderRequest()
            })
        }
    }

    getOrderRequest() {
        const { page } = this.state;
        fetch(`http://www.emzi.net/test/orders.php?page=${page}`)
            .then(response => response.json())
            .then(json => {
                let orders = json.data.data;
                if(orders.length > 0) {
                    this.setState(prevState => {
                        return {
                            orders : page === 1 ? orders : [...prevState.orders , ...orders],
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