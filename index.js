            var original_excel=new Map();
			var original_send=new Map();
  
			  function leerArchivo(e) {
				  var archivo = e.target.files[0];
				  if (!archivo) {
					return;
				  }
				  var lector = new FileReader();
				  lector.onload = function(e) {
					var contenido = e.target.result; 
					var lines = contenido.split('\n');
					for(var line = 0; line < lines.length; line++){
						var vectorlinea=lines[line].split(";");
						  
					  if(original_excel.has(vectorlinea[13])){
						  console.log('duplicado:'+vectorlinea[13]);
					  }else{
						  original_excel.set(vectorlinea[13],vectorlinea);
					  }
					  
					  
					}
					 console.log(original_excel.size);
					 
				  };
				  lector.readAsText(archivo);
				}
 
 function validar(){
	 var count=0;
	 var countno=0;
	 var noenviado=0;
	 var lineas='';
	 var lineasno='';
	 var lineasextra='';
	 var lineascount=0;
	 for (var [clave, valor] of original_excel) {
		   
		  var sumacargos=0;
		  var detalle='';	
          var enviado=true;	
          var arrayvalueyy=[];		  
		   if(original_send.has(clave)){
				 arrayvalueyy=original_send.get(clave);
				   for(var index in arrayvalueyy){
					   detalle+='|'+((arrayvalueyy[index])[6]);
					sumacargos=(sumacargos+parseFloat((arrayvalueyy[index])[6])); 
				  } 
		   }else{
			   enviado=false;
		   }
		 
		  
			 
			 if(enviado){
				  if(parseFloat(valor[18].replace(",","."))==redondeo_valor(sumacargos)){
					  count++;
					   for(var index in arrayvalueyy){
						   lineascount++;
					   lineas+=(clave+','+valor[17]+','+valor[3]+','+valor[5]+','+valor[15]+','+((arrayvalueyy[index])[6])+',N'+'\r\n'); 
				        } 
				  }else{
					 countno++;  
					   
					  if(parseFloat(valor[18].replace(",","."))>redondeo_valor(sumacargos)){
						lineasno+=(clave+',llego:'+parseFloat(valor[18].replace(",","."))+',envio:'+redondeo_valor(sumacargos)+',detalle enviado:'+detalle+',diferencia(posible uso servicio):'+(parseFloat(valor[18].replace(",","."))-redondeo_valor(sumacargos))+'\r\n');   
					  }else{
						lineasno+=(clave+',llego:'+parseFloat(valor[18].replace(",","."))+',envio:'+redondeo_valor(sumacargos)+',detalle enviado:'+detalle+'\r\n'); 
					  } 
				  }
			  }else{
				 noenviado++; 
				 lineasextra+=(clave+',llego:'+parseFloat(valor[18].replace(",","."))+'\r\n'); 
			  }
		}
		console.log(count);
		console.log(countno);
		console.log(noenviado);
		console.log('lineas escritas:'+lineascount);
		console.log(count+countno+noenviado);
		
		var blob = new Blob([lineas], {type: 'plain/text',   endings: 'native'});
 saveAs(blob, "jc_validos.txt"); 
 
 var blob2 = new Blob([lineasno], {type: 'plain/text',   endings: 'native'});
 saveAs(blob2, "jc_no_validos.txt"); 
 
 var blob3 = new Blob([lineasextra], {type: 'plain/text',   endings: 'native'});
 saveAs(blob3, "jc_extras.txt"); 
 }
 
 
            function leerArchivotxt(e) {
				  var archivo = e.target.files[0];
				  if (!archivo) {
					return;
				  }
				  var lector = new FileReader();
				  lector.onload = function(e) {
					var contenido = e.target.result; 
					var lines = contenido.split('\n');
					for(var line = 0; line < lines.length; line++){
						var vectorlinea=lines[line].split("*");
						 
					  if(original_send.has(vectorlinea[1])){
						  console.log('duplicado txt:'+vectorlinea[1]);
						 var value =original_send.get(vectorlinea[1]);
						 value.push(vectorlinea);
						 original_send.set(vectorlinea[1],value);
					  }else{
						  var value = new Array();
						  value.push(vectorlinea);
						  original_send.set(vectorlinea[1],value);
					  }
					  
					  
					}
					console.log(original_send.size);
					 
				  };
				  lector.readAsText(archivo);
				}
	 function redondeo_valor(num, decimales = 2) {
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) 
      return signo * Math.round(num); 
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales))); 
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}
				
				document.getElementById('file-input')
				  .addEventListener('change', leerArchivo, false);
				  
				 document.getElementById('file-input2')
				  .addEventListener('change', leerArchivotxt, false);
  
 