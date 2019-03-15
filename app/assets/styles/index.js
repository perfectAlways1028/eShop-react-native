import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform, PixelRatio } from 'react-native';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on galaxy S6 device
const scale =  SCREEN_WIDTH / 360;

const halfSize = SCREEN_WIDTH / 2;
const oneThird = SCREEN_WIDTH / 3;
const oneFourth = SCREEN_WIDTH / 4;
const oneFifth = SCREEN_WIDTH / 5;

let size_scale = scale;

if (scale > 2) {
    size_scale = scale * 0.666;
}

export function normalize(size) {

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size_scale * size)) + 2;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size_scale * size))
  }
}

export const form = EStyleSheet.create({
    StyleForm : {
        padding: normalize(20)
    },
    item : {
        borderRadius : normalize(5),
        marginBottom:normalize(10),
        paddingRight:normalize(5),
        paddingLeft: normalize(5),
        height:normalize(40),
        backgroundColor: '$inputBoxBgColor',
        borderColor:'$inputBoxBorder',
    },
    textArea : {
        borderRadius : normalize(5),
        marginBottom:normalize(10),
        paddingRight:normalize(5),
        paddingLeft: normalize(5),
        backgroundColor: '$inputBoxBgColor',
        borderColor:'$inputBoxBorder',
        borderWidth:1,
        textAlignVertical: 'top',

    },
    listItem: {
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row',
    },
    radioButton:{
        color:'$primaryColor'
    },
    input : {
        fontFamily: '$IS',
        fontSize:normalize(12),
        color: '$inputBoxColor'
    },
    itemCode : {
        justifyContent:'center',  

        borderRadius : normalize(5),
        marginBottom:normalize(10),
        paddingRight:normalize(50),
        paddingLeft: normalize(50),
        height:normalize(40),
        backgroundColor: '$inputBoxBgColor',
        borderColor:'$inputBoxBorder',
        
        marginLeft:50,
        marginRight:50,
    },
    inputCode : {
        fontFamily: '$IS',
        textAlign:'center',
        width:normalize(100),
        fontSize:normalize(24),
        color: '$inputBoxColor',
        // backgroundColor:'#efefef',
        // borderWidth:1,
        // borderColor:'#ddd',
        // borderRadius:normalize(5),
        // margin:normalize(24)
    },
    submitButton : {
        borderRadius: normalize(5),
        backgroundColor: '$primaryColor'
    },
    submitText : {
        fontSize : normalize(16),
        padding: normalize(5),
        fontFamily : '$IS'
    },

    genderView: {
        flexDirection: 'row',
        marginBottom: normalize(10)
    },
    genderButtonOff : {
        borderRadius: normalize(5),
        backgroundColor: '$primaryColor',
        flex: 1,
        marginLeft: normalize(30),
        marginRight: normalize(30)
    },
    genderButtonOn : {
        borderRadius: normalize(5),
        borderColor: '$primaryColor',
        backgroundColor: '#D57CA0',
        flex: 1,
        marginLeft: normalize(30),
        marginRight: normalize(30)
    },
    genderText : {
        fontSize : normalize(14),
        padding: normalize(5),
        color:'$darkGrayColor',
        fontFamily : '$IS'
    },

    invalid:{
        borderWidth:1,
        borderColor:'$redColor',
    },
    error : {
        fontFamily : '$IS',
        fontSize:normalize(12) ,
        color : '$redColor',
        marginBottom: normalize(10)
    },
    success : {
        fontFamily : '$IS',
        fontSize:normalize(12) ,
        color : '$greenColor',
        marginBottom: normalize(10),
    }

});

export const index = EStyleSheet.create({
    splashContainer : {
        flex: 1 ,
        justifyContent: 'center' ,
        alignItems: 'center' ,
        backgroundColor : '#852c50'
    },
    splashText : {
        color : 'white',
        fontSize : normalize(18),
        fontFamily : '$IS'
    }
});

export const base = EStyleSheet.create({
    largeText: {
        fontFamily: '$IS',
        fontSize: normalize(16),
        color: '$blackColor'
    },
    normalText: {
        fontFamily: '$IS',
        fontSize: normalize(14),
        color: '$grayColor'
    },

    mediumText: {
        fontFamily: '$IS',
        fontSize: normalize(12),
        color: '$grayColor'
    },

    mediumSmallerText: {
        fontFamily: '$IS',
        fontSize: normalize(11),
        color: '$grayColor'
    },

    boldPrimary: {
        fontFamily: '$ISB',
        fontSize: normalize(14),
        color: '$primaryColor',
        textAlign: 'right'
    },

    linkedText: {
        fontFamily: '$IS',
        fontSize: normalize(12),
        color: '$primaryColor'
    },

    menuText: {
        fontSize : normalize(16),
        padding:normalize(8),
        color : '#fff',
        fontFamily: '$IS',
    },
    menuTextSmall: {
        fontSize : normalize(13),
        padding:normalize(8),
        color : '#fff',
        fontFamily: '$IS',
    },
    smallText: {
        fontFamily:'$IS',
        fontSize:normalize(10),
        color:'$grayColor'
    },

    tinyText: {
        fontFamily:'$IS',
        fontSize:normalize(8),
        color:'$lightGrayColor'
    },

    smallLink: {
        fontFamily:'$IS',
        fontSize:normalize(10),
        color:'$primaryColor'
    },

    top10: {
        marginTop:normalize(10)
    },

    top20: {
        marginTop:normalize(20)
    },

    top30: {
        marginTop:normalize(30)
    },

    bottom20: {
        marginBottom: normalize(20)
    },

    bottom30: {
        marginBottom: normalize(30)
    },

    contentBg: {
        backgroundColor: '$whiteColor',
    },

    flexRight: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    flexCenter: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    menuIcon: {
        fontSize: normalize(24),
        color: '$whiteColor',
        paddingLeft:normalize(10),
        paddingRight:normalize(10),
        paddingTop:normalize(3),
    },
    newItem: {
        width:normalize(10),
        height:normalize(10),
        marginRight:normalize(5),
        borderRadius:normalize(5),
        backgroundColor:'$redColor',
        position:'absolute',
        top:normalize(5),
        right:0
    },
    bottomContainer : {
        padding:normalize(10),
        paddingTop:normalize(50),
        flex:1,
        flexDirection:'column',
        alignContent:'flex-end',
        alignItems:'stretch',
    },
    primary : {
        color:'$primaryColor'
    },
    headingText : {
        paddingRight: normalize(7),
    }

});

export const startup = EStyleSheet.create({

    lightBox : {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderColor:'#ddd',
        borderWidth:1,
        width: normalize(240),
        height: normalize(320),
        left: normalize(60),
        top: normalize(160),
    },

    logoWrapper: {
        flexDirection:'column',
        flex:1,
        justifyContent: 'center' ,
        alignItems: 'center',
    },

    logo: {
        width:normalize(150),
    },

    slogan: {
        flexDirection:'column',
        flex:1,
        justifyContent: 'center' ,
        alignItems: 'center',
        marginBottom:normalize(30)
    },

    poweredBy: {
        flexDirection:'row',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:normalize(20),
    }


});

export const shared = EStyleSheet.create({
    header: {
        backgroundColor: '$primaryColor',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        elevation: 0,
        padding: 0,
        height:normalize(60),
        zIndex:10000
    },

    headerText: {
        fontFamily: '$IS',
        color: 'white',
        paddingTop:normalize(10),
        fontSize:normalize(14),
    },

    userHeaderText: {
        fontFamily: '$IS',
        color: 'white',
        paddingTop:normalize(2),
        fontSize:normalize(16),
    }
});

export const drawer = EStyleSheet.create({
    container :{
        flex: 1,
    },
    imageHeader : {
        height : normalize(100),
        width : '100%'
    },
    menuHeader: {
        padding:normalize(15),
    },
    item : {
        justifyContent: 'flex-end',
        paddingTop: normalize(8),
        paddingBottom: normalize(8),
        borderBottomColor:'#fff',
        marginLeft:normalize(5),
        marginRight:normalize(5)
    },
    internalItem : {
        justifyContent: 'flex-end' ,
        paddingTop: normalize(12),
        paddingBottom: normalize(12),
        marginLeft:normalize(5),
        marginRight:normalize(5),
        backgroundColor:'$ultraLightGray',
        borderBottomColor:'$borderColor',
        borderBottomWidth:1,
    },
    itemTitle : {
        fontFamily : '$IS',
        fontSize: normalize(15),
        color:'$darkGrayColor',

    },
    itemIcon : {
        marginLeft: normalize(10),
        fontSize: normalize(20),
        color: '$blackColor',
    },

    selectedItem: {
        backgroundColor:'$ultraLightGray',
    },

    featuredItem: {
        borderRadius:normalize(5),
        borderColor:'$primaryColor',
        borderWidth:1,
    },

    newItem: {
        width:normalize(10),
        height:normalize(10),
        marginRight:normalize(5),
        borderRadius:normalize(5),
        backgroundColor:'$greenColor'
    },
    headingText: {
        fontFamily:'$IS',
        fontSize:normalize(12),
        color:'$borderColor'
    },
    headingTextMedium: {
        fontFamily:'$IS',
        fontSize:normalize(10),
        color:'$borderColor'
    },

    headingTextBold: {
        fontFamily:'$ISB',
        fontSize:normalize(16),
        color:'$borderColor'
    },
    logo: {
        width:normalize(75),
    },


});

export const tabsStyles = EStyleSheet.create({

    nbtab: {
        borderBottomWidth:0,
        elevation:0,
        paddingRight:10,
        paddingLeft:10,
        backgroundColor: '$primaryColor',
    },

    tabActive: {
        borderBottomWidth:0,
        elevation:0,
        borderBottomColor:'#f4f4f4',
        backgroundColor: '#7f294c',
    },

    nblabel: {
        color: '$ultraLightGray',
        fontWeight: '400',
        fontFamily: '$IS',
        fontSize:normalize(13)
    },

    labelActive: {
        color: '$whiteColor',
        fontWeight: '400',
        fontFamily: '$IS',
        fontSize:normalize(13)
    },

   container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#7f294c',
        borderTopColor:'#8a395a',
        borderTopWidth:1,
        height:(50),
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        elevation: 0
    },
    tab: {
        marginRight:0
    },
    indicator: {
        backgroundColor: '#f4f4f4',
        height:normalize(5),
    },

    label: {
        color: '$whiteColor',
        fontWeight: '400',
        fontFamily: '$IS'
    },
});

export const categories = EStyleSheet.create({
    heading: {
        color: '$primaryColor',
        fontFamily: '$ISB',
        textAlign: 'center',
        fontSize:normalize(14),
    },
    label: {
        color: '$grayColor',
        fontWeight: '400',
        fontFamily: '$IS',
        textAlign: 'center',
        fontSize:normalize(10),
        zIndex:2,
    },
    icon: {
        borderColor:'$borderColor',
        borderWidth:1,
        margin:normalize(3),
        height: (normalize(SCREEN_WIDTH)-normalize(47))/3,
        width: (normalize(SCREEN_WIDTH)-normalize(47))/3
    },
    headingBox:{
        flex:1,
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        padding:normalize(5),
        backgroundColor:'$ultraLightGray',
        marginTop:5,
        marginBottom:2,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '$borderColor',
        shadowColor: '$blackColor',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 2
    },
    box: {
        flex:1,
        flexWrap:'wrap',
        justifyContent:'flex-end',
        flexDirection:'row',
        padding:normalize(5),
        backgroundColor:'$whiteColor',
        margin:normalize(5),
        borderWidth: 1,
        borderRadius: normalize(5),
        borderColor: '$borderColor',
        borderBottomWidth: 0,
        shadowOpacity: 0.8,
        marginTop:0,
        shadowColor: '$blackColor',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: normalize(2)
    },
    flatBox: {
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row',
        padding:normalize(5),
        backgroundColor:'$whiteColor',
        margin:normalize(5),
        borderWidth: 1,
        borderColor: '$borderColor',
        shadowOpacity: 0.8,
        marginTop:0,
    },
    hiddenBox: {
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row',
        padding:normalize(5),
        marginTop:0,
    },
    buttonImage: {
        height:normalize(50),
        width:normalize(50),
        margin: normalize(10),
    },
    adBox: {
        height: normalize(120),
        marginBottom: normalize(5),
    },
    col2: {
        flex:1,
        width:'50%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:normalize(2),
        marginBottom:normalize(3),
    },
    billHeading: {
        color: '$darkGrayColor',
        fontFamily: '$ISB',
        textAlign: 'right',
        fontSize:normalize(12),
    },
    billHeadingValue: {
        color: '$primaryColor',
        fontFamily: '$ISB',
        textAlign: 'right',
        fontSize:normalize(12),
        paddingRight:normalize(10),
    },

    col_50: {
        width:'50%',
    },
    col_45: {
        width:'45%',
    },
    col_20: {
        width:'20%',
    },
    col_15: {
        width:'15%',
    },
    col_10: {
    width:'10%',
    },
    col_5: {
        width:'5%',
    },
    table_header: {
        backgroundColor:'$ultraLightGray',
        borderBottomWidth:1,
        borderBottomColor:'$borderColor',
        fontFamily: '$ISB',
        fontSize:normalize(12),
        color:'$grayColor',
        paddingTop:normalize(10),
        paddingBottom:normalize(10),
        alignItems: 'center'
    },
    table_row: {
        borderBottomWidth:1,
        borderBottomColor:'$borderColor',
        fontFamily: '$IS',
        fontSize:normalize(11),
        color:'$darkGrayColor',
        padding:normalize(3),
        borderLeftWidth:1,
        borderLeftColor:'$borderColor',
        minHeight:normalize(40),
    },
    table_row_none_text: {
        borderBottomWidth:1,
        borderBottomColor:'$borderColor',
        padding:0,
        borderLeftWidth:1,
        borderLeftColor:'$borderColor',
    },
    grid: {
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        marginTop:normalize(20),
        marginBottom:normalize(20),
        borderWidth:1,
        borderColor:'$borderColor',
    },
    table_text : {
        fontFamily: '$IS',
        fontSize:normalize(11),
        color:'$darkGrayColor',
    },
    table_text_del: {
        color:'$lightGrayColor',
        textDecorationLine :'line-through',
        fontFamily: '$IS',
        fontSize:normalize(10),
    },
    center_align:{
      textAlign:'center'
    },
    right_align:{
        textAlign:'right'
    },
    left_align:{
        textAlign:'left'
    },
    no_border: {
        borderLeftWidth:0,
    },
    shortList: {
        flex:1,
        justifyContent:'flex-end'
    },
    activeSubCat: {
        borderWidth:2,
        borderColor:'#7f294c'
    },
    redColor: {
        color : '$redColor'
    },
    greenColor: {
        color : '$greenColor'
    },
    subCatsScroll: {
        width:SCREEN_WIDTH,
        flexGrow: 1,
        maxHeight:oneFourth + normalize(10),
        paddingRight:normalize(10),
        paddingLeft:normalize(10)
    },
    subCatTitle: {
        flex:1,
        width:oneFifth,
        flexWrap: 'wrap'
    }

});

export const elements = EStyleSheet.create({

    accordionHeading: {
        padding:normalize(10),
        backgroundColor:'#fff',
        marginTop:0,

    },
    accordionHeadingText: {
        color:'$blackColor',
    },
    roundBox: {
        margin:normalize(10),
        marginBottom:0,
        backgroundColor:'$whiteColor',
        borderRadius:normalize(10),
        borderColor:'$borderColor',
        borderWidth:1,
        padding:normalize(10)
    },
    footer: {
        position:'absolute',
        zIndex:normalize(100),
        height:normalize(60),
        backgroundColor:'$blackColor',
        bottom:0,
        flex:1,
        flexDirection:'row',
        width:'100%',
        padding:normalize(10),
    },
    footerBoxesRight:{
        flex:1,
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
    },
    footerBoxesLeft:{
        flex:1,
        height:'100%',
        flexDirection:'column',
        justifyContent:'center',
    },
    buyButton:{
        backgroundColor:'$secondaryColor',
        borderRadius:normalize(3),
        paddingBottom:normalize(7),
        paddingTop:normalize(7),
        alignItems:'center'
    },
    buttonText:{
        color:'$whiteColor',
        fontSize:normalize(16),
        fontFamily:'$ISB',
    },
    footerOldPrice:{
        color:'$lightGrayColor',
        fontFamily:'$IS',
        fontSize:normalize(14),
        textDecorationLine :'line-through',
    },
    footerNewPrice:{
        color:'$secondaryColor',
        fontFamily:'$IS',
        fontSize:normalize(18),
    },
    wrap:{
        backgroundColor:'#fff',
        marginTop:normalize(2)
    },
    box:{
        padding:normalize(15),
    },
    boxTitle: {
        color:'$blackColor',
        fontSize:normalize(14),
        fontFamily:'$ISB'
    },
    normalBoldText:{
        color:'$lightBlackColor',
        fontSize:normalize(12),
        fontFamily:'$ISB'
    },
    normalText:{
        color:'$lightBlackColor',
        fontSize:normalize(12),
        fontFamily:'$IS'
    },
    smallText:{
        color:'$lightBlackColor',
        fontSize:normalize(10),
        fontFamily:'$IS'
    },

    discountLabel: {
        position:'absolute',
        zIndex:4,
        top:0,
        left:10,
        padding:5,
        backgroundColor:'rgba(255,209,26,0.9)',
        width:normalize(37),
        height:normalize(45),
        borderTopRightRadius:0,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5
    },

    discountLabelLarge: {
        position:'absolute',
        zIndex:10,
        top:normalize(60),
        left:10,
        padding:5,
        backgroundColor:'rgba(255,209,26,0.9)',
        width:normalize(74),
        height:normalize(90),
        borderTopRightRadius:0,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10
    },

    discountLabelFont: {
        color:'#cc0000',
        textAlign:'center',
        fontFamily:'$ISB',
        fontSize:normalize(12)
    },
    discountLabelSmallFont: {
        color:'#cc0000',
        textAlign:'center',
        fontFamily:'$IS',
        fontSize:normalize(9)
    },

    discountLabelFontLarge: {
        color:'#cc0000',
        textAlign:'center',
        fontFamily:'$ISB',
        fontSize:normalize(24)
    },
    discountLabelSmallFontLarge: {
        color:'#cc0000',
        textAlign:'center',
        fontFamily:'$IS',
        fontSize:normalize(18)
    },

    mapPin: {
        width:normalize(70),
        height:normalize(70),
    },
    fob : {
        backgroundColor: 'rgba(255,255,255,.9)',

        position: 'absolute',
        borderWidth:1,
        borderColor:'#ccc',
        bottom: normalize(65),
        right: normalize(20),
        width: normalize(45),
        height: normalize(45),
        borderRadius: normalize(45),
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    mapFavBar: {
        backgroundColor:'$whiteColor',
        height:normalize(50),
        position:'absolute',
        top:normalize(60),
        width:SCREEN_WIDTH,
        zIndex:100,
        borderBottomColor:'$borderColor',
        borderBottomWidth:1,
        flexDirection:'row',
        flex:1,
        paddingTop:normalize(15),
    },
    mapFavText: {
        paddingRight:normalize(3),
        marginLeft:normalize(15),
        fontFamily: '$IS',
        fontSize: normalize(14),
        color: '$blackColor'
    },
    mapFavStars : {
        marginRight: normalize(20),
        fontSize: normalize(20),
        color: '$primaryColor',
    },
    mapFooter:{
        backgroundColor:'$whiteColor',
        borderTopColor:'$borderColor',
        borderTopWidth:1,
        height:normalize(55),
        position:'absolute',
        bottom:0,
        width:SCREEN_WIDTH,
        zIndex:20,
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        padding:normalize(10),
        // flexDirection:'row',
    },
    icons : {
        width:normalize(24),
        height:normalize(24),
        marginLeft:normalize(5)
    }

});

export const popupmenu = EStyleSheet.create({
   menuWrapper: {
    padding:15
   },
   menuOption: {
       flex:1,
       flexDirection:'row',
       justifyContent:'flex-end',
   }

});

export const loading = EStyleSheet.create({
    wrap: {
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.50)',
        zIndex:1000000,
        alignItems:'center',
        justifyContent:'center',
        },
    lightBox : {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.85)',
        width: normalize(240),
        height: normalize(160),
        borderRadius:10,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    circles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // paddingVertical: 20,
        // flexDirection: 'row'
    },
    progress: {
        margin: 2,
        position: 'absolute',
        right:20,
    },
});

export default styles = {
    index
};