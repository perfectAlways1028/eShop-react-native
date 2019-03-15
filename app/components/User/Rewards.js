import React, { Component } from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Spinner } from 'native-base';
import MainHeader from "./../Shared/MainHeader";
import RewardBlock from "./RewardBlock";
import { base, categories } from './../../assets/styles';

PAGE_TITLE = 'پیام ها';
export default class Rewards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rewards : [],
            page : 1,
            loading : false,
            refreshing : false
        }
    }

    componentWillMount() {
        this.setState(
            {
                rewards : [],
                page : 1,
                loading : false,
                refreshing : false
            }
        )
        this.getRewardRequest();
    }

    render() {
        return (
            <Container>
                <MainHeader title={PAGE_TITLE}  />
                <View style={{marginTop:10, height:150}}>
                <View style={[categories.box,{backgroundColor:'#f3f8f8'}]}>
                    <View style={{flex:1, flexDirection:'column'}}>
                    <Text  style={base.normalText}>
                        با معرفی اپلیکیشن خرید آسان پخش به دوستان و آشنایان خود می توانید اعتبار خرید رایگان به دست آورید.
                    </Text>
                        <Text  style={base.mediumText}>
                        همچنین آسان پخش به مناسبتهای مختلف به کاربران فعال خود اعتبار رایگان هدیه خواهد داد:
                    </Text>
                        <Text  style={base.normalText}>
                           کد معرف: <Text style={categories.billHeadingValue}>F54U90</Text>

                        </Text>
                        <View style={{backgroundColor:'#fff', position:'absolute', padding:5, width:40, height:40, zIndex:2, bottom:10, left:10, borderWidth:1, borderRadius:50, borderColor:'#969696' }}>
                            <TouchableOpacity >
                            <Icon name="md-share" style={{width:30, height:30, color:'#852c50'}}/>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>
                </View>
                <FlatList
                    data={this.state.rewards}
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
        return <RewardBlock reward={item}/>
    }

    handleRefresh() {
        this.setState({ page : 1 , refreshing : true } , () => {
            this.getRewardRequest();
        })
    }

    renderFooter() {
        if(!this.state.loading) return null;
        return <Spinner color="#ccc" size={"large"} />
    }

    handleLoadMore() {
        if(this.state.rewards.length > 0) {
            this.setState({page : this.state.page + 1 , loading : true}, () => {
                this.getRewardRequest()
            })
        }
    }

    getRewardRequest() {
        const { page } = this.state;
        fetch(`http://www.emzi.net/test/rewards.php?page=${page}`)
            .then(response => response.json())
            .then(json => {
                let rewards = json.data.data;
                if(rewards.length > 0) {
                    this.setState(prevState => {
                        return {
                            rewards : page === 1 ? rewards : [...prevState.rewards , ...rewards],
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