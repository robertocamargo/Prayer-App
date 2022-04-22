import React from 'react';
//import { RectButtonProperties } from 'react-native-gesture-handler';
import { Text, TouchableOpacityProps, View,TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

type Props ={
  text:string;
  onPress(): void
}

const Button:React.FC<Props> = ({text,...rest}:Props) =>{
  return(
    <Container {...rest} >
        <ButtonText>{text}</ButtonText>
    </Container>
  )
  }
  export default Button;
/*
const Button: React.FC<ButtonProps> = ({ children,...rest }) => (
  <TouchableOpacity {...rest}>
    <View>
      <Text>{children}</Text>
    </View>
  </TouchableOpacity>
  //<Container  {...rest}>
    // <ButtonText>{children}</ButtonText> 
  //</Container>
);

export default Button;
*/