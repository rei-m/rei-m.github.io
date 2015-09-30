$(function(){

  var vueModel = new Vue({
    el: '#comment_form',
    data: {
      comment: '',
      size: '',
      color: ''
    },

    created: function(){

    },

    methods:{

      onSend: function(e){
         messageDataStore.push({content : this.comment});
      },

      onSendLgtm: function(e){
        $.ajax({
          url: "http://lgtm.in/g"
        }).done(function(data){
          console.dir(data);
          var re = /( class="<.+ form-control" id="imageUrl" name="imageUrl">)/;
          console.dir(data.match(re));
        }).fail(function(data){
          alert("つながらないよ！");
        });
      }
    }
  });

});
