<template>
  <div>
    <v-card class="mx-auto" elevation="7" height="90vh" width="90%">
      <v-content>
        <v-card-title>
          Authorize Yout Microphone.
          <v-icon>mdi-microphone</v-icon>
        </v-card-title>
        <v-divider/>
        <div id="result"></div>
      </v-content>
    </v-card>
    <v-bottom-navigation  color="blue lighten-2">
      <v-btn x-large @click="deleteText()">
        <span>Delete</span>
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data: function(){
  return{
  msg: 'This button can delete logs.',
  pronounce: new window.webkitSpeechRecognition(),
  drawer: false,
  }
  },
  methods:{
  deleteText(){
  this.msg=''
  document.getElementById('result').innerHTML=''
  }},
  created: function(){
  this.pronounce.lang = 'en-US';
  this.pronounce.interimReuslts = true;
  this.pronounce.start()
  this.pronounce.onresult = event => {
//onresult => 結果イベント発火で呼び出しされるイベントハンドル
    this.pronounce.stop();
//.stop（） => 認識終了する関数
    if(event.results[0].isFinal){
//isFinal => rerultsに結果が格納し終わるとtrue
      document.getElementById('result').innerHTML += '<h2>' + event.results[0][0].transcript + '</h2>'+'<v-divider/>';
    }
  }
  this.pronounce.onend = ()=>{
//onend => 終了イベント発火で、呼び出しされるイベントハンドル
    this.pronounce.start()
  };

  }
}
</script>
<style>
</style>
