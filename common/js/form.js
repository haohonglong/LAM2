
function form(System,parent,D){
	System.is(System,parent);
	var F = function(){
		System.Basis.extends.call(this,System[parent]);
		if(D){
			this.$input  		=  D.$input  	 || null;
			this.$input_arear 	=  D.$input_arear || null;
		}

	};
	F.method('submit',function(){
		var str=this.$input.val();
		this.$input_arear.html(str);


	});

	System.extends(F,System[parent],1);
	return new F();
}