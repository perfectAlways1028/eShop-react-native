import React from 'react';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Icon , Input } from 'native-base';
import ProfileTabs from './ProfileTabs';
import UserHeader from "../Shared/UserHeader";
import SimpleHeader from "../Shared/SimpleHeader";

const pageTitle = 'پروفایل کاربر';
export default class UserProfile extends React.Component {
    render () {
        return (
            <Container>
                <SimpleHeader title={pageTitle} />
                <ProfileTabs/>
            </Container>
        )
    }
}
