'use strict';


const ALPHANUMERIC_REGEX = /^[a-zA-Z ]+$/;
const setInvalid = (errmsg, message) => {
    errmsg.className = "show-error";
    errmsg.innerHTML = message;
}

document.addEventListener("DOMContentLoaded", e => {

    {

        /* event bindings of tab one */
        // section one button click
        const validateUser = e => {
            const username = document.forms.userForm.username.value;
            const usererr = document.getElementById("error-msg-user");

            if (!username) {
                setInvalid(usererr, "User name must not be empty");
                return false;
            } else if (!ALPHANUMERIC_REGEX.test(username)) {
                setInvalid(usererr, "User name must contains only letters");
                return false;
            } else {
                setInvalid(usererr, "");
                return true;
            }
        };

        // note: 1 minor error is still exists, to resolve make separe conpass and pass
        const validatePasswords = (fldVal, errFld, fldLabel, comerrFld, compFldVal) => {
            console.log('password ' + password.value.length)
            if (!fldVal.value) {
                setInvalid(errFld, `${fldLabel} must not be empty`);
                return false;
            } else if (password.value.length < 4 || password.length > 10) {
                setInvalid(errFld, `${fldLabel} should be 4 to 10 characters long`);
                return false;
            } else if (fldVal.value !== compFldVal.value) {
                setInvalid(comerrFld, `Confirm password should match`);
                return false;
            } else {
                setInvalid(errFld, "");
                setInvalid(comerrFld, "");
                return true;
            }
        };

        const validatePassword = e => {
            const password = document.forms.userForm.password;
            const passerr = document.getElementById("error-msg-pass");
            const conpasserr = document.getElementById("error-msg-conpass");
            const confirmPassword = document.forms.userForm.confirmpassword;

            return validatePasswords(password, passerr, "Password", conpasserr, confirmPassword);
        };

        const validateConfirmPassword = e => {
            const password = document.forms.userForm.password;
            const passerr = document.getElementById("error-msg-pass");
            const conpasserr = document.getElementById("error-msg-conpass");
            const confirmPassword = document.forms.userForm.confirmpassword;

            return validatePasswords(
                password,
                passerr,
                "Confirm password",
                conpasserr,
                confirmPassword
            );
        };

        const validateGenders = (fldVal, errFld, fldLabel) => {
            if (!fldVal.length > 0) {
                setInvalid(errFld, `must be selected`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validateGender = e => {
            const genders = document.getElementsByName("gender");
            const genderChecked = Array.prototype.slice.call(genders).filter(item => item.checked);
            const generr = document.getElementById("error-msg-gender");

            return validateGenders(genderChecked, generr, 'Gender')
        };


        const validateExperiences = (fldVal, errFld, fldLabel) => {
            if (fldVal.value == 0) {
                setInvalid(errFld, `${fldLabel} must be selected`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validateExperience = e => {
            const experience = document.getElementById("experience");
            const experr = document.getElementById("error-msg-exp");

            return validateExperiences(experience, experr, 'Experience')
        };


        const validateskills = (fldVal, errFld, fldLabel) => {
            if (fldVal.length < 2) {
                setInvalid(errFld, `${fldLabel} must be selected atleast 2`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validateskill = e => {
            const skillSet = document.querySelectorAll("input[name='skill']");
            const skillerr = document.getElementById("error-msg-skill");
            const skillChecked = Array.prototype.slice.call(skillSet).filter(item => item.checked);
            //console.log(skillChecked.length)

            return validateskills(skillChecked, skillerr, 'Skill')
        };

        const submit = e => {
            if (validateUser()) {
                if (validatePassword()) {
                    if (validateConfirmPassword()) {
                        if (validateGender()) {
                            if (validateExperience()) {
                                if (validateskill()) {
                                    document.getElementById("success").innerHTML =
                                        "form has been successfully submitted!";
                                    document.forms.userForm.reset();
                                    console.log("submitted");

                                }
                            }

                        }

                    }
                }
            }
        };

        // validate username
        document
            .getElementById("username")
            .addEventListener("focusout", validateUser);
        // validate password
        document
            .getElementById("password")
            .addEventListener("focusout", validatePassword);
        // validate confirm password
        document
            .getElementById("confirmpassword")
            .addEventListener("focusout", validateConfirmPassword);

        document
            .getElementById("gender")
            .addEventListener("focusout", validateGender);

        document
            .getElementById("experience")
            .addEventListener("focusout", validateExperience);

        document
            .getElementById("skillSet")
            .addEventListener("focusout", validateskill);

        document
            .getElementById("submit")
            .addEventListener("click", submit);
    }
});