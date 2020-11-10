# Onboarding flow

## Initial stage to land on onboarding page or complete profile page.
        1. user register himself as a doctor in application.
        2. after registration, user should verify email (the linksent on respective email id). 
        3. after successful email verification,user able to see onboarding screen flow. 

## User journey on onboarding screen flow.

        1. Basic Information

        | Field          | Field Type    | Optional |
        | -------------  |:-------------:| --------:|
        | Profile pic    | file input    | yes      |
        | Registration id| string        | yes      |
        | full name      | string        | No       |
        | birthDate      | date          | No       |
        | gender         | radio buttons | No       |
        | contact number | number        | No       |    
             
        * User should enter above details and click the 'Next button'
        * System validates the entered information and naviagate to next screen on success. 

        2. Practise Information

        | Field             | Field Type    | Optional |
        | ----------------  |:-------------:| --------:|
        | specialization    | dropdown      | No       |
        | sub-specialization| dropdwon      | No       |
        | Years of Practise | number        | No       |
        | upload documnet   | file input    | No       |

        * on this screen, user can add specialization and subspecialization only if     user's specialization and subspecialization not listed in existing list. 
        * System validates the entered information and naviagate to next screen on success. 

        3. clinic/Hospital details

        | Field                   | Field Type    | Optional |
        | ---------------------   |:-------------:| --------:|
        | clinic name             | string        | yes      |
        | Address                 | string        | yes      |
        | availability on days    | checkboxes    | yes      |
        | availability of time    | checkboxes    | yes      |
        | time per Patient        | checkboxes    | yes      |
        | consultation fee        | number        | yes      |
        | followup fee            | number        | yes      |

        * address will be multiline string including area pincode
        * combined clinic details, availability of user at the clinic day and time wise,and fee structure in a single screen, named ** clinic/hospital details **.
        * This screen will be optional for user while completing onboarding flow, but user wants to list his clinic in patient search, user has to put all details mentioned above, now or later.
        * System validates the entered information and naviagate to next screen on success. 
        * user can skip this screen and directly land on next screen.  

        4. Assistant details
  
        | Field             | Field Type    | Optional |
        | --------------    |:-------------:| --------:|
        | Full name         | string        | yes      |
        | email             | string        | yes      |
        | contact number    | number        | yes      |
        | gender            | radio buttons | yes      |

        * probably user able to add assistant details now or later.
        * on submitting assistant details by user, assistant get the email to register himself as assistant in the application. 
        * System validates the entered information and naviagate to next screen on success. 

        5. Terms and condition
        * detailed description of terms and condtion should mentioned on screen 
        * checkbox should be there to accept the terms and condition by the user. 
        * by default, checkbox will be deselected 

## Exception Handling 
         
        1. scenario: Any mandatory field is blank.
           Expected: Error message “<field name> is a required field. Please enter a valid input.” is displayed. 
        2. Entered value is not in the proper format.
           Expected: Error message “The value entered in <field name> has incorrect format. Please correct the entered value“ is displayed.


