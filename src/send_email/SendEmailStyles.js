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
        height: "200px",
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
    emailInput:{
        width: "100%",
    },
    button:{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "5%"
    },
    link:{
        display: "flex",
        flexDirection: "column",
        marginLeft: "10%"
    }
})
);