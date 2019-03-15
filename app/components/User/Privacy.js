import React from 'react';
import { Container ,Content, View, Text } from 'native-base';
import { base } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import UserHeader from './../Shared/UserHeader';

export default class Privacy extends React.Component {
    render() {
        return (
            <Container>
                <UserHeader />
                <Content style={base.contentBg}>
                    <View style={{padding:20}}>
                       <Text style={[base.normalText,base.top10, {textAlign:'right'}]}>
                           نظارت و کنترل بر سخت افزار استفاده شده برای ارائه خدمات فوق تحت نظر شرکت پگاه است و شرکت پگاه حق هر گونه تغییر و جابه‌جایی سخت افزارهای استفاده شده را حفظ می‌نماید. در مواقع ضروری این تغییرات طی اطلاع کتبی با مشترک هماهنگ خواهد شد.
                           نحوه جبران خسارت ناشی از هرگونه اشکال و یا قطع ارتباط بر مبنای SLA (توافقنامه سطح خدمات) پیوست شماره ۱ همین قرارداد مشخصشده است و سقف آن تا ۱۰٪ مبلغ کل قرارداد خواهد بود.
                       </Text>
                        <Text style={[base.normalText, base.top10,{textAlign:'right'}]}>
                            تضمین کیفیت خدمات و برقراری امکانات با ضریب اطمینان ۹۹.۹ درصد که نحوه محاسبه آن در پیوست شماره ۱ همین قرارداد بیان شده است.
                            پشتیبانی ۲۴ ساعته در ۷ روز هفته توسط بخش فنی بعمل می آید و مشترک می‌تواند در زمان بروز مشکل و به منظور سهولت در امر پاسخگویی با تلفن۶۱۹۷۵۶۵۱-۵ -۰۲۱ تماس حاصل نماید.

                        </Text>
                        <Text style={[base.normalText, base.top10,{textAlign:'right'}]}>
                            ارائه خدمات موضوع قرارداد شامل ارائه نام کاربری و رمز عبور پنل اختصاصی مشترک حداکثر ظرف مدت ۱ روز کاری پس از امضاء قرارداد.
  شرکت پگاه موظف است نسبت به حفظ محرمانگی اطلاعات مشترک اقدامات مقتضی را انجام دهد.
                        </Text>
                        <Text style={[base.normalText, base.top10, {textAlign:'right'}]}>
) پیوست شماره ۱ همین قرارداد مشخصشده است و سقف آن تا ۱۰٪ مبلغ کل قرارداد خواهد بود.
                            شرکت پگاه موظف است نسبت به حفظ محرمانگی اطلاعات مشترک اقدامات مقتضی را انجام دهد.
                        </Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
