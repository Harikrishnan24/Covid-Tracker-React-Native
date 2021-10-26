import React, { Component } from 'react';
import { Text, View, Dimensions,ScrollView, ActivityIndicator,StyleSheet,TextInput,FlatList} from 'react-native';
import {LineChart, BarChart ,PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";




export default class FullInfoScreen extends Component {
 
  static navigationOptions = {
        headerShown: false
    }
  constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataSource:null,
          dataSource2:null,
          daily_confirmed:null,
      }
  }
  renderItem = ({ item })=>
  {
    if(item.statecode!="TT")
    {return(
      <View style={styles.stateInfo}>
        <Text style={{flex:0.32 ,
          fontWeight:"bold",color:"white",
          textAlign:"center",paddingTop:12,paddingBottom:12,
          backgroundColor:"#5827b0",borderRadius:10}} 

          onPress={() => this.props.navigation.navigate('StateInfoScreen', 
          {name: item.state,confirmed:item.confirmed,statecode:item.statecode,
          recovered:item.recovered,active:item.active,
          death:item.deaths})}>
            {item.state}
        </Text>

          <Text style={{flex:0.2,fontWeight:"bold",color:"#FF334F",
          textAlign:"center"}}>
            {item.confirmed}
          </Text>
          <Text style={{flex:0.2,fontWeight:"bold",color:"blue"}}>
            {item.active}
          </Text>
            
          <Text style={{flex:0.15,fontWeight:"bold",color:"green"}}>
            {item.recovered}
          </Text>
          <Text style={{flex:0.1,fontWeight:"bold",color:"black"}}>
            {item.deaths}
          </Text>
      </View>
    )}
  }
  
  componentDidMount (){
     return fetch('https://api.covid19india.org/data.json')
        .then( (response) => response.json() )
        .then( (responseJson) =>{
          this.setState({
              isLoading:false,
              dataSource :responseJson.cases_time_series,
              dataSource2:responseJson.statewise
              
          })
             
        })
        .catch((error) => {
            console.log(error)
        });
    }
  
  
  
    render() {
        if(this.state.isLoading){

            return(
                <View>
                    <ActivityIndicator />
                    </View>
            )

        }
        else{
    let m=0;
    mont=[]
    let dat = this.state.dataSource.map((val, key) =>
    {
      //const daily_confirmed = []
      // global.n_dailyConfirmed = daily_confirmed.map((daily_confirmed) => val.dailyconfirmed)
     
     n_dailyConfirmed = val.totalconfirmed
    n_totalrecovered = val.totalrecovered
    n_totaldeceased = val.totaldeceased
     n_month=val.date
     
    
       
         
         mont[m]=n_totalrecovered
         m=m+1;
          
         
 
 
    
        return (
        n_totalrecovered,mont,n_totaldeceased,n_dailyConfirmed
        /*<View key={key}>
            
            <Text>{n_dailyConfirmed}</Text>
            
             </View>*/)
    });
    
   


    let i
    let k=[]
    for(i=0;i<dat.length;i++)
    {
      k[i]=dat[i];
    }
    return (
      
      <ScrollView style={{flex:1}} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{backgroundColor:"#FFF"}}>

    <View style={styles.logo_style}><Text style={{ fontSize:20,fontWeight:"bold",
    color:"white"}}>COVID-19 API Information India </Text></View>
    <View style={styles.mainInfo}>  
    
    <View style={styles.info_stlye}><Text style={styles.tot_style}>Total Confirmed</Text><Text style={styles.tot_style}>Total Recovered</Text><Text style={styles.tot_style}>Total Deceased</Text></View>
    <View style={styles.info_stlye}><Text style={{fontSize:16,color:"#FF334F",fontWeight:"bold"}}>{n_dailyConfirmed}</Text><Text style={{fontSize:16,color:"green",fontWeight:"bold"}}>{n_totalrecovered}</Text><Text style={{fontSize:16,color:"black",fontWeight:"bold"}}>{n_totaldeceased}</Text></View>     
     </View>
        <View>
        
          {/*<Text>Bezier Line Chart</Text>*/}
          <LineChart
            data={{
            
              datasets: [
                {
                  data: k,
                  svg:{stroke:"green"}
                },
                {
                    data:mont,
                    getDotColor: (opacity = 1) => "green",
                }
              ]
            }
        }
            width={Dimensions.get("window").width} // from react-native
            height={(Dimensions.get("window").width)/2.5}
            withInnerLines={false}
            //yAxisLabel="$"
            //yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#FFF",
              
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => "red",
              labelColor: (opacity = 1) => "#273cb0",
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "1",
                strokeWidth: "1",
                stroke: "#FF0000"
              }
            }}
            bezier
            style={{
              marginVertical:2,
              borderRadius: 16
            }}
          />
         
          <Text style={{textAlign:"center",fontSize:7,color:"#273cb0",marginTop:-25}}>Graph of Confirmed and Recoverd Cases </Text>
         </View>
       
    <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",height:30,borderRadius:4 ,borderColor:"#273cb0",borderWidth:0.6,marginRight:2,marginLeft:2}}>
        <Text style={{flex:0.36,fontSize:15,textAlign:"center",borderRightWidth:1.5,borderColor:"#273cb0",color:"#683cb7"}}>State</Text><Text style={{flex:0.25,fontSize:14,textAlign:"center",borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>Confirmed </Text><Text style={{flex:0.2,textAlign:"center",fontSize:14,borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>Active </Text><Text style={{flex:0.25,fontSize:14,textAlign:"center",borderRightWidth:1.5,borderColor:"#273cb0",color:"#5827b0"}}>Recovered</Text><Text style={{flex:0.2,fontSize:14,textAlign:"center",color:"#5827b0"}}>Deaths</Text>
      </View>
          
    <ScrollView style={styles.stateList} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
      <FlatList
        data={this.state.dataSource2}
        renderItem={this.renderItem}
        keyExtractor={item => item.statecode} 
      />
      </ScrollView>
          
          
      </ScrollView>
    );
        }
  }
}
const mobWidth=Dimensions.get("window").width
const mobHeight=Dimensions.get("window").height
const styles = StyleSheet.create({
stateList:{
 marginLeft:3,marginRight:3,height:mobHeight/2,
 borderWidth:0.7,marginTop:5,borderRadius:10,borderColor:"#5827b0"
},

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
    flex:1,justifyContent:"center",alignItems:"center",
    height:mobHeight/7,
   
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
    color:"#FF334F",
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
    elevation: 2.5,
    
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

