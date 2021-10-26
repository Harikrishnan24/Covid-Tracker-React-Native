import React, { Component, useEffect } from 'react';
import { Text, View, Dimensions,ScrollView, ActivityIndicator,StyleSheet,TextInput,FlatList} from 'react-native';
import {LineChart, BarChart ,PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { SearchBar } from 'react-native-elements';



export default class StateInfoScreen extends Component {
  constructor(props){
    super(props);
    this.state={
        isLoading:true,
        dataSource:[],
        statecode1:null
        
        
    }
}

componentDidMount (){
    const statecode = this.props.route.params.statecode;
    return fetch('https://api.covid19india.org/v2/state_district_wise.json')
       .then( (response) => response.json() )
       .then( (json) =>{
         let i;
         for(i=0;i<50;i++)
         {
           if(statecode==json[i].statecode)
           {
             console.log(i);
             break;
           }
         }
       // console.log(responseJson);
         this.setState({
             isLoading:false,
             dataSource :json[i],
             statecode1:statecode
         })
        console.log(this.state.dataSource); 
       })
       .catch((error) => {
           console.log(error)
       })
       .finally(() => {
        this.setState({ isLoading: false });
      });
       
   }
    renderItem1=({item})=>{
        return(
           
        <View style={styles.stateInfo}>
            <Text style={{flex:0.32 ,fontWeight:"bold",color:"#3F3B3C",textAlign:"center"}} >
              {item.district}
            </Text>
            <Text style={{flex:0.2,fontWeight:"bold",color:"#FF334F",textAlign:"center"}}>
              {item.confirmed}
            </Text>
            <Text style={{flex:0.2,fontWeight:"bold",color:"blue"}}>
              {item.active}
            </Text>
            <Text style={{flex:0.15,fontWeight:"bold",color:"green"}}>
              {item.recovered}
            </Text>
            <Text style={{flex:0.1,fontWeight:"bold",color:"black"}}>
              {item.deceased}
            </Text>
          </View>
        )
        
    }
    renderItem3=({item})=>{
      
      return(
         
      <View style={styles.stateInfo}>
          <Text style={{flex:0.32 ,fontWeight:"bold",color:"#3F3B3C",textAlign:"center"}} >
          {item.district}
            </Text>
        </View>
      )
      
  }
    
    renderItem = ({ item })=>
    { 
    const statecode = this.props.route.params.statecode;
    //const statecode = this.props.navigation.getParam('name', null);
    //console.log(statecode)
    
      return(
        
        <View>            
          {/*
          <FlatList data={item}
        renderItem={this.renderItem3}
        keyExtractor={item => item.statecode}></FlatList>
        */}
        
        <Text>Hello</Text>
        </View>
      )
     
     
    
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "COVID-19 API Information India",
            headerStyle: {
                backgroundColor: "#5827b0"
            },
            headerTitleStyle: {
                color: "#fff",         
                fontSize: 20,       
            },
            headerTintColor: "#FFF"
        };

    };
    

    render() {
        const sname = this.props.route.params.name;
        const confirmed = this.props.route.params.confirmed;
        const active = this.props.route.params.active;
        const recovered = this.props.route.params.recovered;
        const death = this.props.route.params.death;
        const { isLoading } = this.state;
        
        
        return (

            <ScrollView nestedscrollEnabled={true} style={{  flex: 1, padding: 10 }}>
           <View>
             <Text style={{textAlign:"center",textTransform:"uppercase",fontWeight:"bold",color:"#273cb0" ,padding:5}}>
               {sname}
            </Text>
          </View>

        <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:4 ,borderColor:"#273cb0",borderWidth:0.6,marginRight:2,marginLeft:2}}>
        
        <Text style={{flex:0.36,fontSize:15,textAlign:"center",borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>
          District
          </Text>
          <Text style={{flex:0.25,fontSize:14,textAlign:"center",borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>
            Confirmed
          </Text>
          <Text style={{flex:0.2,textAlign:"center",fontSize:14,borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>
              Active
          </Text>
          <Text style={{flex:0.25,fontSize:14,textAlign:"center",borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>
            Recovered
          </Text>
          <Text style={{flex:0.2,fontSize:14,textAlign:"center",color:"#5827b0"}}>
             Deaths
          </Text>
      </View>
          
      <View style={{flex:1,marginLeft:3,marginRight:3,borderWidth:0.7,height:(Dimensions.get('screen').height)/1.2,marginTop:5,borderRadius:10,borderColor:"#5827b0"}}>
    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
     
     <FlatList
        data={this.state.dataSource.districtData}
        renderItem={this.renderItem1}
      />
      </ScrollView>
          </View>
         
  </ScrollView >

        );

    }
}
const styles = StyleSheet.create({
    logo_style:{
      shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  
  elevation: 10,
      backgroundColor:"#5827b0",
      flex:1,justifyContent:"center",alignItems:"center",height:100,
     
    },
    mainInfo:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 2,
      elevation: 1,
      borderBottomWidth:1.5,
      borderTopWidth:1.5,
      borderColor:"#273cb0"
    },
    info_stlye:
    {
      flex:1,flexDirection:"row",justifyContent:"space-around",paddingTop:5
      
    },
    tot_style:{
     color:"#273cb0",
     fontSize:16,
     fontWeight:"bold"
    },
    numb_style:{
      fontSize:16,
      color:"#49148c",
      fontWeight:"bold"
    },
    stateInfo:{
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 2.1,
      
      marginTop:5,
      marginBottom:4,
      flex:1,
      marginRight:4,
      marginLeft:4,
      flexDirection:"row",
      height:70,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center",
      
    }
  });