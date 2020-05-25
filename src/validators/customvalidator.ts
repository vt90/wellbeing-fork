import { FormControl,FormGroup } from '@angular/forms';
 
export class CustomValidator {
 
    static validateEmail(control: FormControl): any {
		console.log("email="+control.value);
		if(control.value=="" || control.value==null){
			return {
                "required": true
            };
		}
		
		//console.log(control.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
		if(control.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			return null;
       } else {
            return {
                "email": true
            };
        }
        //return false;
    }
	
	
	static areEqual(group: FormGroup):any{
		//console.log(group);
		//console.log("Main Cntrl="+control.root.controls);
		/* return {
			"areEqual":true
		} */
		var firstPassword = group.controls['password'].value;
		var secondPassword = group.controls['confirmpassword'].value;
		if((firstPassword != secondPassword)){
		  //console.log("mismatch");
		  group.controls['confirmpassword'].setErrors({"pw_mismatch": true});
			return { "pw_mismatch": true };           
		} else{
			//console.log("match");
		  return null;
		}
	}
 
}