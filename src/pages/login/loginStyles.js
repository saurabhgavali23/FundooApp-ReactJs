import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>
({
    loginContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100wh",
        height: "100vh", 
    },
    formDivLogin:{
        width: "400px",
        height: "280px",
        margin: "auto",
    },
    title:{
        marginTop: "5%",
        textAlign: "center",
        component:"div",
        textOverflow: "clip",
        fontSize: 25,
    },
    title2:{
        marginTop: "5%",
        textAlign: "center",
        component:"div",
        textOverflow: "clip",
        fontSize: 20,
    },
    inputContainer:{
        margin: "10%"
    },
    emailContainer:{
        height: '50px'
    },
    emailInput:{
        width: "100%",
    },
    passwordContainer:{
        height: '50px',
        alignItems: 'center'
    },
    passwordInput:{
        width: "100%",
    },
    button:{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10%'
    },
    inputError:{
        color: "red",
        fontSize: 12
    },
    link:{
        display: "flex",
        flexDirection: "column",
        marginLeft: "10%"
    }
})
);