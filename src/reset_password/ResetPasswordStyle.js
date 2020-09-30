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
    }
})
);