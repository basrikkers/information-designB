var audio = document.getElementById("crowd");
audio.volume = (3000/70000);

function audioHard() {
  audio.volume = 1;
}
function audioZacht() {
audio.volume = 0;
}


d3.csv("dataset2.csv", function(error, data) {

  if (error) throw error;
  // var tv = 0;
  // var uv = 0;
  // var g = 0;
  var bezoekers = {
        "Burnley":20558,
        "Crystal Palace":25161,
        "Everton":39080,
        "Hull":20656,
        "Man City":54019,
        "Middlesbrough":30449,
        "Southampton":30936,
        "Arsenal":59957,
        "Bournemouth":11182,
        "Chelsea":41508,
        "Man United":75290,
        "Leicester":31893,
        "Stoke":27433,
        "Swansea":20619,
        "Tottenham":31639,
        "Watford":20571,
        "West Brom":23876,
        "Sunderland":41287,
        "West Ham":56972,
        "Liverpool":53016,
        "Augsburg":28172,
        "Bayern Munich":75000,
        "Darmstadt":16753,
        "Dortmund":79712,
        "Ein Frankfurt":49176,
        "FC Koln":49571,
        "Freiburg":23959,
        "Hamburg":52341,
        "Hertha":50267,
        "Hoffenheim":28155,
        "Ingolstadt":14601,
        "Leverkusen":28428,
        "M'gladbach":51494,
        "Mainz":29096,
        "RB Leipzig":41478,
        "Schalke 04":60762,
        "Werder Bremen":40946,
        "Wolfsburg":27586,
        "Alaves":17758,
        "Ath Bilbao":41058,
        "Ath Madrid":44735,
        "Barcelona":78575,
        "Betis":33564,
        "Celta":16961,
        "Eibar":5324,
        "Espanol":20396,
        "Granada":14888,
        "La Coruna":22432,
        "Las Palmas":20441,
        "Leganes":10130,
        "Malaga":21941,
        "Osasuna":14757,
        "Real Madrid":71513,
        "Sevilla":32774,
        "Sociedad":21476,
        "Sp Gijon":22968,
        "Valencia":33922,
        "Villarreal":17774,
        "Angers":11734,
        "Bastia":10511,
        "Bordeaux":24217,
        "Caen":16799,
        "Dijon":10128,
        "Guingamp":14790,
        "Lille":29415,
        "Lorient":11832,
        "Lyon":39171,
        "Marseille":39898,
        "Metz":16196,
        "Monaco":9038,
        "Montpellier":12356,
        "Nancy":17516,
        "Nantes":23152,
        "Nice":22916,
        "Paris SG":45159,
        "Rennes":22689,
        "St Etienne":27028,
        "Toulouse":17068,
        "Atalanta":16944,
        "Bologna":21192,
        "Cagliari":12998,
        "Chievo":11842,
        "Crotone":8213,
        "Empoli":9409,
        "Fiorentina":26470,
        "Genoa":21332,
        "Inter":46620,
        "Juventus":39925,
        "Lazio":20400,
        "Milan":40292,
        "Napoli":36557,
        "Palermo":13204,
        "Pescara":13293,
        "Roma":32638,
        "Sampdoria":19662,
        "Sassuolo":12362,
        "Torino":18992,
        "Udinese":17851,
  }

  data.forEach(function(d) {
    d.AF = +d.AF;
    d.HF = +d.HF;
    d.AY = +d.AY;
    d.HY = +d.HY;
    d.AR = +d.AR;
    d.HR = +d.HR;
    d.FTAG = +d.FTAG;
    d.FTHG = +d.FTHG;
    var thuis = (1*d.HF + 2*d.HY + 3*d.HR)
    var uit = (1*d.AF + 2*d.AY + 3*d.AR)
    // var voordeel =  ((5*d.AF)+(0*d.AY)+(0*d.AR)+(0*d.FTHG)) - ((5*d.HF)+(0*d.HY)+(0*d.HR)+(0*d.FTAG)) ;
    var voordeel = (thuis/(thuis + uit) )* 100
    var uvoordeel = (uit/(thuis + uit) )* 100
    d.GKV = ((d.AY)/(d.HY+d.AY))*100
    d.RKV = ((d.AR)/(d.HR+d.AR))*100
    d.AFV = ((d.AF)/(d.HF+d.AF))*100
    d.TV = voordeel;
    d.UV = uvoordeel;
    d.BZ = bezoekers[d.HomeTeam];


  });
  var gem1 = function(d){
    return d3.mean(d, function(d){ return (d.TV);})
  }
  var gem2 = function(d){
    return d3.mean(d, function(d){ return (d.UV);})
  }

  var overtr = function(d){
    return d3.mean(d, function(d){ return (d.AFV);})
  }
  var geel = function(d){
    return d3.mean(d, function(d){ return (d.GKV);})
  }
  var rood = function(d){
    return d3.mean(d, function(d){ return (d.RKV);})
  }


  var UVboard = document.getElementById("UV");
  UVboard.textContent = gem1(data).toFixed(1) + "%";

  var TVboard = document.getElementById("TV");
  TVboard.textContent = gem2(data).toFixed(1) + "%";

      var reclameAFV = document.getElementById("AFV");
      var AFVthuis = document.createElement('li');
      var AFVuit = document.createElement('li');
      AFVthuis.textContent = "Thuisvoordeel: " + overtr(data).toFixed(2) + "%";
      AFVuit.textContent = "Uitvoordeel: " + (100 - overtr(data).toFixed(2)) + "%";
      AFVthuis.setAttribute("id","AFVH");
      AFVuit.setAttribute("id","AFVU");
      reclameAFV.appendChild(AFVthuis);
      reclameAFV.appendChild(AFVuit);

      var reclameGKV = document.getElementById("GKV");
      var GVKthuis = document.createElement('li');
      var GVKuit = document.createElement('li');
      GVKthuis.textContent = "Thuisvoordeel: " + geel(data).toFixed(2) + "%";
      GVKuit.textContent = "Uitvoordeel: " + (100 - geel(data).toFixed(2)) + "%";
      GVKthuis.setAttribute("id","GKVH");
      GVKuit.setAttribute("id","GKVU");
      reclameGKV.appendChild(GVKthuis);
      reclameGKV.appendChild(GVKuit);

      var reclameRKV = document.getElementById("RKV");
      var RVKthuis = document.createElement('li');
      var RVKuit = document.createElement('li');
      RVKthuis.textContent = "Thuisvoordeel: " + rood(data).toFixed(2) + "%";
      RVKuit.textContent = "Uitvoordeel: " + (100 - rood(data).toFixed(2)) + "%";
      RVKthuis.setAttribute("id","RKVH");
      RVKuit.setAttribute("id","RKVU");
      reclameRKV.appendChild(RVKthuis);
      reclameRKV.appendChild(RVKuit);


  // console.log(gem2(data)+gem1(data));
  var dataLand = d3.nest()
    .key(function(d) { return d.Div; })
    .rollup(function(data) {return{"GKV": d3.mean(data, function(d){ return (d.GKV);}),"RKV": d3.mean(data, function(d){ return (d.RKV);}),"AFV": d3.mean(data, function(d){ return (d.AFV);})}; })
    .entries(data);
  console.log(dataLand);
  dataLand.forEach(function(d){
    // var scroll = document.getElementById("scrollRoof");
    var para = document.createElement("p");
    var node = document.createTextNode(d.key + ": " + d.value.GKV.toFixed(2) + "%");
    para.setAttribute("class", "licht");
    para.appendChild(node);

    var element = document.getElementById("scrollRoof");
    element.appendChild(para);

    console.log(scroll)
    // scroller.textContent = d.key + ": " + d.value.GKV.toFixed(2) + "%";

  })
  // var scroll = document.querySelector("#scroller");
  // scroll.textContent = dataLand[0].key + ": " + dataLand[0].value.GKV.toFixed(2) + "%";
  console.log(data);


    d3.selectAll("input[type=range]").on("change", function() {

      var slider = document.getElementById("BZS")
      console.log(slider.value);
      var dataslider = data.filter(function(d){if(d.BZ > slider.value){return d}});


      dataslider.forEach(function(d) {
        d.AF = +d.AF;
        d.HF = +d.HF;
        d.AY = +d.AY;
        d.HY = +d.HY;
        d.AR = +d.AR;
        d.HR = +d.HR;
        d.FTAG = +d.FTAG;
        d.FTHG = +d.FTHG;
        var thuis = (1*d.HF + 2*d.HY + 3*d.HR)
        var uit = (1*d.AF + 2*d.AY + 3*d.AR)
        // var voordeel =  ((5*d.AF)+(0*d.AY)+(0*d.AR)+(0*d.FTHG)) - ((5*d.HF)+(0*d.HY)+(0*d.HR)+(0*d.FTAG)) ;
        var voordeel = (thuis/(thuis + uit) )* 100
        var uvoordeel = (uit/(thuis + uit) )* 100
        d.GKV = ((d.AY)/(d.HY+d.AY))*100
        d.RKV = ((d.AR)/(d.HR+d.AR))*100
        d.AFV = ((d.AF)/(d.HF+d.AF))*100
        d.TV = voordeel;
        d.UV = uvoordeel;
        d.BZ = bezoekers[d.HomeTeam];


      });
      console.log(dataslider);
      document.getElementById("toeschouwers").textContent = "toeschouwers: " + slider.value;
      var UVboard = document.getElementById("UV");
      UVboard.textContent = gem1(dataslider).toFixed(1) + "%";

      var TVboard = document.getElementById("TV");
      TVboard.textContent = gem2(dataslider).toFixed(1) + "%";

      document.getElementById("AFVH").textContent = "Thuisvoordeel: " +  overtr(dataslider).toFixed(2) + "%";
      document.getElementById("AFVU").textContent = "Uitvoordeel: " +  (100 - overtr(dataslider)).toFixed(2) + "%";

      document.getElementById("GKVH").textContent = "Thuisvoordeel: " +  geel(dataslider).toFixed(2) + "%";
      document.getElementById("GKVU").textContent = "Uitvoordeel: " +  (100 - geel(dataslider)).toFixed(2) + "%";

      document.getElementById("RKVH").textContent = "Thuisvoordeel: " +  rood(dataslider).toFixed(2) + "%";
      document.getElementById("RKVU").textContent = "Uitvoordeel: " +  (100 - rood(dataslider)).toFixed(2) + "%";

      var audio = document.getElementById("crowd");
      audio.volume = (slider.value/70000);
      console.log((slider.value/70000));

      var dataLandSlider = d3.nest()
        .key(function(d) { return d.Div; })
        .rollup(function(dataslider) {return{"GKV": d3.mean(dataslider, function(d){ return (d.GKV);}),"RKV": d3.mean(dataslider, function(d){ return (d.RKV);}),"AFV": d3.mean(dataslider, function(d){ return (d.AFV);})}; })
        .entries(dataslider);

      // var verwijder = document.getElementsByClassName("licht");
      removeElementsByClass();
      function removeElementsByClass(){
          var elements = document.getElementsByClassName("licht");
          while(elements.length > 0){
              elements[0].parentNode.removeChild(elements[0]);
          }
      }
      dataLandSlider.forEach(function(d){
        // var scroll = document.getElementById("scrollRoof");
        var para = document.createElement("p");
        var node = document.createTextNode(d.key + ": " + d.value.GKV.toFixed(2) + "%");
        para.setAttribute("class", "licht");
        para.appendChild(node);

        var element = document.getElementById("scrollRoof");
        element.appendChild(para);

        console.log(scroll)
        // scroller.textContent = d.key + ": " + d.value.GKV.toFixed(2) + "%";

      })
      function support(){
        var verhouding = Math.round(((slider.value/70000)*4)+1);
        for(var i=1; i <= verhouding; i++){
          var suppnumber = "supp" + i;
          var not = "supp" + (5-i);
          console.log(suppnumber);
                    var cols = document.getElementsByClassName(suppnumber);
                    console.log(cols);
                    for(a=0; a<cols.length; a++) {
                      cols[a].style.opacity = 1;

                    }

          // console.log(document.getElementsByClassName(suppnumber).classList);
          // document.getElementsByClassName(suppnumber).classList.add("onzichtbaar");

        }

        for(var i=5; i > verhouding; --i){
          var suppnumber = "supp" + i;
                    var cols = document.getElementsByClassName(suppnumber);
                    console.log(cols);
                    for(a=0; a<cols.length; a++) {
                      cols[a].style.opacity = 0;

                    }
        }
        // console.log(verhouding);
      }
      support();
    });
});
