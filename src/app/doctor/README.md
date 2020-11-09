### Onboarding flow
1. User must be register as Dcotor role

2. onboarding flow page should display when user (doctor) freshly signed in. 

3. basic info tab (No optional field)
        profilepic - file input(if user not uploading pic,our default profile pic always there).
        registration id -varchar- input
        full Name- string- input
        date if birth- date - caledar selection
        gender-string - radio button
        contact number - number - input
       
4. practise info tab (No optional field)
        specialization -string - dropdwon
        sub specialization- string -dropdown
        Note: inout field to add specialization and subspecilization respective;y,
              if not listed in dropdown  
        years of pracise - number - input
        upload document- checkbox- file input 
        
5. clinic/Hospital details tab (optional- can add later)
        clinic Name- string - input 
        Address- multiline string - input
        available period of time :
                    checkboxes for weekday from Monday to Sunday (mulitiple selection possible).
                    timeslot of availability of thoes days - timeformat - input 
                    allocated time per patient- checkboxex (15 min,20 min,30 min, 40 min, 50 min, 60 min) - radio buttons
        Fee structure : (optional - can add later)
            consultation fee - number - input
            follow up fee - number - input
       
6. Assitant Details tab:
        full Name - string - input 
        email - string - email input
        contact number - number - input
        gender - string - radio button
        
7. Terms and condition tab:(No optional)
        terms and condition details description point wise (non editable)
        checkbox to accept terms and condition by the user - it must be select by respective user.


NO need to add NEXT,BACK and SKIP button 

