import React from "react"
import {View,Text} from "react-native"
import {Button,TextField,Card,CardSection,Spinner} from "./common"

import {login,signup} from "../Auth"

class LoginForm extends React.Component {
    constructor(){
      super()
      this.state = {
        email: "",
        password: "",
        error:null,
        isLoading: false,
      }

    }
    onLoginSuccess(){
      this.props.loggedin(this.state.email)
    }
    onButtonPress(){
      const {email,password} = this.state
      if(!email.length || !password.length){
        this.setState({error: "fields are required",isLoading: false,})
        return
      }
      const self = this;
      self.setState({error: "",isLoading: true})
      login(email,password)
      .then(onLoginSuccess.bind(self))
      .catch(function(e){
        if(e == "invalid"){
          return new Promise(function(r,j){
            j(e)
          })
        }
        else{
          const {email,password} = e
          return signup(email,password)
        }
      })
      .then(onLoginSuccess.bind(self))
      .catch(function(err){
        console.log(err);
        self.setState({error: "Error signing/signuping",isLoading: false,})

      })

    }
    renderButton(){
      if(this.state.isLoading){
        return <Spinner />
      }
      else{
        return <Button
          doStuff={()=>{
            this.onButtonPress()
          }}>
          Log in
        </Button>
      }
    }

    componentDidMount(){

    }
    render(){
      return (
        <Card>
          <CardSection >
            <TextField
              placeholder="user123@gmail.com"
              label="Email"
              setValue={text => this.setState({email: text})}
              value={this.state.email}/>
          </CardSection>
          <CardSection >
            <TextField
              placeholder="super secret pass"
              label="Password"
              setValue={text => this.setState({password: text})}
              value={this.state.password}/>
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      )
    }
}
const styles = {
  errorTextStyle:{
    color: "red",
    alignSelf: "center",
    fontSize: 20
  }
}


export default LoginForm
