import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>
({
    loginContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh", 
    },
    formDivLogin:{
        width: "400px",
        height: "380px",
        margin: "auto",
    },
    title:{
        marginTop: "5%",
        textAlign: "center",
        component:"div",
        textOverflow: "clip",
        fontSize: 25,
    },
    titleRegister:{
        marginTop: "5%",
        textAlign: "center",
        component:"div",
        textOverflow: "clip",
        fontSize: 20,
    },
    inputContainer:{
        margin: "10%"
    },
    emailInput:{
        width: "100%",
        marginBottom: "5%"
    },
    passwordInput:{
        width: "100%",
        marginBottom: "5%"
    },
    button:{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "5%"
    },
    inputError:{
        color: "red",
        fontSize: 12
    },
    link:{
        display: "flex",
        flexDirection: "column",
        marginLeft: "10%"
    },
    firstAndLastNameContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "5%"
    },
    firstAndLastName:{
        width: "45%"
    }
})
);