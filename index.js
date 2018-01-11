$(function () {
   let box = $('.box'),
       flag=true,
        hei={},
       bai={},
       blank={},//保存空白位置
        ai=true;
   let heiW = $('.heiWin'),baiW = $('.baiWin');
   for(let i=0;i<15;i++){
       $('<i>').appendTo(box);
       $('<b>').appendTo(box);
       for(let j=0;j<15;j++){
           blank[i+'_'+j]=true;
           $('<span>').attr('id',i+'_'+j).appendTo(box).addClass('son').data('pos',{x:i,y:j});
       }
   }
   box.on('click','.son',function () {
       if($(this).is('.black') || $(this).is('.white')){
           return ;
       }
       let data = $(this).data('pos');
       delete blank[data.x+'_'+data.y];
       if(flag){
           $(this).addClass('black');
           hei[data.x+'_'+data.y] = true;
           if(isSuccess(data,hei)>=5){
             heiW.addClass('block');
               box.off();
           }
           //人机
        /*   if(ai){
               let pos = position();
               $('#'+pos.x+'_'+pos.y).addClass('white');
               bai[pos.x+'_'+pos.y] = true;
               delete blank[pos.x+'_'+pos.y];
               if(isSuccess(pos,bai)>=5){
                   baiW.addClass('block');
                   box.off();
               }
               return ;
           }*/
       }else{
           $(this).addClass('white');
           bai[data.x+'_'+data.y] = true;
           if(isSuccess(data,bai)>=5){
               baiW.addClass('block');
               box.off();
           }
       }
       flag = !flag;
   });
   //返回位置
   function position() {
       let scroe1 = 0,scroe2 = 0,pos1 = null,pos2 = null;
       for(let i in blank){
           // i_j ---> x:i,y:j
           let obj = {x:i.split('_')[0],y:i.split('_')[1]};
           if(isSuccess(obj,hei) > scroe1){
               scroe1 = isSuccess(obj,hei);
               pos1 = obj;
           }
           if(isSuccess(obj,bai) > scroe2){
               scroe2 = isSuccess(obj,bai);
               pos2 = obj;
           }
       }
       return scroe2>=scroe1?pos2:pos1;
   }
    function isSuccess(pos,obj) {
        let hen = 1,shu = 1,zx = 1,yx = 1,
            x = pos.x, y = pos.y;
        //hen
        while(obj[x+'_'+(++y)]){
            hen++;
        }
        y = pos.y;
        while(obj[x+'_'+(--y)]){
            hen++;
        }
        //shu
        x = pos.x; y = pos.y;
        while(obj[(++x)+'_'+y]){
            shu++;
        }
        x = pos.x; y = pos.y;
        while(obj[(--x)+'_'+y]){
            shu++;
        }
        //zx
        x = pos.x;y = pos.y;
        while(obj[(++x)+'_'+(--y)]){
            zx++;
        }
        x = pos.x; y = pos.y;
        while(obj[(--x)+'_'+(++y)]){
            zx++;
        }
        //yx
        x = pos.x; y = pos.y;
        while(obj[(++x)+'_'+(++y)]){
            yx++;
        }
        x = pos.x; y = pos.y;
        while(obj[(--x)+'_'+(--y)]){
            yx++;
        }
        return Math.max(hen,shu,zx,yx);
    }
});