import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view-universal';

import WeekdayAnimePage from './WeekdayAnimePage'

export default class AnimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekdays:[
                {
                    shortform: "Mon",
                    longform : "monday",
                },
                {
                    shortform: "Tue",
                    longform : "tuesday",
                },
                {
                    shortform: "Wed",
                    longform : "wednesday",
                },
                {
                    shortform: "Thu",
                    longform : "thursday",
                },
                {
                    shortform: "Fri",
                    longform : "friday",
                },
                {
                    shortform: "Sat",
                    longform : "saturday",
                },
                {
                    shortform: "Sun",
                    longform : "sunday",
                },
                ]
        };
    }

    render() {
        return (
            <ScrollableTabView 
                style={{ marginTop: "5%" }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
            > 
            
                {this.state.weekdays.map((weekdayName, weekday_index)=>(
                    
                    <WeekdayAnimePage tabLabel={weekdayName.shortform} weekday={weekdayName.longform}/>
                ))
                }
            </ScrollableTabView>
        );  
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems:'center',
        top:"35%"
    },
  });