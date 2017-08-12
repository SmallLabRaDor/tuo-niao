  function emailCheck(str) {//邮箱验证
      if (!(/^1[34578]\d{9}$/.test(str))) {
          return false;
      };
      return true;
  };
  function json2url(json){
    json.t=Math.random();
    var arr = [];
    for(var i in json){
      arr.push(i+'='+json[i]);
    }
    return arr.join('&');
  }
  function ajax(json){
    json = json||{};
    if(!json.url)return;
    json.data=json.data||{};
    json.type=json.type||'get';
    json.timeout=json.timeout||3000;
    var timer = null;
    if(window.XMLHttpRequest){
      var oAjax = new XMLHttpRequest();
    }else{
      var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    };
    switch(json.type.toLowerCase()){
      case 'get':
        oAjax.open('GET',json.url+'?'+json2url(json.data),true);
        oAjax.send();
      break;
      case 'post':
        oAjax.open('POST',json.url,true);
        oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        oAjax.send(json2url(json.data));
      break;
    }
    json.fnLoading&&json.fnLoading();
    oAjax.onreadystatechange=function(){
      if(oAjax.readyState==4){
        json.complete&&json.complete();
        clearInterval(timer);
        if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
          json.success&&json.success(oAjax.responseText);
        }else{
          json.error&&json.error(oAjax.status);
        }
      }
    }
    timer = setTimeout(function(){
      oAjax.onreadystatechange=null;
    },json.timeout);
  };
   //提交表格信息 申请————————————————————————————————————————————数据交互
    document.getElementById('submit').onclick=function(){
      var aIput=joinUs.getElementsByTagName('input');
      var name=aIput[0].value;
      var number=aIput[1].value;
      var job=aIput[2].value;
      var city=aIput[3].value;
      if(name==''){
        alert('姓名不能为空');
        return false
      }else if(number==''){
        alert('电话不能为空');
        return false
      }else if(!emailCheck(number)){
        alert("请正确输入手机号号码");
        return false
        //手机号码有误
      }else if(job==''){
        alert('申请职位不能为空');
        return false
      }else if(city==''){
        alert('所在城市不能为空');
        return false
      };
      ajax({
        url:'http://projects.chinaflamingo.com/hr/js/add_recruit.php',
        type:'post',
        data:{
          'UserName':name,
          'Phone':number,
          'Job':job,
          'City':city
        },
        success:function(str){
          if(str==1){
            document.getElementById('succedImg').style.display='block';
            setTimeout(function(){
              popHide();
            },3000)
          }else{
            alert('提交失败')
          }
        }
        
      });
    };





  var load_BoK=1;
    //“导航”，“弹出框”
      var oNav=document.getElementById('nav');
      var oPop=document.getElementById('pop');
      var oBtnClose=document.getElementById('btnClose');
      var oPopInner=document.getElementById('popInner');
      var joinUs=document.getElementById('joinUs');
      var clientH=document.body.clientHeight;
      function popHide(){
        oPop.style.opacity='0';
        setTimeout(function(){
          oPop.style.display='none'
          joinUs.style.display='none'
        },1000)
      };
      function popShow(src){
        var oPop=document.getElementById('pop');
        var joinUs=document.getElementById('joinUs');
        var applyJob=document.getElementById('applyJob');
        joinUs.style.display='none';
        applyJob.style.display='none'
        oPop.style.display='none';
        document.getElementById('succedImg').style.display='none';
        if(src=='img01.jpg'){ 
          joinUs.style.display='block'
        }else if(src=='pic_recruitment.jpg'){
          applyJob.style.display='block'
        };
        document.getElementById('innerImg').setAttribute('src','http://projects.chinaflamingo.com/hr/images/'+src);
        oPop.style.display='block';
        oPop.style.opacity='1';
      };
      function navShow(){
        oNav.style.display='block';
      };
      function navHide(){
        oNav.style.display='none';
      };
      function removeLoadBox(){
          var loadBox=document.getElementById('loadBox');
          loadBox.style.opacity='0';
          document.getElementById('pop').style.display='none';
          setTimeout(function(){
            loadBox.style.display='none';
            //document.body.removeChild(loadBox);
          },3000)
      };
      function loadAnimate(){
        var oPen=document.getElementById('pen');
        var loadBg=document.getElementById('loadBg');
        var startBtn=document.getElementById('startBtn');

        //“鸟背景”+“笔” 动画
        var time=setTimeout(function(){
          loadBg.style.height='120px';
          oPen.setAttribute("class","penAnimate");
        },500);

        //“按钮数字”动画
        var con=1;
        var stopNum='0';
        var time2=setInterval(function(){
          if(load_BoK==1 && con<'88') {
            startBtn.innerHTML=con+'%';
            con++;
          }else if(load_BoK==1 && con=='88'){
            startBtn.innerHTML=con+'%';
            stopNum='1';
          }else if(load_BoK==1 && con=='88' && stopNum=='1'){
            startBtn.innerHTML=con+'%';
            con=con+1;
            stopNum='2';
          }else if(load_BoK==1 && con=='89' && stopNum=='2'){
            startBtn.innerHTML=con+'%';
            con=con+1;
            stopNum='3';
          }else if(load_BoK==2 && con<'100'){
            con=con+1;
            startBtn.innerHTML=con+'%';
            loadBg.style.height='164px';
          }else if (load_BoK==2 && con=='100') {
            oPen.setAttribute("class"," ");
            startBtn.style.background='url(http://projects.chinaflamingo.com/hr/images/loadingBtn2.png) center no-repeat';
            startBtn.style.backgroundSize='100%';

            load_BoK=3;
            startBtn.innerHTML=''
            clearInterval(time2);
            return false
          };
        },100)
      };
    //页面加载后， loading 导航
      window.onload=function(){
          var arr=['loadingBtn2','pic_theOpening','pic_history','pic_chuai','pic_class','pic_think','pic_library','pic_apartment','pic_tea','pic_recruitment','img01'];
          //点击 导航，对应弹出框出现
          var btnBox=document.getElementById('btnBox');
          var aBtn=btnBox.getElementsByTagName('img');
          for(var i=0; i<aBtn.length;i++){
            (function(index){
              aBtn[index].onclick=function(){
                var num=this.getAttribute('class');
                popShow(arr[num]+'.jpg');
                oNav.style.display='none';
              }
            })(i);
          }
          //图片预加载
          var now=0          
          for(var j=0;j<arr.length;j++){
            var oImg = new Image();
            oImg.src = 'http://projects.chinaflamingo.com/hr/images/'+arr[j]+'.jpg';
            oImg.onload = function(){
              now++;
              if((arr.length-2)==now){
                loadAnimate();
              };
            };
          };

          //点击 loading进入，退出加载页面
          document.getElementById('startBtn').addEventListener('click', function (ev){
            if(load_BoK==3){
              removeLoadBox()
            };
          });
          //音乐自动播放
          document.addEventListener('touchstart', function(){ 
            document.getElementById('audio').play();
          }, false);
          //设置 弹出框居中
          var oNav=document.getElementById('nav');
          var innerH=document.getElementById('innerImg').offsetHeight;
          oPopInner.style.marginTop=(clientH-innerH)/2-20+'px';
          oPop.style.height=clientH+'px';
          
          //左右晃动手机，控制图片移动
            function orientationHandler(event) {
              //document.getElementById("gamma").innerHTML = event.gamma;//左右度
              var direction='';
              var cur_deg=PSV.getPosition().longitude;//当前 经度 
              var cur_x=(cur_deg/6.2999999)*1970;//当前 x未知  
              //var cur_deg=(event.gamma*Math.PI/180);
              if(event.gamma>20){
                PSV.rotate({
                  longitude:cur_deg+0.02,
                  latitude:0
                });
                document.getElementById('prompt').style.display='none';
              }else if(event.gamma<-20){
                PSV.rotate({
                  longitude: cur_deg-0.02,
                  latitude:0
                });
                document.getElementById('prompt').style.display='none';
              };
              //document.getElementById("heading").innerHTML=cur_deg+''//(event.gamma*Math.PI/180)+'<br/>'+direction+';<br/>'+cur_x;
            };
            function motionHandler(event) {
              var acc = event.acceleration;
            };
            if (window.DeviceMotionEvent) {
              window.addEventListener("devicemotion", motionHandler, false);
            } else {
              document.body.innerHTML = "What user agent u r using???";
            };
            if (window.DeviceOrientationEvent) {
              window.addEventListener("deviceorientation", orientationHandler, false);
            } else {
              document.body.innerHTML = "What user agent u r using???";
            };
      };



  var div = document.getElementById('photosphere');
      PSV = new PhotoSphereViewer({
          // Path to the panorama
          panorama:  'index_bg.jpg'/*tpa=http://projects.chinaflamingo.com/hr/images/index_bg.jpg*/,
          markers: [
              {//编年史
                id: 'history',
                x: 370,
                y: 562,
                html: '<img src="pic_historyT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_historyT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '红鹤编年史',
                  position: 'left bottom'
                }
              },
              {//开场白
                id: 'theOpening',
                x: 944,
                y: 980,
                html: '<img src="pic_theOpeningT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_theOpeningT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '开场白',
                  position: 'left bottom'
                }
              },
              {//金搋节
                id: 'chuai',
                x: 430,
                y: 980,
                html: '<img src="pic_chuaiT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_chuaiT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '金搋节日/银搋节',
                  position: 'left bottom'
                }
              },
              {//胶囊旅馆
                id: 'apartment',
                x: 1070 ,
                y: 420 ,
                html: '<img src="pic_apartmentT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_apartmentT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '胶囊旅馆',
                  position: 'left bottom'
                }
              },
              {//阶梯图书馆
                id: 'library',
                x: 1580,
                y: 990,
                html: '<img src="pic_libraryT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_libraryT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '阶梯图书馆',
                  position: 'left bottom'
                }
              },
              {//下午茶
                id: 'tea',
                x: 1800 ,
                y: 840 ,
                html: '<img src="pic_teaT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_teaT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '下午茶',
                  position: 'left bottom'
                }
              },
              {//走红课堂
                id: 'class',
                x: 2050 ,
                y: 970,
                html: '<img src="pic_classT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_classT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '走红课堂',
                  position: 'left bottom'
                }
              },
              {//思考水族箱
                id: 'think',
                x: 2200 ,
                y: 750 ,
                html: '<img src="pic_thinkT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_thinkT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '水族箱',
                  position: 'left bottom'
                }
              },
              {//点将台
                id: 'recruitment',
                x: 1416 ,
                y: 850 ,
                html: '<img src="pic_recruitmentT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_recruitmentT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '点将台',
                  position: 'left bottom'
                }
              },
              {//再看一遍
                id: 'again',
                x: 2250 ,
                y: 850 ,
                html: '<img src="pic_againT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_againT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '再看一遍',
                  position: 'left bottom'
                }
              },
              {//加入红鹤
                id: 'from',
                x: 2400 ,
                y: 850 ,
                html: '<img src="pic_fromT.png"/*tpa=http://projects.chinaflamingo.com/hr/images/pic_fromT.png*//>',
                anchor: 'bottom right',
                style: {
                  maxWidth: '100px',
                  color: 'white',
                  fontSize: '20px',
                  fontFamily: 'Helvetica, sans-serif',
                  textAlign: 'center'
                },
                tooltip: {//提示文字
                  content: '加入红鹤',
                  position: 'left bottom'
                }
              },
              {//小鸟
                id: 'sBrid',
                x: 2400 ,
                y: 700 ,
                html: '<img src="loading2.gif"/*tpa=http://projects.chinaflamingo.com/hr/images/loading2.gif*//>',
                anchor: 'bottom right'
              }
          ],
          // Container
          container: div,
          gyroscope:true,
          autorotate:'disable',
      });

      PSV.on('autorotate', function(enabled) {
          PSV.stopAutorotate();
          this.stopGyroscopeControl();
      });

      PSV.on('click',function(marker){
          if(marker.marker.id == 'history'){
            popShow('pic_history-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_history.jpg*/)
          }else if(marker.marker.id == 'recruitment'){
            popShow('pic_recruitment-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_recruitment.jpg*/)
          }else if(marker.marker.id == 'theOpening'){
            popShow('pic_theOpening-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_theOpening.jpg*/)
          }else if(marker.marker.id == 'chuai'){
            popShow('pic_chuai-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_chuai.jpg*/)
          }else if(marker.marker.id == 'apartment'){
            popShow('pic_apartment-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_apartment.jpg*/)
          }else if(marker.marker.id == 'library'){
            popShow('pic_library-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_library.jpg*/)
          }else if(marker.marker.id == 'tea'){
            popShow('pic_tea-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_tea.jpg*/)
          }else if(marker.marker.id == 'class'){
            popShow('pic_class-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_class.jpg*/)
          }else if(marker.marker.id == 'think'){
            popShow('pic_think-1.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/pic_think.jpg*/)
          }else if(marker.marker.id == 'again'){
            window.location.href = 'index.htm'/*tpa=http://projects.chinaflamingo.com/hr/*/;
            var loadBox=document.getElementById('loadBox');
            loadBox.style.display='block';
            loadBox.style.opacity='1';
            document.getElementById('prompt').style.display='block';
            document.getElementById('pop').style.display='none';
          }else if(marker.marker.id == 'from'){
            popShow('img01-2.jpg'/*tpa=http://projects.chinaflamingo.com/hr/js/img01.jpg*/)
          }
      });

