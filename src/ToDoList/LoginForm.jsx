import React from "react";

export const LoginForm = (props) => {

    let login =() => {
        props.checkLogin();
    }

    let updateTextForLoginField = (e) => {
        let text = e.target.value;
        props.updateTextForLoginField(text);
    }

    let isChecked = (e) => {
        props.setRememberMe(e.target.checked)
    }

    console.log('LOGIN_FORM: is auth: ' + props.isAuth);
    console.log('LOGIN_FORM: remember me: ' + localStorage.getItem('rememberMe'));

    return <div>
        <div><input onChange={updateTextForLoginField}
                    value={props.fieldForLogin} type="text"/>
                    Remember me<input type="checkbox" onChange={isChecked}/></div>
        <button onClick={login}>LOGIN</button>

    </div>
}