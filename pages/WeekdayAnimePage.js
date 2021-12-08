import React, { Component } from 'react';
import { Card, Button, Icon, Badge  } from 'react-native-elements'
import { StyleSheet, Text, View, ScrollView, Linking , Alert, Pressable, ActivityIndicator} from 'react-native';
import Modal from "react-native-modal";
import { BlurView } from 'expo-blur';
import Anime_Info from '../info_query/Anime_info'


export default class WeekdayAnimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekday: props.weekday,
            anime_list:[],
            loading:true,
            error:null,
            anime_modal_toggle:[],
        };
        const animeOfweekdayInfoInitializer = new Anime_Info();
        animeOfweekdayInfoInitializer.initializeWeekdayInfo(this.state.weekday).then(()=>{
            const error = animeOfweekdayInfoInitializer.getError()
            if (error === null) {
                this.setState({anime_list:animeOfweekdayInfoInitializer.getWeekdayInfo()})
                this.setState({anime_modal_toggle:this.state.anime_list.map((value, index)=>(false))})
                this.setState({loading:false})
            } else {
                this.setState({error:error})
            }
        });
    }

    jumpToLink(url) {
        Linking.openURL(url)
    }

    toggleModal(index) {
        var modal_toggle_array = this.state.anime_modal_toggle
        modal_toggle_array[index] = !modal_toggle_array[index]
        this.setState({anime_modal_toggle:modal_toggle_array})
    }

    render() {
        return (
            <View style={{padding:0}}>
                {this.state.loading ? <ActivityIndicator size="large" color="#0269A4" style={styles.center}/> :
                
                    <ScrollView contentContainerStyle={styles.card_container}>
                            {this.state.anime_list.map((anime_dict, anime_index) => {
                                
                                 return ( 
                                 <Card containerStyle={styles.animeInfo_card} key={anime_index}>
                                     {anime_dict.score === null ? <Badge containerStyle={{ position: 'absolute', top: -6, right: -6, elevation: 20, }}  status="error"/>
                                    :
                                    <Badge value={<Text style={{color:"white"}}>{parseInt(anime_dict.score)}</Text>}  containerStyle={{ position: 'absolute', top: -14, right: -14, elevation: 20,  }}  status="success"/> 
                                    }
                                    
                                    <View style={styles.animeInfo_card_image_container}>
                                        <Card.Image source={{uri: anime_dict.image_url}} style={styles.animeInfo_card_image}></Card.Image>
                                    </View>
                                    <Card.Title style={styles.animeInfo_card_title}>{anime_dict.title}</Card.Title>
                                    <Text style={styles.animeInfo_card_synopsis} numberOfLines={5}>{anime_dict.synopsis}</Text>
                                    <Button title="Details" type="solid" style={styles.animeInfo_card_details_button} onPress={this.toggleModal.bind(this, anime_index)}/>

                                    <Modal isVisible={this.state.anime_modal_toggle[anime_index]} onBackdropPress={this.toggleModal.bind(this, anime_index) }>
                                        <BlurView style={styles.anime_modal_container}  intensity={100} tint="dark">
                                            <Icon type='ionicon' name='close-circle-outline' color='white' size={35}
                                                    onPress={this.toggleModal.bind(this, anime_index)} 
                                                    containerStyle={styles.close_modal_icon}
                                                    />
                                            <ScrollView>
                                                <View style={styles.animeInfo_modal_topInfo_container}>
                                                    <View style={styles.animeInfo_modal_image_container}>
                                                        <Card.Image source={{uri: anime_dict.image_url}} style={styles.animeInfo_modal_image}></Card.Image>
                                                    </View>
                                                    
                                                    <View style={styles.animeInfo_modal_shortinfo_container}>
                                                        <Text><Text style={{color:"#007bff"}}>Title:</Text><Text style={{color:"white",fontSize:12}}>{anime_dict.title}</Text></Text>
                                                        <Text><Text style={{color:"#007bff"}}>Score:</Text><Text style={{color:"#ffa726",fontSize:30}}>{anime_dict.score===null ? 'N/A': anime_dict.score}</Text></Text>
                                                        <Text><Text style={{color:"#007bff"}}>Type:</Text><Text style={{color:"yellow",fontSize:12}}>{anime_dict.type}</Text></Text>
                                                        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                                                            <Text style={{color:"#007bff"}}>Genres:</Text>
                                                            {anime_dict.genres.map((genre, genre_index)=>(
                                                            <Badge status="primary" value={genre.name} key={genre_index} onPress={this.jumpToLink.bind(this, genre.url)} />
                                                            ))}
                                                        </View>
                                                        <Button title="Watch" type="solid" containerStyle={{width:"60%",borderRadius:20}} icon={<Icon name="play-outline" type="ionicon" color='#f90'></Icon>} onPress={this.jumpToLink.bind(this, "http://bimiacg2.net/")}/>
                                                        
                                                    </View>
                                                </View>
                                                <Text style={styles.animeInfo_modal_synopsis}>{anime_dict.synopsis}</Text>
                                                <Pressable style={styles.roundBox} onPress={this.jumpToLink.bind(this, anime_dict.url)}><Text style={{color:"#007bff",fontSize:12,padding:3}}>Go to source</Text></Pressable>
                                            </ScrollView>
                                        </BlurView>
                                        
                                        
                                    </Modal>           
                                </Card>
                                )
                                 
                                                            })}
                            <Text style={styles.endOfDay}>That is all today.</Text>
                    </ScrollView>
                
                }
                {this.state.error===null?<></>:<>{Alert.alert("Error", this.state.error)}</>}
            </View>
        );  
    }
}

const styles = StyleSheet.create({
    center: {
        marginTop:"35%",
    },
    card_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    animeInfo_card: {
        flexDirection: 'row',
        width:"40%",
        height:"auto",
        borderRadius:5,
        padding:0,
        elevation: 20,
    },
    animeInfo_card_image_container:{
        width:"100%",
        height:"auto",
        backgroundColor:"black",
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    animeInfo_card_image:{
        resizeMode:"contain",
    },
    animeInfo_card_title:{
        textAlign:"left",
        paddingTop:"5%",
        paddingLeft:"5%",
        paddingRight:"5%",
        fontSize: 12,
    },
    animeInfo_card_synopsis:{
        
        marginLeft:"5%",
        marginRight:"5%",
        marginBottom:"5%",
        flex: 1,
        fontSize: 10,
        textAlign:"justify",
        
    },
    animeInfo_card_details_button:{
        alignSelf:"flex-end",
    },
    anime_modal_container:{
        width:"100%",
        height:"auto",
        borderRadius:10,
        alignSelf:"center",
    },
    close_modal_icon:{
        width:"auto",
        height:"auto",
        alignItems:"flex-start",
    },
    animeInfo_modal_topInfo_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    animeInfo_modal_image_container:{
        justifyContent: 'flex-start',
        width:"50%",
        height:"auto",
        backgroundColor:"black",
        borderRadius:5,
    },
    animeInfo_modal_image:{
        resizeMode:"contain",
    },
    animeInfo_modal_shortinfo_container:{
        margin:"5%",
        width:"45%",
    },
    roundBox:{
        margin:2,
        borderWidth:1.5,
        borderRadius:10,
        borderColor:"#007bff",
        alignSelf: 'flex-start',
    },
    animeInfo_modal_synopsis:{
        color:"white",
        margin:10,
        textAlign:"justify",
    },
    endOfDay:{
        textAlign: 'center',
        marginTop:"10%",
        marginBottom:"10%", 
        width:"100%",
        color:"gray"
    },
  });