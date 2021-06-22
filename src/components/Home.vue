<template>
  <div>
    <v-card id="cardStyle" class="mx-auto"  elevation="7" height="90vh" width="90%" style="overflow: auto;">
      <v-content>
        <v-card-title>
          Authorize Your Microphone.
          <v-btn icon @click="getdata()">
            <v-icon>mdi-microphone</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider/>
        <div id="result" style="text-align: center;"></div>
      </v-content>
      <v-btn color="error" dark x-large fab @click="deleteText()" class="v-btn--style" >
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data: function(){
  return{
  msg: '',
  returnMsg: '',
  pronounce: new window.webkitSpeechRecognition(),
  drawer: false,
  }
  },
  methods:{
  deleteText(){
  document.getElementById('result').innerHTML=''
  },
  authorizeMedia(){alert('If you have any troubles, please check your input of micryophone.')},
  getdata(){
    //console.log("①./:   「I sent a request to ./api with params」")
    this.$axios.get('/api2',{params:{dat:this.msg}})
    .then(function(response){
      //console.log(response.data.msg) 
      this.returnMsg= response.data.msg
      //console.log("⑦./:   「I receive a response from ./api, this one is below.」")
      //console.log(this.returnMsg)
      document.getElementById('result').innerHTML += '<h4>'+'<font color=lightgray>'+'Oponent:     '+"「"+this.returnMsg+"」"+'</font>'+'</h3>'
      }.bind(this))
  }
},
  created: function(){
  this.pronounce.lang = 'en-US';
  this.pronounce.interimReuslts = true;
  this.pronounce.start()
  this.pronounce.onresult = event => {
// onresult => 結果イベント発火で呼び出しされるイベントハンドル
    this.pronounce.stop();
// .stop（） => 認識終了する関数
    if(event.results[0].isFinal){
// isFinal => rerultsに結果が格納し終わるとtrue
      document.getElementById('result').innerHTML += '<h3>'+'<font color=dimgray>'+"You:     "+"「"+event.results[0][0].transcript+"」"+'</font>'+'</h3>';
      //under construction
      this.msg = event.results[0][0].transcript
      this.getdata()
    }
  }
  this.pronounce.onend = ()=>{
// onend => 終了イベント発火で、呼び出しされるイベントハンドル
    this.pronounce.start()
  };

  }
}
</script>
<style>
#cardStyle .v-btn--style{
  bottom: 0;
  right: 16px;
  position: absolute;
  margin: 0 5px 16px 16px;
}
</style>
